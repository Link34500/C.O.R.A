import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={`input input-bordered w-full ${className}`}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
