import Checkbox from "../../../../components/ui/Checkbox";
import Typography from "../../../../components/ui/Typography";
import { cn } from "../../../../utils/cn";
import type { ItemRowProps } from "./types";

export default function ItemRow({
  item,
  isSelected,
  onToggle,
  className = "",
}: ItemRowProps) {
  return (
    <div
      className={cn(
        "flex items-center space-x-3 py-2 px-3 hover:bg-slate-700/50 rounded transition-colors",
        className
      )}
    >
      <Checkbox
        checked={isSelected}
        onChange={onToggle}
        className="text-blue-400"
        aria-label={`Select ${item.name}`}
      />
      <Typography
        variant="caption"
        as="span"
        className="text-slate-200 text-sm"
      >
        {item.name}
      </Typography>
    </div>
  );
}

export type { ItemRowProps } from "./types";
