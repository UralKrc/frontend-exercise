import Button from "../../../../components/ui/Button";
import type { ExpandButtonProps } from "./types";

export default function ExpandButton({
  isExpanded,
  "aria-label": ariaLabel,
  ...props
}: ExpandButtonProps) {
  return (
    <Button
      variant="ghost"
      size="small"
      aria-label={ariaLabel || `${isExpanded ? "Collapse" : "Expand"} category`}
      className="text-slate-400 hover:text-slate-700 p-1 min-w-0"
      {...props}
    >
      {isExpanded ? "▼" : "▶"}
    </Button>
  );
}

export type { ExpandButtonProps } from "./types";
