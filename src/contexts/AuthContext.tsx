import React, { createContext, useReducer, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { AuthState, User, LoginFormData } from '../types';
import { findTestAccount, isTestAccount } from '../config/testAccounts';

// Auth Actions
type AuthAction =
  | { type: 'AUTH_START' }
  | { type: 'AUTH_SUCCESS'; payload: User }
  | { type: 'AUTH_FAILURE'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'CLEAR_ERROR' };

// Initial State
const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
};

// Auth Reducer
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'AUTH_START':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'AUTH_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        loading: false,
        error: null,
      };
    case 'AUTH_FAILURE':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        loading: false,
        error: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        loading: false,
        error: null,
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

interface AuthContextType extends AuthState {
  login: (data: LoginFormData) => Promise<void>;
  signup: (data: { email: string; password: string; username: string }) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const AUTH_STORAGE_KEY = 'foo-rum-auth';
const USER_STORAGE_KEY = 'foo-rum-user';

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  useEffect(() => {
    const savedAuth = localStorage.getItem(AUTH_STORAGE_KEY);
    const savedUser = localStorage.getItem(USER_STORAGE_KEY);
    
    if (savedAuth === 'true' && savedUser) {
      try {
        const user = JSON.parse(savedUser);
        dispatch({ type: 'AUTH_SUCCESS', payload: user });
      } catch {
        localStorage.removeItem(AUTH_STORAGE_KEY);
        localStorage.removeItem(USER_STORAGE_KEY);
      }
    }
  }, []);

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const login = async (data: LoginFormData): Promise<void> => {
    dispatch({ type: 'AUTH_START' });
    
    try {
      await delay(1000);
      const testAccount = findTestAccount(data.email, data.password);
      
      if (testAccount) {
        const user: User = testAccount.user;
        localStorage.setItem(AUTH_STORAGE_KEY, 'true');
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
        
        dispatch({ type: 'AUTH_SUCCESS', payload: user });
      } else {
        dispatch({ type: 'AUTH_FAILURE', payload: 'Invalid email or password. Please use one of the test accounts.' });
      }
    } catch {
      dispatch({ type: 'AUTH_FAILURE', payload: 'Login failed. Please try again.' });
    }
  };

  const signup = async (data: { email: string; password: string; username: string }): Promise<void> => {
    dispatch({ type: 'AUTH_START' });
    
    try {
      await delay(1200);
      if (isTestAccount(data.email)) {
        dispatch({ type: 'AUTH_FAILURE', payload: 'This email is already registered. Please use a different email or try logging in.' });
        return;
      }
      const mockUser: User = {
        id: `new-user-${Date.now()}`,
        email: data.email,
        username: data.username,
        avatar: '/src/assets/Users/theresa.png',
      };
      localStorage.setItem(AUTH_STORAGE_KEY, 'true');
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(mockUser));
      
      dispatch({ type: 'AUTH_SUCCESS', payload: mockUser });
    } catch {
      dispatch({ type: 'AUTH_FAILURE', payload: 'Signup failed. Please try again.' });
    }
  };
  const logout = (): void => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    localStorage.removeItem(USER_STORAGE_KEY);
    dispatch({ type: 'LOGOUT' });
  };
  const clearError = useCallback((): void => {
    dispatch({ type: 'CLEAR_ERROR' });
  }, []);

  const value: AuthContextType = {
    ...state,
    login,
    signup,
    logout,
    clearError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
