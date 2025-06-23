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
import { sanitizeUrl } from "@braintree/sanitize-url";
import classNames from "classnames";
import Link from "next/link";
import { HoverEvent } from "react-aria";

import { LinkFacadeInterface } from "./LinkFacadeTypes";
import {
  mergeRefs,
  returnTrueElementOrUndefined,
  safeEventHandlerCall,
} from "@/source/utilities";

export default function LinkFacade({
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
}: LinkFacadeInterface): JSX.Element {
  const [isLinkFocused, setIsLinkFocused] = useState<boolean>(
    isFocused || false,
  );
  const [isLinkHovered, setIsLinkHovered] = useState<boolean>(
    isHovered || false,
  );
  const currentRef = useRef<HTMLAnchorElement>(null);
  const combinedRef = mergeRefs(currentRef as Ref<HTMLAnchorElement>, ref);

  useEffect(() => {
    if (!!currentRef) {
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
    }
  }, [currentRef, isLinkFocused, isLinkHovered]);

  const handleFocus = (
    e: FocusEvent | FocusEventHandler<HTMLAnchorElement>,
  ) => {
    setIsLinkFocused(true);
    if (onFocus) {
      safeEventHandlerCall(onFocus, {
        e: e as FocusEventHandler<HTMLAnchorElement>,
      });
    }
  };

  const handleBlur = (e: FocusEvent | FocusEventHandler<HTMLAnchorElement>) => {
    setIsLinkFocused(false);
    if (onBlur) {
      safeEventHandlerCall(onBlur, {
        e: e as FocusEventHandler<HTMLAnchorElement>,
      });
    }
  };

  const handleHoverIn = (e: HoverEvent) => {
    setIsLinkHovered(true);
    if (onHover) {
      safeEventHandlerCall(onHover, { e: e });
    }
  };

  const handleHoverOut = (e: HoverEvent) => {
    setIsLinkHovered(false);
    if (onHoverOut) {
      safeEventHandlerCall(onHoverOut, { e: e });
    }
  };

  const linkClass: string = classNames("link", cx);
  const safeHref = !isDisabled ? sanitizeUrl(href) : undefined;

  const linkProps = {
    ...rest,
    "aria-disabled": returnTrueElementOrUndefined(!!isDisabled),
    "data-testid": returnTrueElementOrUndefined(!!testId, `${testId}-client`),
    className: returnTrueElementOrUndefined(!!linkClass, linkClass),
    href: safeHref || "",
    onFocus: handleFocus as unknown as FocusEventHandler<HTMLAnchorElement>,
    onBlur: handleBlur as unknown as FocusEventHandler<HTMLAnchorElement>,
    onMouseEnter:
      handleHoverIn as unknown as MouseEventHandler<HTMLAnchorElement>,
    onMouseLeave:
      handleHoverOut as unknown as MouseEventHandler<HTMLAnchorElement>,
    ref: combinedRef,
  };


  return <Link {...linkProps}>{children}</Link>;
}
