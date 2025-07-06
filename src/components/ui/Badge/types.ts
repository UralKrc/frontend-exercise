import type { HTMLAttributes, ReactNode } from "react";

export type BadgeVariant =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "error";
export type BadgeSize = "small" | "medium" | "large";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  children: ReactNode;
  outline?: boolean;
}
