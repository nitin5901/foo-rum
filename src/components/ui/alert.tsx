import React, { useEffect } from 'react';
import crossIcon from '../../assets/cross.svg';
import { useAlertAnimation } from '../../hooks/useAlertAnimation';

export interface AlertProps {
  title?: string;
  message: string;
  type?: 'info' | 'warning' | 'error' | 'success';
  visible: boolean;
  onClose: () => void;
  autoClose?: boolean;
  autoCloseDelay?: number;
  actionButton?: {
    text: string;
    onClick: () => void;
  };
}

const Alert: React.FC<AlertProps> = ({
  title,
  message,
  type = 'info',
  visible,
  onClose,
  autoClose = true,
  autoCloseDelay = 1200,
  actionButton
}) => {
  const {
    shouldRender,
    backdropStyles,
    alertStyles,
    contentStyles,
    wrapperStyles
  } = useAlertAnimation(visible);

  useEffect(() => {
    if (visible && autoClose) {
      const timer = setTimeout(() => {
        onClose();
      }, autoCloseDelay);

      return () => clearTimeout(timer);
    }
  }, [visible, autoClose, autoCloseDelay, onClose]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && visible) {
        onClose();
      }
    };

    if (visible) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [visible, onClose]);

  const getTypeStyles = () => {
    switch (type) {
      case 'error':
        return 'bg-white border-black border-2 text-black';
      case 'warning':
        return 'bg-gray-100 border-gray-800 border-2 text-black';
      case 'success':
        return 'bg-black border-white border-2 text-white';
      case 'info':
      default:
        return 'bg-white border-gray-400 border text-black';
    }
  };

  const getButtonStyles = () => {
    switch (type) {
      case 'error':
        return 'bg-black hover:bg-gray-800 text-white border border-black';
      case 'warning':
        return 'bg-gray-800 hover:bg-gray-900 text-white border border-gray-800';
      case 'success':
        return 'bg-white hover:bg-gray-100 text-black border border-white';
      case 'info':
      default:
        return 'bg-gray-600 hover:bg-gray-700 text-white border border-gray-600';
    }
  };

  const getCloseIconStyles = () => {
    switch (type) {
      case 'success':
        return 'w-5 h-5';
      case 'error':
      case 'warning':
      case 'info':
      default:
        return 'w-5 h-5';
    }
  };

  if (!shouldRender) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4"
      style={wrapperStyles}
    >
      <div 
        className="absolute inset-0 bg-black backdrop-blur-sm"
        style={backdropStyles}
        onClick={onClose}
      />
      
      <div 
        className={`relative w-full max-w-md p-6 rounded-lg border shadow-lg ${getTypeStyles()}`}
        style={alertStyles}
      >
        <div className="flex items-start justify-between" style={contentStyles}>
          <div className="flex-1 pr-4">
            {title && (
              <h3 className="text-lg font-semibold mb-2">
                {title}
              </h3>
            )}
            <p className="text-sm leading-relaxed mb-4">
              {message}
            </p>
            
            {actionButton && (
              <button
                onClick={actionButton.onClick}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${getButtonStyles()}`}
              >
                {actionButton.text}
              </button>
            )}
          </div>
          
          <button
            onClick={onClose}
            className="flex-shrink-0 p-1 hover:opacity-70 transition-opacity border-none bg-transparent"
            aria-label="Close"
          >
            <img src={crossIcon} alt="Close" className={getCloseIconStyles()} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Alert;
