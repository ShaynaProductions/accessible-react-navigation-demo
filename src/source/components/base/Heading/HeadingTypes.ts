import { HeadingProps as RacHeadingProps } from "react-aria-components";
import { BaseInterface } from "@/source/types";

export type HeadingVariant = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export interface HeadingProps extends BaseInterface, RacHeadingProps {
    /**
     * Children of the heading
     */
    children?: React.ReactNode;
    /**
     * default: false. When true, is accessible only by AT
     */
    hidden?: boolean;
    /**
     *  1 - 6. Anything higher than 6 gets set to 6
     */
    headingLevel?: number;
  /**
   * How a heading is styled regardless of structure  "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
   */
  variant?: HeadingVariant;
}
