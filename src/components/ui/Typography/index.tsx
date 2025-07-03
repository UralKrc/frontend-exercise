import { forwardRef } from "react";
import type { TypographyProps } from "./types";
import { cn } from "../../../utils/cn";

const variants = {
  h1: "text-4xl font-bold",
  h2: "text-3xl font-bold",
  h3: "text-2xl font-semibold",
  h4: "text-xl font-semibold",
  h5: "text-lg font-medium",
  h6: "text-base font-medium",
  body: "text-base",
  caption: "text-sm",
  label: "text-sm font-medium",
};

const sizes = {
  small: "text-sm",
  medium: "text-base",
  large: "text-lg",
};

const weights = {
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
};

const colors = {
  primary: "text-gray-900",
  secondary: "text-gray-700",
  muted: "text-gray-500",
  error: "text-red-600",
  success: "text-green-600",
};

export default forwardRef<HTMLElement, TypographyProps>(function Typography(
  {
    variant = "body",
    size,
    weight,
    color = "primary",
    as,
    children,
    className = "",
    ...props
  },
  ref
) {
  const Component = as || getDefaultElement(variant);

  return (
    <Component
      ref={ref}
      className={cn(
        variants[variant],
        size && sizes[size],
        weight && weights[weight],
        colors[color],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
});

function getDefaultElement(variant: TypographyProps["variant"]) {
  switch (variant) {
    case "h1":
    case "h2":
    case "h3":
    case "h4":
    case "h5":
    case "h6":
      return variant;
    case "body":
      return "p";
    case "caption":
      return "span";
    case "label":
      return "label";
    default:
      return "p";
  }
}

export type { TypographyProps } from "./types";
