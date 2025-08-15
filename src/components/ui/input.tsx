import React, { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: "default";
  className?: string;
  label?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ variant = "default", className = "", label, ...props }, ref) => {
    const baseStyles = "font-normal transition-colors duration-200 focus:outline-none px-4 py-3";
    
    const variantStyles = {
      default: "border border-transparent rounded-lg font-normal text-sm placeholder:text-black/48 bg-inactive hover:border-black focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20 disabled:bg-disabled disabled:cursor-not-allowed disabled:opacity-50"
    };

    const combinedClassName = `${baseStyles} ${variantStyles[variant]}`;

    return (
        <div className={`flex flex-col gap-1 w-full ${className}`}>
            <label 
                htmlFor={props.id} 
                className="block text-sm font-semibold mb-1"
                >
                {label}
            </label>
            <input
                ref={ref}
                className={combinedClassName}
                {...props}
            />
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
