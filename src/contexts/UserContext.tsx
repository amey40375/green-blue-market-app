
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { User as SupabaseUser, Session } from '@supabase/supabase-js';

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  balance: number;
  points: number;
  role: string;
}

interface UserContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ error?: string }>;
  signup: (email: string, password: string, name: string) => Promise<{ error?: string }>;
  logout: () => Promise<void>;
  updateBalance: (amount: number) => Promise<void>;
  updatePoints: (points: number) => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        
        if (session?.user) {
          // Fetch user profile from database
          const { data: userData, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', session.user.id)
            .single();

          if (userData && !error) {
            setUser({
              id: userData.id,
              name: userData.nama,
              email: userData.email,
              avatar: '/placeholder.svg',
              balance: userData.saldo || 0,
              points: 0, // You can add points logic later
              role: userData.role || 'pembeli'
            });
          }
        } else {
          setUser(null);
        }
        
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (!session) {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { error: error.message };
      }

      return {};
    } catch (error) {
      return { error: 'Login failed' };
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            nama: name
          },
          emailRedirectTo: `${window.location.origin}/`
        }
      });

      if (error) {
        return { error: error.message };
      }

      return {};
    } catch (error) {
      return { error: 'Signup failed' };
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
  };

  const updateBalance = async (amount: number) => {
    if (!user) return;

    const newBalance = user.balance + amount;
    
    const { error } = await supabase
      .from('users')
      .update({ saldo: newBalance })
      .eq('id', user.id);

    if (!error) {
      setUser(prev => prev ? { ...prev, balance: newBalance } : null);
    }
  };

  const updatePoints = async (points: number) => {
    if (!user) return;
    
    const newPoints = user.points + points;
    setUser(prev => prev ? { ...prev, points: newPoints } : null);
  };

  return (
    <UserContext.Provider value={{
      user,
      session,
      loading,
      login,
      signup,
      logout,
      updateBalance,
      updatePoints
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
};
