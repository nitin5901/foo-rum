import React, { useMemo, useState, useEffect, useCallback } from "react";

import Header from "../../components/Header";
import RichTextEditor from "../../components/RichTextEditor";
import Comment from "../../components/Comment";
import Login from "../../components/Login";
import SignUp from "../../components/SignUp";
import Alert from "../../components/ui/alert";
import { useAuth } from "../../hooks/useAuth";
import { usePosts } from "../../hooks/usePosts";

import loginIcon from '../../assets/login.svg'

import { comments } from "./config";

const Feed: React.FC = () => {
    const { isAuthenticated, user } = useAuth();
    const { posts, addPost } = usePosts();

    const [modalType, setModalType] = useState<'login' | 'signup' | null>(null);
    const [showAlert, setShowAlert] = useState(false);

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

    const handleCloseAlert = useCallback(() => {
        setShowAlert(false);
    }, []);

    const rightContent = useMemo(() => {
        if (isAuthenticated) {
            return (
                <div className="flex flex-row items-center gap-2">
                    <p className="text-sm font-bold cursor-pointer" onClick={() => setShowAlert(true)}>Logout</p>
                </div>
            );
        }

        return (
            <div className="flex flex-row items-center gap-2">
                <p className="text-sm font-bold cursor-pointer" onClick={() => setShowAlert(true)}>Login</p>
                <img 
                    src={loginIcon} 
                    alt="" 
                    className="size-5 cursor-pointer" 
                    onClick={() => setShowAlert(true)}
                />
            </div>
        );
    }, [isAuthenticated]);

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
               className="fixed inset-0 bg-black/45 z-50" 
               visible={modalType === 'login'} 
               onClose={handleCloseModal} 
               onSignUp={handleShowSignup} 
           />
           <SignUp 
               className="fixed inset-0 bg-black/45 z-50" 
               visible={modalType === 'signup'} 
               onClose={handleCloseModal} 
               onSignIn={handleShowLogin} 
           />
           
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
    )
}


export default Feed;