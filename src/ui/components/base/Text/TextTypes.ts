import { TextProps as RacTextProps } from "react-aria-components";
import { BaseProps } from "@/ui/types";

export interface TextProps extends BaseProps, RacTextProps {
  /**
   * default false - Hidden visually only, available in DOM to screen readers
   */
  isHidden?: boolean; /**

   * default false - displays inline if true.
   */
  isInline?: boolean;
}
