import type { InputHTMLAttributes, ReactNode } from "react";

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  variant?: "default" | "error" | "success";
  size?: "small" | "medium" | "large";
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  label?: string;
  error?: string;
  helperText?: string;
}
