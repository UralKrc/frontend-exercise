import { forwardRef } from "react";
import type { SpinnerProps } from "./types";
import { cn } from "../../../utils/cn";

const sizes = {
  small: "h-4 w-4 border-2",
  medium: "h-6 w-6 border-2",
  large: "h-8 w-8 border-4",
};

export default forwardRef<HTMLDivElement, SpinnerProps>(function Spinner(
  { size = "medium", className = "" },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn(
        "animate-spin border-current border-t-transparent rounded-full",
        sizes[size],
        className
      )}
      role="status"
      aria-label="Loading"
    />
  );
});
