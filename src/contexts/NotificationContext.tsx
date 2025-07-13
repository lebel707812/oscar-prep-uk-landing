import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

export interface Notification {
  id: string;
  type: 'achievement' | 'reminder' | 'update' | 'milestone';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
  icon?: string;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
  clearAll: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const { toast } = useToast();

  // Carregar notificações do usuário
  useEffect(() => {
    const fetchUserAndNotifications = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
        await loadNotifications(user.id);
      } else {
        // Fallback para localStorage se não houver usuário logado
        const savedNotifications = localStorage.getItem('notifications');
        if (savedNotifications) {
          const parsed = JSON.parse(savedNotifications);
          setNotifications(parsed.map((n: any) => ({
            ...n,
            timestamp: new Date(n.timestamp)
          })));
        }
      }
    };

    fetchUserAndNotifications();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUserId(session.user.id);
        loadNotifications(session.user.id);
      } else {
        setUserId(null);
        setNotifications([]);
        localStorage.removeItem('notifications');
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const loadNotifications = async (userIdParam: string) => {
    try {
      const { data, error } = await supabase
        .from('user_notifications')
        .select('*')
        .eq('user_id', userIdParam)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading notifications:', error);
        return;
      }

      const mappedNotifications: Notification[] = data.map(item => ({
        id: item.id,
        type: item.type as Notification['type'],
        title: item.title,
        message: item.message,
        timestamp: new Date(item.created_at),
        read: item.read,
        actionUrl: item.action_url,
        icon: item.icon
      }));

      setNotifications(mappedNotifications);
    } catch (error) {
      console.error('Error loading notifications:', error);
    }
  };

  const saveToSupabase = async (notification: Notification) => {
    if (!userId) return;

    try {
      const { error } = await supabase
        .from('user_notifications')
        .insert({
          id: notification.id,
          user_id: userId,
          type: notification.type,
          title: notification.title,
          message: notification.message,
          read: notification.read,
          action_url: notification.actionUrl,
          icon: notification.icon
        });

      if (error) {
        console.error('Error saving notification to Supabase:', error);
      }
    } catch (error) {
      console.error('Error saving notification to Supabase:', error);
    }
  };

  const updateReadStatusInSupabase = async (id: string, read: boolean) => {
    if (!userId) return;

    try {
      const { error } = await supabase
        .from('user_notifications')
        .update({ read })
        .eq('id', id)
        .eq('user_id', userId);

      if (error) {
        console.error('Error updating notification read status:', error);
      }
    } catch (error) {
      console.error('Error updating notification read status:', error);
    }
  };

  const deleteFromSupabase = async (id: string) => {
    if (!userId) return;

    try {
      const { error } = await supabase
        .from('user_notifications')
        .delete()
        .eq('id', id)
        .eq('user_id', userId);

      if (error) {
        console.error('Error deleting notification from Supabase:', error);
      }
    } catch (error) {
      console.error('Error deleting notification from Supabase:', error);
    }
  };

  const addNotification = (notificationData: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notificationData,
      id: crypto.randomUUID(),
      timestamp: new Date(),
      read: false
    };

    setNotifications(prev => {
      const updated = [newNotification, ...prev];
      if (!userId) {
        localStorage.setItem('notifications', JSON.stringify(updated));
      }
      return updated;
    });

  // Save to Supabase if user is logged in
    if (userId) {
      saveToSupabase(newNotification);
    }

    // Show toast for important notifications
    if (notificationData.type === 'achievement' || notificationData.type === 'milestone') {
      toast({
        title: notificationData.title,
        description: notificationData.message,
      });
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => {
      const updated = prev.map(n => 
        n.id === id ? { ...n, read: true } : n
      );
      if (!userId) {
        localStorage.setItem('notifications', JSON.stringify(updated));
      }
      return updated;
    });

    if (userId) {
      updateReadStatusInSupabase(id, true);
    }
  };

  const markAllAsRead = () => {
    setNotifications(prev => {
      const updated = prev.map(n => ({ ...n, read: true }));
      if (!userId) {
        localStorage.setItem('notifications', JSON.stringify(updated));
      }
      return updated;
    });

    if (userId) {
      notifications.forEach(n => {
        if (!n.read) {
          updateReadStatusInSupabase(n.id, true);
        }
      });
    }
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => {
      const updated = prev.filter(n => n.id !== id);
      if (!userId) {
        localStorage.setItem('notifications', JSON.stringify(updated));
      }
      return updated;
    });

    if (userId) {
      deleteFromSupabase(id);
    }
  };

  const clearAll = () => {
    if (userId) {
      notifications.forEach(n => deleteFromSupabase(n.id));
    } else {
      localStorage.removeItem('notifications');
    }
    setNotifications([]);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <NotificationContext.Provider value={{
      notifications,
      unreadCount,
      addNotification,
      markAsRead,
      markAllAsRead,
      removeNotification,
      clearAll
    }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

