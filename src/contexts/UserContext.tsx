
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  balance: number;
  points: number;
}

interface UserContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateBalance: (amount: number) => void;
  updatePoints: (points: number) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>({
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: '/placeholder.svg',
    balance: 1500000,
    points: 2850
  });

  const login = async (email: string, password: string) => {
    // Simulate login
    console.log('Login attempt:', email, password);
    setUser({
      id: '1',
      name: 'John Doe',
      email: email,
      avatar: '/placeholder.svg',
      balance: 1500000,
      points: 2850
    });
  };

  const logout = () => {
    setUser(null);
  };

  const updateBalance = (amount: number) => {
    setUser(prev => prev ? { ...prev, balance: prev.balance + amount } : null);
  };

  const updatePoints = (points: number) => {
    setUser(prev => prev ? { ...prev, points: prev.points + points } : null);
  };

  return (
    <UserContext.Provider value={{
      user,
      login,
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
