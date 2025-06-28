import { TextProps as RacTextProps } from "react-aria-components";
import { BaseInterface } from "@/source/types";

export type TextFontSize = "small" | "medium" | "regular" | "large";

export interface TextProps extends BaseInterface, RacTextProps {
  inline?: boolean;
  /**
   * Hidden visually only, available to screen readers
   */
  hidden?: boolean;
}
