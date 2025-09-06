import React, { use, useCallback, useEffect, useRef } from "react";

import { InternalLink, ListItem } from "@/source/components/base";
import { usePrevious } from "@/source/hooks";
import { returnTrueElementOrUndefined } from "@/source/utilities";

import { FocusableElement, NavigationItemProps } from "../NavigationTypes";
import { NavigationContext, NavListContext } from "../providers";
import { Keys, ListActionTypes } from "../utilities";
import { useNavigation } from "../hooks";

export default function NavigationLink({
  cx,
  id,
  label,
  ...rest
}: NavigationItemProps) {
  const navigationContextObject = use(NavigationContext);
  const navListContextObject = use(NavListContext);

  const {
    closeOpenSiblings,
    getLastTopElement,
    getNextByLink,
    getPreviousElement,
    handleNavItemFocus,
  } = useNavigation();

  const { registerNavItem } = returnTrueElementOrUndefined(
    !!navigationContextObject,
    navigationContextObject,
  );

  const { currentListItems, isListOpen, listDispatch, parentRef } =
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

  const handleFocus = useCallback(() => {
    /* istanbul ignore else */
    if (!!linkRef) {
      handleNavItemFocus(
        linkRef.current as FocusableElement,
        closeOpenSiblings,
      );
    }
    const returnEl: FocusableElement | undefined = getLastTopElement(
      linkRef.current,
    );

    if (returnEl) {
      listDispatch(ListActionTypes.SET, returnEl);
    }
  }, [closeOpenSiblings, getLastTopElement, handleNavItemFocus, listDispatch]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const parentEl = parentRef.current;
      const linkEl = linkRef.current as FocusableElement;

      switch (e.key) {
        case Keys.HOME:
        case Keys.END:
        case Keys.LEFT:
        case Keys.UP:
        case Keys.RIGHT:
        case Keys.DOWN:
        case Keys.TAB:
          e.preventDefault();
          e.stopPropagation();
          break;
      }

      switch (e.key) {
        case Keys.HOME:
          listDispatch(ListActionTypes.FIRST);
          break;
        case Keys.END:
          listDispatch(ListActionTypes.LAST);
          break;
        case Keys.LEFT:
          listDispatch(ListActionTypes.PREVIOUS, linkEl);
          break;
        case Keys.RIGHT:
          listDispatch(ListActionTypes.NEXT, linkEl);
          break;

        case Keys.UP:
          const prevItem = getPreviousElement(
            parentEl,
            linkEl,
            currentListItems,
            isListOpen,
            e.key,
          );

          listDispatch(ListActionTypes.SET, prevItem);
          break;
        case Keys.DOWN:
          const nextItem = getNextByLink(
            parentEl,
            linkEl,
            currentListItems,
            e.key,
          );
          listDispatch(ListActionTypes.SET, nextItem);
          break;
        case Keys.TAB:
          if (e.shiftKey) {
            // Follows Keys.Up
            const prevItem = getPreviousElement(
              parentEl,
              linkEl,
              currentListItems,
              isListOpen,
              e.key,
            );

            listDispatch(ListActionTypes.SET, prevItem);
          } else {
            // Follows Keys.Down
            const nextItem = getNextByLink(
              parentEl,
              linkEl,
              currentListItems,
              e.key,
            );
            listDispatch(ListActionTypes.SET, nextItem);
          }
          break;
      }
    },
    [
      currentListItems,
      getNextByLink,
      getPreviousElement,
      isListOpen,
      listDispatch,
      parentRef,
    ],
  );

  const linkProps = {
    ...rest,
    onFocus: handleFocus,
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
