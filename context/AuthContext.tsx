import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthState } from '../types';
import api from '../lib/axios';

interface AuthContextType extends AuthState {
  login: (userData: User) => void;
  signup: (userData: User) => void;
  googleLogin: (token: string) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const response = await api.get('/api/users/me');
        setState({ user: response.data, isLoading: false, error: null });
      } catch (err) {
        setState({ user: null, isLoading: false, error: null });
      }
    };

    fetchMe();

    const handleUnauthorized = () => {
      setState(prev => ({ ...prev, user: null }));
    };

    window.addEventListener('auth:unauthorized', handleUnauthorized);
    return () => window.removeEventListener('auth:unauthorized', handleUnauthorized);
  }, []);

  const login = (userData: User) => setState({ user: userData, isLoading: false, error: null });
  const signup = (userData: User) => setState({ user: userData, isLoading: false, error: null });
  
  const googleLogin = async (token: string) => {
    try {
      const response = await api.post('/api/auth/google', { token });
      setState({ user: response.data, isLoading: false, error: null });
    } catch (err) {
      console.error('Google Auth Failed', err);
      throw err;
    }
  };

  const logout = async () => {
    try {
      await api.post('/api/auth/logout');
    } finally {
      setState({ user: null, isLoading: false, error: null });
    }
  };

  const updateUser = (userData: Partial<User>) => {
    setState(prev => ({
      ...prev,
      user: prev.user ? { ...prev.user, ...userData } : null
    }));
  };

  return (
    <AuthContext.Provider value={{ ...state, login, signup, googleLogin, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};