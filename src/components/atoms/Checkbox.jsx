import { forwardRef } from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Checkbox = forwardRef(({ className, checked, onChange, ...props }, ref) => {
  return (
    <div className="relative">
      <input
        type="checkbox"
        ref={ref}
        checked={checked}
        onChange={onChange}
        className="sr-only"
        {...props}
      />
      <div
        onClick={() => onChange && onChange({ target: { checked: !checked } })}
        className={cn(
          "w-5 h-5 rounded-md border-2 cursor-pointer transition-all duration-200 flex items-center justify-center",
          checked
            ? "bg-primary border-primary shadow-soft"
            : "border-gray-300 hover:border-primary/50",
          className
        )}
      >
        {checked && (
          <ApperIcon
            name="Check"
            size={12}
            className="text-white animate-check-in"
          />
        )}
      </div>
    </div>
  );
});

Checkbox.displayName = "Checkbox";

export default Checkbox;