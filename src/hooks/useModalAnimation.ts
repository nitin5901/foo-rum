import { useEffect, useState, useCallback, useMemo } from 'react';

interface ModalAnimationConfig {
  backdropDuration: {
    enter: number;
    exit: number;
  };
  backdropDelay: {
    enter: number;
    exit: number;
  };
  modalDuration: {
    enter: number;
    exit: number;
  };
  modalDelay: {
    enter: number;
    exit: number;
  };
  modalTimingFunction: {
    enter: string;
    exit: string;
  };
  contentDuration: number;
  contentDelay: {
    enter: number;
    exit: number;
  };
}

const defaultConfig: ModalAnimationConfig = {
  backdropDuration: {
    enter: 1000,
    exit: 500,
  },
  backdropDelay: {
    enter: 0,
    exit: 100,
  },
  modalDuration: {
    enter: 400,
    exit: 250,
  },
  modalDelay: {
    enter: 250,
    exit: 0,
  },
  modalTimingFunction: {
    enter: 'ease-out',
    exit: 'ease-in',
  },
  contentDuration: 250,
  contentDelay: {
    enter: 600,
    exit: 0,
  },
};

export function useModalAnimation(isOpen: boolean, config: Partial<ModalAnimationConfig> = {}) {
  const finalConfig = useMemo(() => ({ ...defaultConfig, ...config }), [config]);
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [hasAnimated, setHasAnimated] = useState(false);
  
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      // Small delay to ensure DOM is updated before starting animation
      const timer = setTimeout(() => {
        setHasAnimated(true);
      }, 10);
      return () => clearTimeout(timer);
    } else {
      setHasAnimated(false);
      // Keep component rendered during exit animation
      const maxExitTime = Math.max(
        finalConfig.backdropDuration.exit + finalConfig.backdropDelay.exit,
        finalConfig.modalDuration.exit + finalConfig.modalDelay.exit,
        finalConfig.contentDuration + finalConfig.contentDelay.exit
      );
      
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, maxExitTime);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen, finalConfig]);

  // Handle escape key
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape' && isOpen) {
        // This would need to be passed as a callback
        // We'll handle this in the component
        
    }
  }, [isOpen]);

  useEffect(() => {
    if (shouldRender) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [shouldRender, handleKeyDown]);

  // Generate transition styles
  const getBackdropStyles = () => ({
    opacity: hasAnimated ? 0.75 : 0,
    transition: 'opacity',
    transitionDuration: `${hasAnimated ? finalConfig.backdropDuration.enter : finalConfig.backdropDuration.exit}ms`,
    transitionDelay: `${hasAnimated ? finalConfig.backdropDelay.enter : finalConfig.backdropDelay.exit}ms`,
  });

  const getModalStyles = () => ({
    transform: hasAnimated ? 'translateY(0vh)' : 'translateY(100vh)',
    transition: 'transform',
    transitionDuration: `${hasAnimated ? finalConfig.modalDuration.enter : finalConfig.modalDuration.exit}ms`,
    transitionDelay: `${hasAnimated ? finalConfig.modalDelay.enter : finalConfig.modalDelay.exit}ms`,
    transitionTimingFunction: hasAnimated ? finalConfig.modalTimingFunction.enter : finalConfig.modalTimingFunction.exit,
  });

  const getContentStyles = () => ({
    opacity: hasAnimated ? 1 : 0,
    transform: hasAnimated ? 'translateY(0)' : 'translateY(25%)',
    transition: 'opacity, transform',
    transitionDuration: `${finalConfig.contentDuration}ms`,
    transitionDelay: `${hasAnimated ? finalConfig.contentDelay.enter : finalConfig.contentDelay.exit}ms`,
  });

  const getWrapperStyles = () => ({
    pointerEvents: (isOpen ? 'auto' : 'none') as 'auto' | 'none',
  });

  return {
    shouldRender,
    backdropStyles: getBackdropStyles(),
    modalStyles: getModalStyles(),
    contentStyles: getContentStyles(),
    wrapperStyles: getWrapperStyles(),
  };
}

export type { ModalAnimationConfig };
