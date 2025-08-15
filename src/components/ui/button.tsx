import React from 'react';
const cn = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(' ');
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'ghost' | 'outline';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

const getVariantClasses = (variant: ButtonProps['variant']) => {
  switch (variant) {
    case 'ghost':
      return 'text-black outline-none border-none bg-transparent text-primary font-semibold';
    case 'outline':
      return 'border border-slate-200 bg-white hover:bg-grey hover:text-slate-900 text-slate-700';
    case 'default':
    default:
      return 'bg-primary text-white outline-none border-none rounded-2xl';
  }
};

const getSizeClasses = (size: ButtonProps['size']) => {
  switch (size) {
    case 'sm':
      return 'h-9 rounded-md px-3 text-sm';
    case 'lg':
      return 'h-11 rounded-md px-8 text-base';
    case 'icon':
      return 'h-10 w-10';
    case 'default':
    default:
      return 'h-10 px-4 py-2 text-sm';
  }
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    const baseClasses = 'inline-flex items-center justify-center whitespace-nowrap rounded-md font-normal transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';
    const variantClasses = getVariantClasses(variant);
    const sizeClasses = getSizeClasses(size);

    return (
      <button
        className={cn(baseClasses, variantClasses, sizeClasses, className)}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export { Button };
