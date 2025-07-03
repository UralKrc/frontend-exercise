import { forwardRef, useId } from "react";
import type { CheckboxProps } from "./types";
import { cn } from "../../../utils/cn";

const sizes = {
  small: "h-4 w-4",
  medium: "h-5 w-5",
  large: "h-6 w-6",
};

export default forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  {
    size = "medium",
    label,
    error,
    indeterminate = false,
    className = "",
    id,
    ...props
  },
  ref
) {
  const generatedId = useId();
  const checkboxId = id || generatedId;
  const errorId = error ? `${checkboxId}-error` : undefined;

  return (
    <div className="flex items-start">
      <div className="flex items-center h-5">
        <input
          ref={(input) => {
            if (input) {
              input.indeterminate = indeterminate;
            }
            if (typeof ref === "function") {
              ref(input);
            } else if (ref) {
              ref.current = input;
            }
          }}
          type="checkbox"
          id={checkboxId}
          className={cn(
            "rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-2 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed",
            sizes[size],
            className
          )}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={errorId}
          {...props}
        />
      </div>

      {label && (
        <div className="ml-3 text-sm">
          <label htmlFor={checkboxId} className="font-medium text-gray-700">
            {label}
          </label>
          {error && (
            <p id={errorId} className="text-red-600 mt-1" role="alert">
              {error}
            </p>
          )}
        </div>
      )}
    </div>
  );
});

export type { CheckboxProps } from "./types";
