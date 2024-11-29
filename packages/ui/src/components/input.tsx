import * as React from "react";
import { cn } from "@/lib/utils";

interface InputElementProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input: React.FC<InputElementProps> = ({
  label,
  className = "",
  ...props
}) => {
  return (
    <div className="relative">
      {label && (
        <label
          htmlFor={props.id}
          className={cn(
            "absolute left-2 text-xs text-gray-500 transition-all",
            "peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm",
            "peer-focus:top-2 peer-focus:text-xs",
            props.value ? "top-2" : "top-1/2 -translate-y-1/2 text-sm",
          )}
        >
          {label}
        </label>
      )}
      <input
        className={cn(
          "peer w-full px-2 pt-6 pb-2 text-white placeholder-transparent rounded-lg",
          "bg-neutral-900 hover:bg-neutral-800",
          "focus:outline-none focus:ring-1 focus:ring-neutral-600",
          "transition-colors",
          className,
        )}
        placeholder={label || props.placeholder}
        {...props}
      />
    </div>
  );
};

export { Input };
