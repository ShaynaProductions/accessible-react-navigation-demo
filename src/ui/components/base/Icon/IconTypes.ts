import { IconType } from "react-icons";
import { BaseProps } from "@/ui/types";

export interface IconProps extends BaseProps {
  /**
   * react-icon svg to pass through and display.
   */
  IconComponent: IconType;

  /**
   *  default: undefined.
   *  Set to true when hiding from a screen reader
   *  If true, may not include a label.
   *
   */
  isSilent?: boolean;
  /**
   * For any item not identified as silent, a label is required.
   * an error will occur when neither a label or isSilent is passed.
   */
  label?: string;
}
