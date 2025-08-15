import { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';
import type { AuthState, LoginFormData } from '../types';

interface AuthContextType extends AuthState {
  login: (data: LoginFormData) => Promise<void>;
  signup: (data: { email: string; password: string; username: string }) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
