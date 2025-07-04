import type { Item } from "../../types/graphql";

export interface MultiSelectFilterProps {
  onSelectionChange?: (selectedItems: Item[]) => void;
  placeholder?: string;
  className?: string;
}

export interface MultiSelectState {
  selectedItems: Item[];
  searchQuery: string;
  allItems: Item[];
}
