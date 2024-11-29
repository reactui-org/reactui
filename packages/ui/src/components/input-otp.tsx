import * as React from "react";
import { OTPInput, SlotProps } from "input-otp";

import { cn } from "@/lib/utils";

interface InputOTPProps extends React.InputHTMLAttributes<HTMLInputElement> {
  slots?: number;
  label?: string;
  onComplete?: (value: string) => void;
}

const InputOTP: React.FC<InputOTPProps> = ({
  slots = 6,
  label,
  onComplete,
  className = "",
  ...props
}) => {
  return (
    <div className={cn("relative", className)}>
      {label && (
        <label className="absolute left-2 top-2 text-xs text-gray-500 transition-all">
          {label}
        </label>
      )}
      <OTPInput
        maxLength={slots}
        onComplete={onComplete}
        render={({ slots }) => (
          <div className="flex gap-2">
            {slots.map((slot, idx) => (
              <div key={idx}>
                <Slot {...slot} />
              </div>
            ))}
          </div>
        )}
      />
    </div>
  );
};

const Slot = React.forwardRef<HTMLInputElement, SlotProps>(
  ({ char, hasFakeCaret, isActive, ...props }, ref) => {
    return (
      <div className={cn("relative h-14 w-10 text-center", isActive && "z-10")}>
        <input
          {...props}
          ref={ref}
          className={cn(
            "absolute inset-0 h-full w-full text-center text-lg font-medium text-white",
            "bg-neutral-900 hover:bg-neutral-800",
            "border border-neutral-800",
            "focus:outline-none focus:ring-1 focus:ring-neutral-600",
            "rounded-lg transition-colors",
            "disabled:opacity-50",
          )}
        />
        {char && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-lg font-medium text-white">
            {char}
          </div>
        )}
        {hasFakeCaret && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="h-8 w-px animate-caret-blink bg-white" />
          </div>
        )}
      </div>
    );
  },
);
Slot.displayName = "Slot";

export { InputOTP };
