import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Button = forwardRef(({ className, variant = "primary", size = "md", children, ...props }, ref) => {
  const baseClasses = "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "gradient-primary text-white hover:opacity-90 focus:ring-primary/50 shadow-soft hover:shadow-elevated",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500/50",
    accent: "gradient-accent text-white hover:opacity-90 focus:ring-accent/50 shadow-soft hover:shadow-elevated",
    ghost: "text-gray-600 hover:bg-gray-100 focus:ring-gray-500/50",
    success: "gradient-success text-white hover:opacity-90 focus:ring-success/50 shadow-soft hover:shadow-elevated"
  };
  
  const sizes = {
    sm: "px-3 py-1.5 text-sm rounded-lg",
    md: "px-4 py-2 text-sm rounded-xl",
    lg: "px-6 py-3 text-base rounded-xl"
  };
  
  return (
    <button
      ref={ref}
      className={cn(
        baseClasses,
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;