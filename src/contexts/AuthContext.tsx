import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from '../integrations/supabase/client';
import type { Session, User as SupabaseUser } from '@supabase/supabase-js';

interface UserMetadata {
  full_name?: string;
  // outras infos que você guarda no metadata
}

interface User {
  id: string;
  email: string;
  user_metadata: UserMetadata;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string) => Promise<{ data: any; error: any }>;
  signOut: () => Promise<void>;
  updateUser: (data: Partial<UserMetadata>) => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  deleteAccount: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user as User ?? null);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user as User ?? null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;

    const { data: { session } } = await supabase.auth.getSession();
    setSession(session);
    setUser(session?.user as User ?? null);
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });
    return { data, error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
  };

  const updateUser = async (data: Partial<UserMetadata>) => {
    if (!user) throw new Error("No user logged in");

    const { data: updatedUser, error } = await supabase.auth.updateUser({ data });

    if (error) throw error;

    setUser(updatedUser.user as User);
  };

  const changePassword = async (currentPassword: string, newPassword: string) => {
    if (!user) throw new Error("No user logged in");

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: currentPassword,
    });
    if (signInError) throw new Error("Current password is incorrect");

    const { error: updateError } = await supabase.auth.updateUser({
      password: newPassword,
    });
    if (updateError) throw updateError;
  };

  const deleteAccount = async () => {
    if (!user) throw new Error("No user logged in");
    throw new Error(
      "Account deletion requires backend support. Please implement a secure backend endpoint to handle this."
    );
  };

  return (
    <AuthContext.Provider
      value={{ user, session, loading, signIn, signUp, signOut, updateUser, changePassword, deleteAccount }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
