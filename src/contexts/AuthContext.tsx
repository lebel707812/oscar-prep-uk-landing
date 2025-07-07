import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from '../integrations/supabase/client';
;

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
  loading: boolean;
  signOut: () => Promise<void>;
  updateUser: (data: Partial<UserMetadata>) => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  deleteAccount: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Pega usuário atual
  useEffect(() => {
    const sessionUser = supabase.auth.getUser(); // ajustar conforme SDK
    sessionUser.then(({ data, error }) => {
      if (error) {
        setUser(null);
      } else {
        setUser(data.user as User);
      }
      setLoading(false);
    });

    // Também pode usar onAuthStateChange para atualizar
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const updateUser = async (data: Partial<UserMetadata>) => {
    if (!user) throw new Error("No user logged in");

    const { data: updatedUser, error } = await supabase.auth.updateUser({
      data,
    });

    if (error) throw error;

    setUser(updatedUser.user as User);
  };

  const changePassword = async (currentPassword: string, newPassword: string) => {
    if (!user) throw new Error("No user logged in");

    // Supabase não tem endpoint direto para "trocar senha" com a senha antiga,
    // só para enviar email de reset ou alterar diretamente via painel.
    // Para isso, você teria que implementar uma função que:
    // 1) Reautentica usuário (ex: login com email + currentPassword)
    // 2) Depois chama supabase.auth.updateUser({ password: newPassword })

    // Exemplo simplificado:

    // 1) Reautenticar
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: currentPassword,
    });
    if (signInError) throw new Error("Current password is incorrect");

    // 2) Atualizar senha
    const { error: updateError } = await supabase.auth.updateUser({
      password: newPassword,
    });
    if (updateError) throw updateError;
  };

  const deleteAccount = async () => {
    if (!user) throw new Error("No user logged in");

    // Supabase não oferece método direto pra excluir conta via client SDK
    // Você deve criar uma função edge (Serverless Function) para excluir o usuário via Admin API
    // Aqui apenas simulo:
    throw new Error(
      "Account deletion requires backend support. Please implement a secure backend endpoint to handle this."
    );
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, signOut, updateUser, changePassword, deleteAccount }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
