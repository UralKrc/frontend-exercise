import Typography from "../../../../components/ui/Typography";
import Badge from "../../../../components/ui/Badge";
import Button from "../../../../components/ui/Button";
import Tag from "../Tag";
import { cn } from "../../../../utils/cn";
import type { SelectedItemsSummaryProps } from "./types";

export default function SelectedItemsSummary({
  selectedCount,
  categories,
  onClearAll,
  onRemoveCategory,
  className = "",
}: SelectedItemsSummaryProps) {
  if (selectedCount === 0) {
    return null;
  }

  return (
    <div
      className={cn("p-4 border-b border-slate-700 bg-slate-800/50", className)}
    >
      <div className="flex items-center justify-between mb-3">
        <Typography variant="h5" className="text-white">
          ✨ Selected Items
        </Typography>
        <Badge
          variant="primary"
          size="medium"
          className="bg-gradient-to-r from-blue-500 to-purple-500"
        >
          {selectedCount}
        </Badge>
      </div>
      <Typography variant="caption" as="div">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Tag
              key={category}
              label={category}
              variant="primary"
              onRemove={
                onRemoveCategory ? () => onRemoveCategory(category) : undefined
              }
            />
          ))}
        </div>
        {onClearAll && categories.length > 0 && (
          <Button
            variant="ghost"
            size="small"
            onClick={onClearAll}
            className="mt-2 text-xs p-0 h-auto font-normal text-gray-500"
          >
            Clear all selections
          </Button>
        )}
      </Typography>
    </div>
  );
}

export type { SelectedItemsSummaryProps } from "./types";
