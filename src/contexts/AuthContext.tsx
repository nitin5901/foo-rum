import React, { createContext, useReducer, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { AuthState, User, LoginFormData } from '../types';

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

// Auth Context Type
interface AuthContextType extends AuthState {
  login: (data: LoginFormData) => Promise<void>;
  signup: (data: { email: string; password: string; username: string }) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

// Create Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth Provider Props
interface AuthProviderProps {
  children: ReactNode;
}

// Storage Keys
const AUTH_STORAGE_KEY = 'foo-rum-auth';
const USER_STORAGE_KEY = 'foo-rum-user';

// Auth Provider Component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load auth state from localStorage on mount
  useEffect(() => {
    const savedAuth = localStorage.getItem(AUTH_STORAGE_KEY);
    const savedUser = localStorage.getItem(USER_STORAGE_KEY);
    
    if (savedAuth === 'true' && savedUser) {
      try {
        const user = JSON.parse(savedUser);
        dispatch({ type: 'AUTH_SUCCESS', payload: user });
      } catch {
        // Invalid stored data, clear it
        localStorage.removeItem(AUTH_STORAGE_KEY);
        localStorage.removeItem(USER_STORAGE_KEY);
      }
    }
  }, []);

  // Mock API delay function
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  // Login function
  const login = async (data: LoginFormData): Promise<void> => {
    dispatch({ type: 'AUTH_START' });
    
    try {
      // Simulate API call
      await delay(1000);
      
      // Mock successful login (in real app, this would be an API call)
      const mockUser: User = {
        id: '1',
        email: data.email,
        username: data.email.split('@')[0], // Use email prefix as username
        avatar: '/src/assets/Users/john-doe.png', // Default avatar
      };
      
      // Store in localStorage
      localStorage.setItem(AUTH_STORAGE_KEY, 'true');
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(mockUser));
      
      dispatch({ type: 'AUTH_SUCCESS', payload: mockUser });
    } catch {
      dispatch({ type: 'AUTH_FAILURE', payload: 'Login failed. Please try again.' });
    }
  };

  // Signup function
  const signup = async (data: { email: string; password: string; username: string }): Promise<void> => {
    dispatch({ type: 'AUTH_START' });
    
    try {
      // Simulate API call
      await delay(1200);
      
      // Mock successful signup (in real app, this would be an API call)
      const mockUser: User = {
        id: '1',
        email: data.email,
        username: data.username,
        avatar: '/src/assets/Users/jane-doe.png', // Default avatar
      };
      
      // Store in localStorage
      localStorage.setItem(AUTH_STORAGE_KEY, 'true');
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(mockUser));
      
      dispatch({ type: 'AUTH_SUCCESS', payload: mockUser });
    } catch {
      dispatch({ type: 'AUTH_FAILURE', payload: 'Signup failed. Please try again.' });
    }
  };

  // Logout function
  const logout = (): void => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    localStorage.removeItem(USER_STORAGE_KEY);
    dispatch({ type: 'LOGOUT' });
  };

  // Clear error function
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
