
import React, { useState } from 'react';
import heartIcon from '../assets/Comment/heart.svg';
import commentIcon from '../assets/Comment/comment.svg';
import sendIcon from '../assets/Comment/send.svg';
import { formatDate } from '../lib/utils';
import Alert from './ui/alert';

interface CommentProps {
    userProps: {
        avatar: string;
        name: string;
    }
    messageProps: {
        message: string;
        timeStamp: string;
        liked: boolean;
    }
    isAuthenticated?: boolean;
    onUnauthenticatedAction?: () => void;
    animationClass?: string;
}

const Comment = ({ userProps, messageProps, isAuthenticated = false, onUnauthenticatedAction, animationClass }: CommentProps) => {
    const [showAlert, setShowAlert] = useState(false);

    const handleInteraction = (e: React.MouseEvent) => {
        if (!isAuthenticated) {
            e.preventDefault();
            e.stopPropagation();
            onUnauthenticatedAction?.();
        } else {
            e.preventDefault();
            setShowAlert(true);
        }
    };

    const handleCloseAlert = () => {
        setShowAlert(false);
    };
    return (
        <>
            <div className={`bg-black/3 p-2 rounded-[1.35rem] comment-container button-hover-animation ${animationClass || ''}`}>
                <div className="border-black/13 border-1 bg-white rounded-[1rem] p-4 flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                       {userProps.avatar ? <img 
                            src={userProps.avatar} 
                            className="size-9.5 rounded-xl object-cover"
                    /> : <div className="size-9.5 rounded-xl bg-black/5 flex items-center justify-center">{userProps.name.charAt(0).toUpperCase()}</div>}
                        <div className="flex flex-col gap-0.5">
                            <p className="font-semibold text-md m-0">{userProps.name}</p>
                            <span className="text-sm text-black/37">{formatDate(messageProps.timeStamp)}</span>
                        </div>
                    </div>

                    <div className="">
                        <div className="flex items-start gap-2">
                            <span className="size-7 p-0.5 rounded-full bg-black/5 flex items-center justify-center">🥴</span>
                            <p className="flex-1 m-0 px-2" style={{ lineHeight: '1.5' }}>
                                {messageProps.message}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-4.5 m-2">
                    <button 
                        className={`border-none bg-transparent wiggle-hover ${!isAuthenticated ? 'cursor-pointer' : 'cursor-default'}`}
                        onClick={handleInteraction}
                        title={!isAuthenticated ? 'Sign in to like this post' : 'Like'}
                    >
                        <img src={heartIcon} alt="like" className="size-4.5" />
                    </button>
                    <button 
                        className={`border-none bg-transparent wiggle-hover ${!isAuthenticated ? 'cursor-pointer' : 'cursor-default'}`}
                        onClick={handleInteraction}
                        title={!isAuthenticated ? 'Sign in to comment' : 'Comment'}
                    >
                        <img src={commentIcon} alt="comment" className="size-4.5" />
                    </button>
                    <button 
                        className={`border-none bg-transparent wiggle-hover ${!isAuthenticated ? 'cursor-pointer' : 'cursor-default'}`}
                        onClick={handleInteraction}
                        title={!isAuthenticated ? 'Sign in to share' : 'Share'}
                    >
                        <img src={sendIcon} alt="share" className="size-4.5" />
                    </button>
                </div>
            </div>
            
            <Alert
                title="Feature Not Available"
                message="This function is not implemented yet. Stay tuned for updates!"
                type="info"
                visible={showAlert}
                onClose={handleCloseAlert}
                autoClose={true}
                autoCloseDelay={1200}
            />
        </>
    );
}

export default Comment;