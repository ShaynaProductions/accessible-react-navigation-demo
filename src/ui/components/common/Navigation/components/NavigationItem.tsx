"use client";

import React, { useEffect, useRef, type JSX } from "react";
import {
  Link,
  ListItem,
  type LinkProps,
  type ListItemProps,
} from "@/ui/components";
import { usePathname } from "@/ui/hooks";
import { Keys, returnTrueElementOrUndefined } from "@/ui/utilities";
import { useNavigationList } from "../hooks";
import { handleCommonKeyDown, type FocusableElementType } from "../utilities";
import type { NavigationItemProps } from "./NavigationTypes";

export default function NavigationItem({
  cx,
  href,
  id,
  label,
  ...rest
}: NavigationItemProps): JSX.Element {
  const {
    registerItemInCurrentList,
    setFirstFocus,
    setLastFocus,
    setNextFocus,
    setPreviousFocus,
  } = useNavigationList();
  const currentPath = usePathname();

  const pageURL = href.substring(0, 2) === "/#" ? currentPath + href : href;

  const linkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    /* istanbul ignore else */
    if (linkRef.current !== null) {
      registerItemInCurrentList(linkRef.current);
    }
  }, [linkRef, registerItemInCurrentList]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const linkEl = linkRef.current as FocusableElementType;

    switch (e.key) {
      case Keys.HOME:
      case Keys.END:
      case Keys.LEFT:
      case Keys.RIGHT:
        e.preventDefault();
        e.stopPropagation();
        break;
    }

    handleCommonKeyDown(
      e,
      linkEl,
      setFirstFocus,
      setLastFocus,
      setNextFocus,
      setPreviousFocus,
    );
  };

  const listItemProps: Omit<ListItemProps, "children"> = {
    cx: cx,
    id: id,
  };
  const linkProps: Omit<LinkProps, "children"> = {
    "aria-current": returnTrueElementOrUndefined(currentPath === href, "page"),
    "aria-label": `${label} navigation`,
    href: pageURL,
    onKeyDown: handleKeyDown,
    ref: linkRef,
    ...rest,
  };

  return (
    <ListItem key={id} {...listItemProps}>
      <Link {...linkProps}>{label}</Link>
    </ListItem>
  );
}
