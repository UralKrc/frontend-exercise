import { forwardRef } from "react";
import type { BadgeProps } from "./types";
import { cn } from "../../../utils/cn";

const variants = {
  primary: "bg-blue-500 text-white",
  secondary: "bg-slate-700 text-slate-300",
  success: "bg-green-500 text-white",
  warning: "bg-yellow-500 text-white",
  error: "bg-red-500 text-white",
};

const outlineVariants = {
  primary: "border-blue-500 text-blue-500 bg-blue-500/20",
  secondary: "border-slate-700 text-slate-300 bg-slate-700/20",
  success: "border-green-500 text-green-500 bg-green-500/20",
  warning: "border-yellow-500 text-yellow-500 bg-yellow-500/20",
  error: "border-red-500 text-red-500 bg-red-500/20",
};

const sizes = {
  small: "px-2 py-0.5 text-xs",
  medium: "px-3 py-1 text-sm",
  large: "px-4 py-1.5 text-base",
};

export default forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  {
    variant = "primary",
    size = "medium",
    outline = false,
    children,
    className = "",
    ...props
  },
  ref
) {
  return (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center font-medium rounded-full transition-colors duration-200",
        outline ? outlineVariants[variant] : variants[variant],
        outline && "border",
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
});

export type { BadgeProps } from "./types";
