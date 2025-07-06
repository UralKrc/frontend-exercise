export interface TagProps {
  label: string;
  onRemove?: () => void;
  variant?: "primary" | "secondary";
  className?: string;
}
