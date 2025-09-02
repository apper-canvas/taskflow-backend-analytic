import { forwardRef } from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Select = forwardRef(({ className, children, ...props }, ref) => {
  return (
    <div className="relative">
      <select
        ref={ref}
        className={cn(
          "flex w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50 appearance-none transition-colors duration-200",
          className
        )}
        {...props}
      >
        {children}
      </select>
      <ApperIcon
        name="ChevronDown"
        size={16}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
      />
    </div>
  );
});

Select.displayName = "Select";

export default Select;