import { ReactNode, Ref } from "react";
import { LinkProps as NextLinkProps } from "next/link";
import { BaseInterface } from "@/source/types";
import { HoverEvent } from "react-aria";

export type LinkTargets = "_self" | "_blank" | "_parent" | "_top";

export interface LinkFacadeInterface
  extends Omit<BaseInterface, "id">,
    Omit<NextLinkProps, "href">
    {
  children: ReactNode;
  href: string;
  /**
   * id?: string,
   */
  id?: string;

  isDisabled?: boolean;
  /**
   * default (undefined). When true sets data-focused
   */
  isFocused?: boolean;
  /**
   * default (undefined). When true sets data-hovered
   */
  isHovered?: boolean;
  /**
   *
   * @param e: React.FocusEventHandler<HTMLAnchorElement>) => void
   */

  onBlur?: (e: FocusEvent) => void;

  /**
   *
   * @param e: React.FocusEventHandler<HTMLAnchorElement>) => void
   */

  onFocus?: (e: FocusEvent) => void;
  /**
   *
   * @param e: MouseEvent | HoverEvent) => void
   */
  onHover?: (e: MouseEvent | HoverEvent) => void;
  /**
   *
   * @param e: MouseEvent | HoverEvent) => void;
   */
  onHoverOut?: (e: MouseEvent | HoverEvent) => void;
  /**
   * Set if opening in a new tab or window (_blank, or named tab)
   */
  /**
   * Anchor Element Ref
   */
  ref?: Ref<HTMLAnchorElement> | undefined;
}
