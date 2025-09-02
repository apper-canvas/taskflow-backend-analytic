import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Input = forwardRef(({ className, type = "text", ...props }, ref) => {
  return (
    <input
      type={type}
      ref={ref}
      className={cn(
        "flex w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm placeholder:text-gray-500 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50 transition-colors duration-200",
        className
      )}
      {...props}
    />
  );
});

Input.displayName = "Input";

export default Input;