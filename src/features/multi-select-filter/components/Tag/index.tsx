import { cn } from "../../../../utils/cn";
import type { TagProps } from "./types";

const variants = {
  primary: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  secondary: "bg-slate-700/20 text-slate-100 border-slate-700/30",
};

export default function Tag({
  label,
  onRemove,
  variant = "primary",
  className = "",
}: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-1 rounded text-xs font-medium border",
        variants[variant],
        className
      )}
    >
      {label}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="ml-1 w-4 h-4 flex items-center justify-center rounded-full text-inherit hover:text-white hover:bg-white/10 transition-colors"
          aria-label={`Remove ${label}`}
        >
          ×
        </button>
      )}
    </span>
  );
}

export type { TagProps } from "./types";
