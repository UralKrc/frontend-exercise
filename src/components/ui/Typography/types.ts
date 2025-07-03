import { HTMLAttributes } from "react";

export interface TypographyProps extends HTMLAttributes<HTMLElement> {
  variant?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "body"
    | "caption"
    | "label";
  size?: "small" | "medium" | "large";
  weight?: "normal" | "medium" | "semibold" | "bold";
  color?: "primary" | "secondary" | "muted" | "error" | "success";
  as?: keyof JSX.IntrinsicElements;
  children: React.ReactNode;
}
