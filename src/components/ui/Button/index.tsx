import { forwardRef } from "react";
import type { ButtonProps } from "./types";
import { cn } from "../../../utils/cn";

import Spinner from "../Spinner";

const variants = {
  primary:
    "bg-blue-600 hover:bg-blue-700 text-white border-blue-600 hover:border-blue-700",
  secondary:
    "bg-gray-100 hover:bg-gray-200 text-gray-900 border-gray-300 hover:border-gray-400",
  danger:
    "bg-red-600 hover:bg-red-700 text-white border-red-600 hover:border-red-700",
  ghost:
    "bg-transparent hover:bg-gray-100 text-gray-700 border-transparent hover:border-gray-300",
};

const sizes = {
  small: "px-3 py-1.5 text-sm",
  medium: "px-4 py-2 text-base",
  large: "px-6 py-3 text-lg",
};

export default forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = "primary",
    size = "medium",
    children,
    isLoading = false,
    leftIcon,
    rightIcon,
    fullWidth = false,
    disabled,
    className = "",
    ...props
  },
  ref
) {
  return (
    <button
      ref={ref}
      className={cn(
        "cursor-pointer inline-flex items-center justify-center font-medium rounded-md border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        fullWidth && "w-full",
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Spinner size="small" />}
      {!isLoading && leftIcon && (
        <span className="mr-2 flex items-center">{leftIcon}</span>
      )}

      <span className={isLoading ? "ml-2" : ""}>{children}</span>

      {!isLoading && rightIcon && (
        <span className="ml-2 flex items-center">{rightIcon}</span>
      )}
    </button>
  );
});

export type { ButtonProps } from "./types";
