export interface SelectedItemsSummaryProps {
  selectedCount: number;
  categories: string[];
  onClearAll?: () => void;
  onRemoveCategory?: (category: string) => void;
  className?: string;
}
