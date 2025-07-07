import React, { useState, useCallback, useEffect } from "react";
import { Notification } from "./Notification";

export type NotificationType = "success" | "error" | "info" | "warning";

export interface NotificationItem {
  id: number;
  type: NotificationType;
  message: string;
}

let addNotificationExternal: (type: NotificationType, message: string) => void = () => {};

const NotificationsContainer: React.FC = () => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  const addNotification = useCallback((type: NotificationType, message: string) => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, type, message }]);

    // Auto-remove after 5s
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 5000);
  }, []);

  const removeNotification = useCallback((id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  useEffect(() => {
    // expõe globalmente para outros arquivos
    addNotificationExternal = addNotification;
  }, [addNotification]);

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col items-end gap-3">
      {notifications.map(({ id, type, message }) => (
        <Notification
          key={id}
          id={id}
          type={type}
          message={message}
          onClose={removeNotification}
        />
      ))}
    </div>
  );
};

// função global para notificar
export const notify = (type: NotificationType, message: string) => {
  addNotificationExternal(type, message);
};

export default NotificationsContainer;
