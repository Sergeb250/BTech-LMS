import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // MOCK USER FOR OPEN ACCESS
  const mockUser: User = {
    id: 'guest-user-123',
    app_metadata: {},
    user_metadata: { full_name: 'Guest Student' },
    aud: 'authenticated',
    created_at: new Date().toISOString(),
    email: 'guest@btech.africa',
    phone: '',
    role: 'authenticated',
    updated_at: new Date().toISOString()
  };

  // Always return the mock user
  const [user] = useState<User | null>(mockUser);
  const [session] = useState<Session | null>({
    access_token: 'mock-token',
    refresh_token: 'mock-refresh',
    expires_in: 3600,
    token_type: 'bearer',
    user: mockUser
  });
  const [loading] = useState(false);

  // Dummy functions that do nothing or log
  const signUp = async () => ({ error: null });
  const signIn = async () => ({ error: null });
  const signOut = async () => { console.log("Sign out disabled for open access"); };

  return (
    <AuthContext.Provider value={{ user, session, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
