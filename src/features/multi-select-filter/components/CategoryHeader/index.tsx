import Checkbox from "../../../../components/ui/Checkbox";
import Typography from "../../../../components/ui/Typography";
import Badge from "../../../../components/ui/Badge";
import ExpandButton from "../ExpandButton";
import { cn } from "../../../../utils/cn";
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
    <div className={cn("p-3 flex items-center justify-between", className)}>
      <div className="flex items-center space-x-3 flex-1">
        <Checkbox
          checked={selectionState === "all"}
          indeterminate={selectionState === "partial"}
          onChange={onSelectionChange}
          className="text-blue-400"
          aria-label={`Select all items in ${category}`}
        />
        <Typography variant="label" className="text-white font-medium">
          {category}
        </Typography>
        <Badge variant="secondary" size="small">
          {itemCount}
        </Badge>
      </div>
      <ExpandButton
        isExpanded={isExpanded}
        onClick={onToggle}
        aria-label={`${
          isExpanded ? "Collapse" : "Expand"
        } ${category} category`}
      />
    </div>
  );
}

export type { CategoryHeaderProps, SelectionState } from "./types";
