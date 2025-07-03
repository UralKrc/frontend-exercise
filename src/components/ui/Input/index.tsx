import { forwardRef, useId } from "react";
import type { InputProps } from "./types";
import { cn } from "../../../utils/cn";

const variants = {
  default: "border-gray-300 focus:border-blue-500 focus:ring-blue-500",
  error: "border-red-500 focus:border-red-500 focus:ring-red-500",
  success: "border-green-500 focus:border-green-500 focus:ring-green-500",
};

const sizes = {
  small: "px-3 py-1.5 text-sm",
  medium: "px-4 py-2 text-base",
  large: "px-4 py-3 text-lg",
};

export default forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    variant = "default",
    size = "medium",
    leftIcon,
    rightIcon,
    label,
    error,
    helperText,
    className = "",
    id,
    ...props
  },
  ref
) {
  const generatedId = useId();
  const inputId = id || generatedId;
  const errorId = error ? `${inputId}-error` : undefined;
  const helperTextId = helperText ? `${inputId}-helper` : undefined;

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      )}

      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {leftIcon}
          </div>
        )}

        <input
          ref={ref}
          id={inputId}
          className={cn(
            "w-full border rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed",
            variants[variant],
            sizes[size],
            leftIcon && "pl-10",
            rightIcon && "pr-10",
            className
          )}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={cn(errorId, helperTextId).trim() || undefined}
          {...props}
        />

        {rightIcon && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {rightIcon}
          </div>
        )}
      </div>

      {(error || helperText) && (
        <p
          id={errorId || helperTextId}
          className={cn(
            "mt-1 text-sm",
            error ? "text-red-600" : "text-gray-500"
          )}
          role={error ? "alert" : undefined}
        >
          {error || helperText}
        </p>
      )}
    </div>
  );
});

export type { InputProps } from "./types";
