
export interface LoginFormData {
  email: string;
  password: string;
}

// Auth Types
export interface User {
  id: string;
  email: string;
  username?: string;
  avatar?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
}

// Post Types
export interface Post {
  id: string;
  content: string;
  author: User;
  timestamp: string;
  liked: boolean;
}

export interface Comment {
  user: {
    avatar: string;
    name: string;
  };
  message: {
    message: string;
    timeStamp: string;
    liked: boolean;
  };
}
