import { InputHTMLAttributes } from "react";

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  size?: "small" | "medium" | "large";
  label?: string;
  error?: string;
  indeterminate?: boolean;
}
