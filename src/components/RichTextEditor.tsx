import React, { useState } from 'react';
import Alert from './ui/alert';
import chevronDown from '../assets/Editor/chevron-down.svg'
import boldIcon from '../assets/Editor/text-bold.svg'
import italicIcon from '../assets/Editor/text-italic.svg'
import underlineIcon from '../assets/Editor/text-underline.svg'
import unorderedListIcon from '../assets/Editor/list-unordered.svg'
import orderedListIcon from '../assets/Editor/list-ordered.svg'
import quoteIcon from '../assets/Editor/quotes.svg'
import scriptIcon from '../assets/Editor/script.svg'
import trashIcon from '../assets/Editor/trash.svg'
import smileIcon from '../assets/Editor/smile.svg'
import plusIcon from '../assets/Editor/plus.svg'
import micIcon from '../assets/Editor/mic.svg'
import cameraIcon from '../assets/Editor/video-camera.svg'
import sendIcon from '../assets/Editor/send.png'


interface RichTextEditorProps {
    className?: string;
    isAuthenticated?: boolean;
    onUnauthenticatedAction?: () => void;
    onPostSubmit?: (content: string) => void;
}

const RichTextEditor = ({ className, isAuthenticated = false, onUnauthenticatedAction, onPostSubmit }: RichTextEditorProps) => {
    const [content, setContent] = useState('');
    const [showAlert, setShowAlert] = useState(false);

    const handleInteraction = (e: React.MouseEvent | React.KeyboardEvent) => {
        if (!isAuthenticated) {
            e.preventDefault();
            e.stopPropagation();
            onUnauthenticatedAction?.();
        } else {
            e.preventDefault();
            e.stopPropagation();
            setShowAlert(true);
        }
    };

    const handleTextareaClick = (e: React.MouseEvent<HTMLTextAreaElement>) => {
        if (!isAuthenticated) {
            e.preventDefault();
            e.currentTarget.blur();
            onUnauthenticatedAction?.();
        }
    };

    const handleTextareaKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (!isAuthenticated) {
            e.preventDefault();
            onUnauthenticatedAction?.();
        }
    };

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
    };

    const handleSendPost = () => {
        if (isAuthenticated && content.trim() && onPostSubmit) {
            onPostSubmit(content);
            setContent('');
        } else if (!isAuthenticated) {
            onUnauthenticatedAction?.();
        }
    };

    const handleClearContent = () => {
        if (isAuthenticated) {
            setShowAlert(true);
        } else {
            onUnauthenticatedAction?.();
        }
    };

    const handleCloseAlert = () => {
        setShowAlert(false);
    };
    return <div className={`flex flex-col ${className}`}>
        <div className="border-black/13 border-1 bg-white rounded-[1rem] flex flex-col py-2">
            <div className="flex flex-row flex-wrap bg-white items-center sm:gap-20 md:gap-40 mx-2">
                <div className="flex flex-row flex-wrap bg-black/3 p-1 rounded-md flex-1 gap-2 sm:gap-0">
                    <div className="flex items-center justify-center bg-white gap-1 sm:gap-2 p-1 sm:p-2 rounded-md">
                        <div 
                            className="bg-white appearance-none font-normal text-sm border-none outline-none cursor-pointer"
                            onClick={handleInteraction}
                        >
                            Paragraph
                        </div>
                        <img src={chevronDown} alt="" className="size-2.5" />
                    </div>
                    <div 
                        className={`flex items-center justify-center sm:gap-2 bg-white rounded-xl ml-3 sm:ml-6 size-8 ${!isAuthenticated ? 'cursor-pointer' : 'cursor-default'}`}
                        onClick={handleInteraction}
                    >
                        <img src={boldIcon} alt="bold" />
                    </div>
                    <div 
                        className={`flex items-center justify-center sm:gap-2 sm:p-2 rounded-xl ml-3 sm:ml-0.5 ${!isAuthenticated ? 'cursor-pointer' : 'cursor-default'}`}
                        onClick={handleInteraction}
                    >
                        <img src={italicIcon} alt="italic" />
                    </div>
                    <div 
                        className={`flex items-center justify-center sm:gap-2 sm:p-2 rounded-xl ml-3 sm:ml-0.5 ${!isAuthenticated ? 'cursor-pointer' : 'cursor-default'}`}
                        onClick={handleInteraction}
                    >
                        <img src={underlineIcon} alt="underline" />
                    </div>
                    <span className="h-8 w-[1.5px] bg-black/10 mx-2 sm:mx-4" />
                    <div 
                        className={`flex items-center justify-center sm:gap-2 sm:p-2 rounded-xl ml-3 sm:ml-0.5 ${!isAuthenticated ? 'cursor-pointer' : 'cursor-default'}`}
                        onClick={handleInteraction}
                    >
                        <img src={unorderedListIcon} alt="unordered-list" />
                    </div>
                    <div 
                        className={`flex items-center justify-center sm:gap-2 sm:p-2 rounded-xl ml-3 sm:ml-0.5 ${!isAuthenticated ? 'cursor-pointer' : 'cursor-default'}`}
                        onClick={handleInteraction}
                    >
                        <img src={orderedListIcon} alt="ordered-list" />
                    </div>
                    <span className="h-8 w-[1.5px] bg-black/10 mx-2 sm:mx-4" />
                    <div 
                        className={`flex items-center justify-center sm:gap-2 sm:p-2 rounded-xl ml-3 sm:ml-0.5 ${!isAuthenticated ? 'cursor-pointer' : 'cursor-default'}`}
                        onClick={handleInteraction}
                    >
                        <img src={quoteIcon} alt="quote" />
                    </div>
                    <div 
                        className={`flex items-center justify-center sm:gap-2 sm:p-2 rounded-xl ml-3 sm:ml-0.5 ${!isAuthenticated ? 'cursor-pointer' : 'cursor-default'}`}
                        onClick={handleInteraction}
                    >
                        <img src={scriptIcon} alt="script" />
                    </div>
                </div>
                <div 
                    className={`hidden sm:flex items-center justify-center bg-destructive/15 rounded-xl size-10 aspect-square cursor-pointer`}
                    onClick={handleClearContent}
                    title={!isAuthenticated ? "Sign in to clear content" : "Clear content"}
                >
                    <img src={trashIcon} />
                </div>
            </div>
            <div className="flex flex-row bg-white p-2 gap-2 rounded-md relative mx-2">
                <div className="flex gap-2 bg-white rounded-md absolute left-2 mt-1.5">
                    <img 
                        src={smileIcon} 
                        className={`size-4.5 ${!isAuthenticated ? 'cursor-pointer' : 'cursor-default'}`}
                        onClick={handleInteraction}
                    />
                </div>
                <textarea 
                    className={`bg-white font-normal text-black rounded-md resize-none border-none outline-none flex-1 ${!isAuthenticated ? 'cursor-pointer' : ''}`}
                    style={{ textIndent: '25px', lineHeight: 2 }} 
                    rows={4} 
                    placeholder={isAuthenticated ? "How are you feeling today?" : "Sign in to start posting..."}
                    value={content}
                    onChange={handleContentChange}
                    onClick={handleTextareaClick}
                    onKeyDown={handleTextareaKeyDown}
                    readOnly={!isAuthenticated}
                />
            </div>
            <span className="h-[1px] w-full bg-black/10" />
            <div className="flex items-center justify-between mx-4 mt-2">
                <div className="flex items-center gap-4">
                    <img 
                        src={plusIcon} 
                        className={`size-4.5 bg-black/5 rounded-xl p-2 ${!isAuthenticated ? 'cursor-pointer' : 'cursor-default'}`}
                        onClick={handleInteraction}
                    />
                    <img 
                        src={micIcon} 
                        className={`size-4.5 ${!isAuthenticated ? 'cursor-pointer' : 'cursor-default'}`}
                        onClick={handleInteraction}
                    />
                    <img 
                        src={cameraIcon} 
                        className={`size-4.5 ${!isAuthenticated ? 'cursor-pointer' : 'cursor-default'}`}
                        onClick={handleInteraction}
                    />
                </div>
                <div className="flex flex-row-reverse items-center gap-4">
                    <img 
                        src={sendIcon} 
                        className={`size-4.5 cursor-pointer ${!isAuthenticated || !content.trim() ? 'opacity-50' : ''}`}
                        onClick={handleSendPost}
                        title={!isAuthenticated ? "Sign in to post" : content.trim() ? "Send post" : "Enter some content to post"}
                    />
                    <div 
                        className={`flex items-center justify-center bg-destructive/15 rounded-lg size-8 aspect-square sm:hidden cursor-pointer`}
                        onClick={handleClearContent}
                        title={!isAuthenticated ? "Sign in to clear content" : "Clear content"}
                    >
                        <img src={trashIcon} />
                    </div>
                </div>
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
    </div>
}

export default RichTextEditor;