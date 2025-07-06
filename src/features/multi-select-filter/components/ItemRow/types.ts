import type { Item } from "../../../../types/graphql";

export interface ItemRowProps {
  item: Item;
  isSelected: boolean;
  onToggle: () => void;
  className?: string;
}
