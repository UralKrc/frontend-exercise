import CategoryHeader from "../CategoryHeader";
import ItemRow from "../ItemRow";
import { cn } from "../../../../utils/cn";
import type { CategoryItemProps, SelectionState } from "./types";

export default function CategoryItem({
  category,
  items,
  selectedItems,
  isExpanded,
  onToggleExpanded,
  onToggleItem,
  onSelectAll,
  onDeselectAll,
  className = "",
}: CategoryItemProps) {
  const getSelectionState = (): SelectionState => {
    const selectedInCategory = items.filter((item) =>
      selectedItems.has(item.id)
    );

    if (selectedInCategory.length === 0) return "none";
    if (selectedInCategory.length === items.length) return "all";
    return "partial";
  };

  const selectionState = getSelectionState();

  const handleSelectionChange = () => {
    if (selectionState === "all") {
      onDeselectAll();
    } else {
      onSelectAll();
    }
  };

  return (
    <div
      className={cn(
        "bg-slate-800/50 rounded-lg border border-slate-700",
        className
      )}
    >
      <CategoryHeader
        category={category}
        itemCount={items.length}
        selectionState={selectionState}
        isExpanded={isExpanded}
        onToggle={onToggleExpanded}
        onSelectionChange={handleSelectionChange}
      />

      {isExpanded && (
        <div className="px-3 pb-3 border-t border-slate-700/50">
          <div className="space-y-1 max-h-48 overflow-y-auto pt-2">
            {items.map((item) => (
              <ItemRow
                key={item.id}
                item={item}
                isSelected={selectedItems.has(item.id)}
                onToggle={() => onToggleItem(item)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export type { CategoryItemProps, SelectionState } from "./types";
