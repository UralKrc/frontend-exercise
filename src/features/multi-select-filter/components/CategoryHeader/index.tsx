import Typography from "../../../../components/ui/Typography";
import Checkbox from "../../../../components/ui/Checkbox";
import ExpandButton from "../ExpandButton";
import { cn } from "../../../../utils/cn";
import { getCategoryIcon } from "../../../../utils/categoryIcons";
import type { CategoryHeaderProps } from "./types";

export default function CategoryHeader({
  category,
  itemCount,
  selectionState,
  isExpanded,
  onToggle,
  onSelectionChange,
  className = "",
}: CategoryHeaderProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between px-3 py-2 cursor-pointer select-none hover:bg-slate-800/70 rounded-t-lg transition-colors group",
        className
      )}
      onClick={onToggle}
      tabIndex={0}
      role="button"
      aria-expanded={isExpanded}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onToggle();
        }
      }}
    >
      <div className="flex items-center gap-2 min-w-0 flex-1">
        <Checkbox
          checked={selectionState === "all"}
          indeterminate={selectionState === "partial"}
          onChange={(e) => {
            e.stopPropagation();
            onSelectionChange();
          }}
          className="shrink-0"
          tabIndex={-1}
        />
        {getCategoryIcon(category)}
        <Typography
          variant="body"
          as="span"
          className="font-semibold text-white truncate"
        >
          {category}
        </Typography>
        <span className="ml-2 px-2 py-0.5 rounded-full text-xs bg-slate-700 text-slate-200 font-medium">
          {itemCount}
        </span>
      </div>
      <ExpandButton
        isExpanded={isExpanded}
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
        className="ml-2 group-hover:border-white"
        tabIndex={-1}
      />
    </div>
  );
}

export type { CategoryHeaderProps } from "./types";
