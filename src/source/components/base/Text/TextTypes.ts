import { TextProps as RacTextProps } from "react-aria-components";
import { BaseProps } from "@/source/types";

export interface TextProps extends BaseProps, RacTextProps {
  inline?: boolean;
  /**
   * Hidden visually only, available to screen readers
   */
  hidden?: boolean;
}
