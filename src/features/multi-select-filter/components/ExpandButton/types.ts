import type { ButtonProps } from "../../../../components/ui/Button/types";

export interface ExpandButtonProps extends Omit<ButtonProps, "children"> {
  isExpanded: boolean;
  "aria-label"?: string;
}
