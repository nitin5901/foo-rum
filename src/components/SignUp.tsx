import React, { useState, useEffect, useCallback } from 'react';

import loginIcon from '../assets/login.svg';
import Input from './ui/input';
import { Button } from './ui/button';
import { useAuth } from '../hooks/useAuth';
import Alert from './ui/alert';

interface SignUpProps {
  visible?: boolean;
  className?: string;
  onClose?: () => void;
  onSignIn?: () => void;
  onSignUp?: () => void;
}

const SignUp: React.FC<SignUpProps> = ({ className, visible, onClose }) => {
  const { loading, error, clearError, isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({ 
    email: '', 
    password: '', 
    repeatPassword: '', 
    username: '' 
  });
  const [passwordError, setPasswordError] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (isAuthenticated && visible) {
      onClose?.();
    }
  }, [isAuthenticated, visible, onClose]);

  const memoizedClearError = useCallback(() => {
    clearError();
  }, [clearError]);

  useEffect(() => {
    if (visible) {
      memoizedClearError();
      setPasswordError('');
    }
  }, [visible, memoizedClearError]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (name === 'password' || name === 'repeatPassword') {
      setPasswordError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowAlert(true);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };
  
  if (!visible) return null;
  
  return (
    <div className={`flex flex-col items-center justify-center p-4 ${className}`} onClick={() => onClose?.()}>
      <div className='bg-grey px-3 pt-3 rounded-4xl flex flex-col items-center' onClick={(e) => e.stopPropagation()}>
        <div className="bg-white rounded-3xl p-8 flex flex-col items-center gap-5.5">
          
          <div className="size-13 bg-disabled rounded-full flex items-center justify-center">
            <img src={loginIcon} alt="signup" className="size-6" />
          </div>
        
          <div className="flex flex-col items-center gap-2 text-center">
            <p className="text-xl font-bold m-0">
              Create an account to continue
            </p>
            <p className="text-black/48 font-normal text-ms m-0">
              Create an account to access all the features on this app
            </p>
          </div>

          {(error || passwordError) && (
            <div className="w-full p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm text-center">{error || passwordError}</p>
            </div>
          )}

          <form className="mt-4 sm:mt-16 pb-4 flex flex-col gap-6 w-full sm:w-[498px]" onSubmit={handleSubmit}>
            
            <Input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username (optional)"
              label="Username"
              value={formData.username}
              onChange={handleInputChange}
              disabled={loading}
            />
            
            <Input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              required
              label="Email"
              value={formData.email}
              onChange={handleInputChange}
              disabled={loading}
            />
            
            <Input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              label="Password"
              required
              value={formData.password}
              onChange={handleInputChange}
              disabled={loading}
            />
            
            <Input
              type="password"
              id="repeatPassword"
              name="repeatPassword"
              placeholder="Enter your password again"
              label="Repeat password"
              required
              value={formData.repeatPassword}
              onChange={handleInputChange}
              disabled={loading}
            />

            <Button variant="default" size="lg" type="submit" disabled={loading} onClick={handleSubmit}>
              {loading ? 'Creating Account...' : 'Sign Up'}
            </Button>
          </form>
        </div>
        
        <p className="text-black/60 text-sm flex items-center">
          Already have an account?
          <Button variant="ghost" size="sm" onClick={() => setShowAlert(true)}>
            Sign In
          </Button>
        </p>
        
      </div>
      
      <Alert
        title="Feature Not Available"
        message="This function is not implemented yet. Stay tuned for updates!"
        type="info"
        visible={showAlert}
        onClose={handleCloseAlert}
        autoClose={true}
        autoCloseDelay={3000}
      />
    </div>
  );
};

export default SignUp;
