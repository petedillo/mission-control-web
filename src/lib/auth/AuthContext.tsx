import React, { createContext, useContext, useEffect, useState } from 'react';
import { cloudflareAuth, CloudflareUser } from './CloudflareAuth';

interface AuthContextType {
  user: CloudflareUser | null;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<CloudflareUser | null>(null);

  useEffect(() => {
    // Get user from Cloudflare Access cookie
    const authUser = cloudflareAuth.getUser();
    setUser(authUser);
  }, []);

  const logout = () => {
    cloudflareAuth.logout();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
