import { useReducer } from 'react';
import type { Post, User } from '../types';

export type PostsAction =
  | { type: 'ADD_POST'; payload: Post }
  | { type: 'UPDATE_POST'; payload: { id: string; updates: Partial<Post> } }
  | { type: 'DELETE_POST'; payload: string }
  | { type: 'TOGGLE_LIKE'; payload: string };

const postsReducer = (state: Post[], action: PostsAction): Post[] => {
  switch (action.type) {
    case 'ADD_POST':
      return [action.payload, ...state];
    case 'UPDATE_POST':
      return state.map(post =>
        post.id === action.payload.id
          ? { ...post, ...action.payload.updates }
          : post
      );
    case 'DELETE_POST':
      return state.filter(post => post.id !== action.payload);
    case 'TOGGLE_LIKE':
      return state.map(post =>
        post.id === action.payload
          ? { ...post, liked: !post.liked }
          : post
      );
    default:
      return state;
  }
};

export const usePosts = () => {
  const [posts, dispatch] = useReducer(postsReducer, []);

  const addPost = (content: string, author: User) => {
    if (!content.trim()) return;

    const newPost: Post = {
      id: Date.now().toString(),
      content: content.trim(),
      author,
      timestamp: new Date().toISOString(),
      liked: false
    };

    dispatch({ type: 'ADD_POST', payload: newPost });
  };

  const updatePost = (id: string, updates: Partial<Post>) => {
    dispatch({ type: 'UPDATE_POST', payload: { id, updates } });
  };

  const deletePost = (id: string) => {
    dispatch({ type: 'DELETE_POST', payload: id });
  };

  const toggleLike = (id: string) => {
    dispatch({ type: 'TOGGLE_LIKE', payload: id });
  };

  return {
    posts,
    addPost,
    updatePost,
    deletePost,
    toggleLike,
    dispatch
  };
};
