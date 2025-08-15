    import React, { useState, useEffect, useCallback } from 'react';

    import loginIcon from '../assets/login.svg';
    import Input from './ui/input';
    import { Button } from './ui/button';
    import { useAuth } from '../hooks/useAuth';

    interface LoginProps {
    visible?: boolean;
    className?: string;
    onClose?: () => void;
    onSignIn?: () => void;
    onSignUp?: () => void;
    }

    const Login: React.FC<LoginProps> = ({  className, visible, onClose, onSignUp }) => {
    const { login, loading, error, clearError, isAuthenticated } = useAuth();
    const [formData, setFormData] = useState({ email: '', password: '' });

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
        }
    }, [visible, memoizedClearError]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.email && formData.password) {
            await login(formData);
        }
    };

    if (!visible) return null;
    
    return (
        <div className={`flex flex-col items-center justify-center p-4 ${className}`} onClick={() => onClose?.()} >
            <div className='bg-grey px-3 pt-3 rounded-4xl flex flex-col items-center' onClick={(e) => e.stopPropagation()}>
                <div className="bg-white rounded-3xl p-8 flex flex-col items-center gap-5.5">
                    
                    <div className="size-13 bg-disabled rounded-full flex items-center justify-center">
                        <img src={loginIcon} alt="login" className="size-6" />
                    </div>
                

                    <div className="flex flex-col items-center gap-2 text-center">
                    <p className="text-xl font-bold m-0">
                        Sign in to continue
                    </p>
                    <p className="text-black/48 font-normal text-ms m-0">
                        Sign in to access all the features on this app
                    </p>
                    </div>

                    {error && (
                        <div className="w-full p-3 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-red-600 text-sm text-center">{error}</p>
                        </div>
                    )}

                    <form className="mt-4 sm:mt-16 pb-4 flex flex-col gap-6 w-full sm:w-[498px]" onSubmit={handleSubmit}>
                    
                        <Input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter your email or username"
                        required
                        label="Email or username"
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
                    

                        <Button variant="default" size="lg" type="submit" disabled={loading}>
                            {loading ? 'Signing In...' : 'Sign In'}
                        </Button>
                    </form>
                </div>
               
                <p className="text-black/60 text-sm flex items-center">
                    Do not have an account?
                    <Button variant="ghost" size="sm" onClick={() => onSignUp?.()}>
                        Sign Up
                    </Button>
                </p>
                
            </div>
        </div>
    );
    };

    export default Login;
