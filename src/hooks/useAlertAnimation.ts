import { useEffect, useState, useMemo } from 'react';

interface AlertAnimationConfig {
  backdropDuration: {
    enter: number;
    exit: number;
  };
  backdropDelay: {
    enter: number;
    exit: number;
  };
  alertDuration: {
    enter: number;
    exit: number;
  };
  alertDelay: {
    enter: number;
    exit: number;
  };
  alertTimingFunction: {
    enter: string;
    exit: string;
  };
  contentDuration: number;
  contentDelay: {
    enter: number;
    exit: number;
  };
}

const defaultConfig: AlertAnimationConfig = {
  backdropDuration: {
    enter: 300,
    exit: 200,
  },
  backdropDelay: {
    enter: 0,
    exit: 50,
  },
  alertDuration: {
    enter: 400,
    exit: 250,
  },
  alertDelay: {
    enter: 100,
    exit: 0,
  },
  alertTimingFunction: {
    enter: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    exit: 'ease-in',
  },
  contentDuration: 200,
  contentDelay: {
    enter: 200,
    exit: 0,
  },
};

export function useAlertAnimation(isVisible: boolean, config: Partial<AlertAnimationConfig> = {}) {
  const finalConfig = useMemo(() => ({ ...defaultConfig, ...config }), [config]);
  const [shouldRender, setShouldRender] = useState(isVisible);
  const [hasAnimated, setHasAnimated] = useState(false);
  
  useEffect(() => {
    if (isVisible) {
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
        finalConfig.alertDuration.exit + finalConfig.alertDelay.exit,
        finalConfig.contentDuration + finalConfig.contentDelay.exit
      );
      
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, maxExitTime);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, finalConfig]);

  // Generate transition styles
  const getBackdropStyles = () => ({
    opacity: hasAnimated ? 0.3 : 0,
    transition: 'opacity',
    transitionDuration: `${hasAnimated ? finalConfig.backdropDuration.enter : finalConfig.backdropDuration.exit}ms`,
    transitionDelay: `${hasAnimated ? finalConfig.backdropDelay.enter : finalConfig.backdropDelay.exit}ms`,
  });

  const getAlertStyles = () => ({
    transform: hasAnimated ? 'translateY(0) scale(1)' : 'translateY(-20px) scale(0.95)',
    opacity: hasAnimated ? 1 : 0,
    transition: 'transform, opacity',
    transitionDuration: `${hasAnimated ? finalConfig.alertDuration.enter : finalConfig.alertDuration.exit}ms`,
    transitionDelay: `${hasAnimated ? finalConfig.alertDelay.enter : finalConfig.alertDelay.exit}ms`,
    transitionTimingFunction: hasAnimated ? finalConfig.alertTimingFunction.enter : finalConfig.alertTimingFunction.exit,
  });

  const getContentStyles = () => ({
    opacity: hasAnimated ? 1 : 0,
    transform: hasAnimated ? 'translateY(0)' : 'translateY(10px)',
    transition: 'opacity, transform',
    transitionDuration: `${finalConfig.contentDuration}ms`,
    transitionDelay: `${hasAnimated ? finalConfig.contentDelay.enter : finalConfig.contentDelay.exit}ms`,
  });

  const getWrapperStyles = () => ({
    pointerEvents: (isVisible ? 'auto' : 'none') as 'auto' | 'none',
  });

  return {
    shouldRender,
    backdropStyles: getBackdropStyles(),
    alertStyles: getAlertStyles(),
    contentStyles: getContentStyles(),
    wrapperStyles: getWrapperStyles(),
  };
}

export type { AlertAnimationConfig };
