import type { Item } from "../../types/graphql";

export interface MultiSelectFilterProps {
  onSelectionChange?: (selectedItems: Item[]) => void;
  placeholder?: string;
  className?: string;
  storageKey?: string;
}
