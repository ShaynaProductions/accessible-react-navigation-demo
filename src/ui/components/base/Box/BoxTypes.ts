import React, { AriaRole } from "react";
import { BaseProps } from "@/ui/types";

export interface BoxProps extends BaseProps, React.HTMLAttributes<HTMLDivElement | HTMLSpanElement> {
  /**
   * The children of the component.
   */
  children?: React.ReactNode;

  /**
   * Expose contents to a screen reader while hiding it visually
   */
  isHidden?: boolean;

  /**
   * component type div (default) or span when true
   */
  inline?: boolean;

  /**
   * label (must pass label, aria-label or aria-labelledby when role or aria-role is set.
   */
  label?: string;

  /**
   * For complex components only. See <a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles">MDN</a>
   */
  "aria-role"?: React.AriaRole;

  /**
   * ref
   */
  ref?: React.RefObject<HTMLDivElement | null>;

  /**
   * When certain roles may not be passed through aria (like alert)
   */
  role?: AriaRole;
}
