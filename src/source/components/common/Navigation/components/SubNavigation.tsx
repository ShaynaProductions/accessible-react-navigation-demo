"use client";
import React, { use, useCallback, useEffect, useRef, useState } from "react";

import { Button, ListItem } from "@/source/components/base";
import { ChevronRightIcon } from "@/source/icons";
import { returnTrueElementOrUndefined } from "@/source/utilities";

import NavigationList from "./NavigationList";
import { FocusableElement, SubNavigationProps } from "../NavigationTypes";
import {
  NavigationContext,
  NavigationContextStoredValueProps,
  NavListContext,
} from "../providers";
import { Keys, ListActionTypes } from "../utilities";

export default function SubNavigation({
  children,
  id,
  label,
  testId,
}: SubNavigationProps) {
  const navigationContextObject = use(NavigationContext);
  const navListContextObject = use(NavListContext);

  const {
    getNextElement,
    getPreviousElement,
    getSubNavigation,
    registerSubNav,
    setIsListOpen,
    setListItems,
  } = returnTrueElementOrUndefined(
    !!navigationContextObject,
    navigationContextObject,
  );

  const { currentListItems, isListOpen, listDispatch, parentRef } =
    returnTrueElementOrUndefined(!!navListContextObject, navListContextObject);

  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [isSubListOpen, setIsSubListOpen] = useState(false);

  const closeSubNav = useCallback(
    (buttonEl: HTMLButtonElement) => {
      const dispatchArray: NavigationContextStoredValueProps[] =
        getSubNavigation(buttonEl);

      for (const dispatchObj of dispatchArray) {
        const { dispatchChildClose, storedParentEl, isListOpen } = dispatchObj;
        if (isListOpen && dispatchChildClose && storedParentEl) {
          dispatchChildClose(storedParentEl);
        }
      }

      setIsListOpen(false, buttonEl);
      setIsSubListOpen(false);
    },
    [getSubNavigation, setIsListOpen],
  );

  const openSubNav = useCallback(
    (buttonEl: HTMLButtonElement) => {
      setIsListOpen(true, buttonEl);
      setIsSubListOpen(true);
    },
    [setIsListOpen, setIsSubListOpen],
  );

  useEffect(() => {
    const buttonEl = buttonRef?.current;
    listDispatch(ListActionTypes.REGISTER, buttonEl);
    registerSubNav(isSubListOpen, buttonEl, closeSubNav);
  }, [buttonRef, closeSubNav, isSubListOpen, listDispatch, registerSubNav]);

  useEffect(() => {
    setListItems(currentListItems, parentRef.current);
  }, [currentListItems, parentRef, setListItems]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const parentEl = parentRef.current;
      const buttonEl = buttonRef.current as FocusableElement;

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
        case Keys.UP:
          const prevItem = getPreviousElement(
            parentEl,
            buttonEl,
            currentListItems,
            isListOpen,
          );

          listDispatch(ListActionTypes.SET, prevItem);
          break;
        case Keys.RIGHT:
        case Keys.DOWN:
          const nextItem = getNextElement(
            parentRef.current,
            buttonEl,
            currentListItems,
            isListOpen,
          );
          listDispatch(ListActionTypes.SET, nextItem);
          break;
        case Keys.TAB:
          if (e.shiftKey) {
            // Follows Keys.Up
            const prevItem = getPreviousElement(
              parentEl,
              buttonEl,
              currentListItems,
              isListOpen,
            );

            listDispatch(ListActionTypes.SET, prevItem);
          } else {
            const nextItem = getNextElement(
              parentRef.current,
              buttonEl,
              currentListItems,
              isSubListOpen,
              e.key,
            );
            listDispatch(ListActionTypes.SET, nextItem);
          }
          break;
      }
    },
    [
      currentListItems,
      getNextElement,
      getPreviousElement,
      isListOpen,
      isSubListOpen,
      listDispatch,
      parentRef,
    ],
  );

  const handlePress = useCallback(() => {
    const buttonEl = buttonRef.current as HTMLButtonElement;
    if (isSubListOpen) {
      closeSubNav(buttonEl);
    } else {
      openSubNav(buttonEl);
    }
  }, [buttonRef, closeSubNav, isSubListOpen, openSubNav]);
  const buttonProps = {
    "aria-controls": `list-${id}`,
    "aria-expanded": true,
    "aria-label": `${label} sub menu`,
    cx: returnTrueElementOrUndefined(isSubListOpen, "expanded"),
    ref: buttonRef,
    testId: testId,
  };
  const listProps = {
    id: `list-${id}`,
    isOpen: isSubListOpen,
    parentRef: buttonRef,
    testId: testId && `${testId}-${id}-list`,
  };
  return (
    <ListItem key={id} onKeyDown={handleKeyDown}>
      <Button {...buttonProps} onPress={handlePress}>
        {label}
        <ChevronRightIcon />
      </Button>
      <NavigationList key={`list-${id}`} {...listProps}>
        {children}
      </NavigationList>
    </ListItem>
  );
}
