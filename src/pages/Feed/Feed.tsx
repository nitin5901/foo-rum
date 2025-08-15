import React, { useMemo, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../../components/Header";
import RichTextEditor from "../../components/RichTextEditor";
import Comment from "../../components/Comment";
import Login from "../../components/Login";
import SignUp from "../../components/SignUp";
import { useAuth } from "../../hooks/useAuth";
import { usePosts } from "../../hooks/usePosts";

import loginIcon from '../../assets/login.svg'

import { comments } from "./config";

const Feed: React.FC = () => {
    const { isAuthenticated, user, logout } = useAuth();
    const { posts, addPost } = usePosts();
    const navigate = useNavigate();

    const [modalType, setModalType] = useState<'login' | 'signup' | null>(null);

    useEffect(() => {
        if (modalType) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [modalType]);

    // When users try to interact without being logged in, show modal
    const handleUnauthenticatedAction = useCallback(() => {
        setModalType('login');
    }, []);

    const handlePostSubmit = useCallback((content: string) => {
        if (!user) return;
        addPost(content, user);
    }, [user, addPost]);

    const handleCloseModal = useCallback(() => {
        setModalType(null);
    }, []);

    const handleShowSignup = useCallback(() => {
        setModalType('signup');
    }, []);

    const handleShowLogin = useCallback(() => {
        setModalType('login');
    }, []);

    const handleLogout = useCallback(() => {
        logout();
    }, [logout]);

    // Header login should redirect to login page
    const handleHeaderLoginClick = useCallback(() => {
        navigate('/login');
    }, [navigate]);

    const rightContent = useMemo(() => {
        if (isAuthenticated) {
            return (
                <div className="flex flex-row items-center gap-2">
                    <p className="text-sm font-bold cursor-pointer" onClick={handleLogout}>Logout</p>
                </div>
            );
        }

        return (
            <div className="flex flex-row items-center gap-2">
                <p className="text-sm font-bold cursor-pointer" onClick={handleHeaderLoginClick}>Login</p>
                <img 
                    src={loginIcon} 
                    alt="" 
                    className="size-5 cursor-pointer" 
                    onClick={handleHeaderLoginClick}
                />
            </div>
        );
    }, [isAuthenticated, handleLogout, handleHeaderLoginClick]);

    return (
        <div className="bg-white flex flex-col items-center py-40 px-2 sm:px-10">
           <Header rightContent={rightContent} />
           <RichTextEditor 
               className="bg-black/3 p-2 rounded-[1.35rem]"
               isAuthenticated={isAuthenticated}
               onUnauthenticatedAction={handleUnauthenticatedAction}
               onPostSubmit={handlePostSubmit}
           />
           <div className="flex flex-col gap-4 mt-7.5 max-w-[660px]">
            {posts.map((post) => (
                <Comment 
                    key={post.id} 
                    userProps={{
                        avatar: post.author.avatar || '',
                        name: post.author.username || post.author.email.split('@')[0]
                    }}
                    messageProps={{
                        message: post.content,
                        timeStamp: post.timestamp,
                        liked: post.liked
                    }}
                    isAuthenticated={isAuthenticated}
                    onUnauthenticatedAction={handleUnauthenticatedAction}
                />
            ))}
            {comments.map((comment, index) => (
                <Comment 
                    key={`comment-${index}`} 
                    userProps={comment.user} 
                    messageProps={comment.message}
                    isAuthenticated={isAuthenticated}
                    onUnauthenticatedAction={handleUnauthenticatedAction}
                />
            ))}
           </div>
           <Login 
               className="z-50" 
               visible={modalType === 'login'} 
               onClose={handleCloseModal} 
               onSignUp={handleShowSignup}
               isModal={true}
           />
           <SignUp 
               className="fixed inset-0 bg-black/45 z-50" 
               visible={modalType === 'signup'} 
               onClose={handleCloseModal} 
               onSignIn={handleShowLogin} 
           />
        </div>
    )
}


export default Feed;