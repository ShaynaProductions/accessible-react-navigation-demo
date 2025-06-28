"use client";
import {
  FocusEventHandler,
  JSX,
  MouseEventHandler,
  Ref,
  useEffect,
  useRef,
  useState,
} from "react";

import { type HoverEvent } from "react-aria";
import { sanitizeUrl } from "@braintree/sanitize-url";
import Link from "next/link";

import {
  mergeRefs,
  returnTrueElementOrUndefined,
  safeEventHandlerCall,
} from "@/source/utilities";
import { InternalLinkProps } from "../LinkTypes";

import "../link.css";

export default function InternalLink({
  children,
  cx,
  href,
  isDisabled,
  isFocused,
  isHovered,
  onFocus,
  onBlur,
  onHover,
  onHoverOut,
  ref,
  testId,
  ...rest
}: InternalLinkProps): JSX.Element {
  const [isLinkFocused, setIsLinkFocused] = useState<boolean>(
    isFocused || false,
  );
  const [isLinkHovered, setIsLinkHovered] = useState<boolean>(
    isHovered || false,
  );
  const currentRef = useRef<HTMLAnchorElement>(null);
  const combinedRef = mergeRefs(currentRef as Ref<HTMLAnchorElement>, ref);

  useEffect(() => {
    if (isLinkFocused) {
      currentRef.current?.setAttribute("data-focused", "true");
    } else {
      currentRef.current?.removeAttribute("data-focused");
    }
    if (isLinkHovered) {
      currentRef.current?.setAttribute("data-hovered", "true");
    } else {
      currentRef.current?.removeAttribute("data-hovered");
    }
  }, [currentRef, isLinkFocused, isLinkHovered]);

  const handleFocus = (
    e: FocusEvent | FocusEventHandler<HTMLAnchorElement>,
  ) => {
    setIsLinkFocused(true);
    safeEventHandlerCall(onFocus, {
      e: e as FocusEventHandler<HTMLAnchorElement>,
    });
  };

  const handleBlur = (e: FocusEvent | FocusEventHandler<HTMLAnchorElement>) => {
    setIsLinkFocused(false);
    safeEventHandlerCall(onBlur, {
      e: e as FocusEventHandler<HTMLAnchorElement>,
    });
  };

  const handleHoverIn = (e: HoverEvent) => {
    setIsLinkHovered(true);
    safeEventHandlerCall(onHover, { e: e });
  };

  const handleHoverOut = (e: HoverEvent) => {
    setIsLinkHovered(false);
    safeEventHandlerCall(onHoverOut, { e: e });
  };

  const safeHref = !isDisabled ? sanitizeUrl(href as string) : undefined;

  const linkProps = {
    ...rest,
    "aria-disabled": returnTrueElementOrUndefined(!!isDisabled),
    "data-testid": returnTrueElementOrUndefined(!!testId, `${testId}-client`),
    className: cx,
    href: safeHref || "",
    onFocus: handleFocus as unknown as FocusEventHandler<HTMLAnchorElement>,
    onBlur: handleBlur as unknown as FocusEventHandler<HTMLAnchorElement>,
    onMouseEnter:
      handleHoverIn as unknown as MouseEventHandler<HTMLAnchorElement>,
    onMouseLeave:
      handleHoverOut as unknown as MouseEventHandler<HTMLAnchorElement>,
    ref: combinedRef,
    type: "link",
  };

  return <Link {...linkProps}>{children}</Link>;
}
