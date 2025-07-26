import React, { use, useCallback, useEffect, useRef } from "react";

import { InternalLink, ListItem } from "@/source/components/base";
import { usePrevious } from "@/source/hooks";
import { returnTrueElementOrUndefined } from "@/source/utilities";

import { FocusableElement, NavigationItemProps } from "../NavigationTypes";
import { NavigationProvider, NavListProvider } from "../providers";
import { Keys, ListActionTypes } from "../utilities";

export default function NavigationLink({
  cx,
  id,
  label,
  ...rest
}: NavigationItemProps) {
  const navigationContextObject = use(NavigationProvider.context);
  const navListContextObject = use(NavListProvider.context);

  const { registerNavItem } = returnTrueElementOrUndefined(
    !!navigationContextObject,
    navigationContextObject,
  );

  const { currentListItems, listDispatch, parentRef } =
    returnTrueElementOrUndefined(!!navListContextObject, navListContextObject);

  const linkRef = useRef<FocusableElement>(null);
  const prevLinkRef = usePrevious(linkRef);

  useEffect(() => {
    if (linkRef !== prevLinkRef) {
      listDispatch(ListActionTypes.REGISTER, linkRef.current);
    }
  }, [linkRef, listDispatch, prevLinkRef]);

  useEffect(() => {
    registerNavItem(currentListItems, parentRef.current);
  }, [currentListItems, parentRef, registerNavItem]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case Keys.HOME:
        case Keys.END:
        case Keys.LEFT:
        case Keys.UP:
        case Keys.RIGHT:
        case Keys.DOWN:
          e.preventDefault();
          break;
      }
      const linkEl = linkRef.current as FocusableElement;

      switch (e.key) {
        case Keys.HOME:
          listDispatch(ListActionTypes.FIRST);
          break;
        case Keys.END:
          listDispatch(ListActionTypes.LAST);
          break;
        case Keys.LEFT:
        case Keys.UP:
          listDispatch(ListActionTypes.PREVIOUS, linkEl);
          break;
        case Keys.RIGHT:
        case Keys.DOWN:
          listDispatch(ListActionTypes.NEXT, linkEl);
          break;
      }
    },
    [listDispatch],
  );

  const linkProps = {
    ...rest,
    ref: linkRef as unknown as React.RefObject<HTMLAnchorElement>,
  };
  return (
    <>
      <ListItem cx={cx} key={id} onKeyDown={handleKeyDown}>
        <InternalLink {...linkProps}>{label}</InternalLink>
      </ListItem>
    </>
  );
}
