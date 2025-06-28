import {ReactNode, RefObject} from "react";
import { type LinkProps as NextLinkProps } from "next/link";
import {Url} from "next/dist/shared/lib/router/router";
import { type HoverEvent } from "react-aria";
import {type LinkProps as RacLinkProps} from "react-aria-components";
import { type BaseProps } from "@/source/types";

export interface InternalLinkProps extends BaseProps, NextLinkProps {
    children: ReactNode;
    href: Url;
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
     * @param e: MouseEvent | HoverEvent => void;
     */
    onHover?: (e: MouseEvent | HoverEvent) => void;
    /**
     *
     * @param e: MouseEvent | HoverEvent => void;
     */
    onHoverOut?: (e: MouseEvent | HoverEvent) => void;
    /**
     * Anchor Element Ref
     */
    ref?: RefObject<HTMLAnchorElement> | undefined;
}

export type LinkTargets = "_self" | "_blank" | "_parent" | "_top";

export interface ExternalLinkProps extends BaseProps, RacLinkProps {
    children: React.ReactNode;
    href: string;

    /**
     * Set if opening in a new tab or window (_blank, or named tab)
     */
    openInNewTab?: boolean;
    /**
     * ref: RefObject<HTMLAnchorElement | null>
     */
    ref?:  RefObject<HTMLAnchorElement | null>;
    /**
     * Hide visual icon in favor of hidden text
     */
    suppressNewIcon?: boolean;
    /* Target to send link to
     * "_self" | "_blank" | "_parent" | "_top" | {namedTarget}
     * */
    target?: string | LinkTargets;
}

