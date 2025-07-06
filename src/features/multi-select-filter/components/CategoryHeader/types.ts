export type SelectionState = "none" | "partial" | "all";

export interface CategoryHeaderProps {
  category: string;
  itemCount: number;
  selectionState: SelectionState;
  isExpanded: boolean;
  onToggle: () => void;
  onSelectionChange: () => void;
  className?: string;
}
