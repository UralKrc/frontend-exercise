import type { Item } from "../../../../types/graphql";

export type SelectionState = "none" | "partial" | "all";

export interface CategoryItemProps {
  category: string;
  items: Item[];
  selectedItems: Set<string>;
  isExpanded: boolean;
  onToggleExpanded: () => void;
  onToggleItem: (item: Item) => void;
  onSelectAll: () => void;
  onDeselectAll: () => void;
  className?: string;
}
