"use client";
import React, { use, useCallback, useEffect, useRef, useState } from "react";

import { Button, ListItem } from "@/source/components/base";
import { ChevronRightIcon } from "@/source/icons";
import { returnTrueElementOrUndefined } from "@/source/utilities";

import NavigationList from "./NavigationList";
import { FocusableElement, SubNavigationProps } from "../NavigationTypes";
import { NavigationProvider, NavListProvider } from "../providers";
import { Keys, ListActionTypes } from "../utilities";

export default function SubNavigation({
  children,
  id,
  label,
  testId,
}: SubNavigationProps) {
  const navigationContextObject = use(NavigationProvider.context);

  const {
    getFirstChildElement,
    getNextElement,
    registerSubNav,
    setIsListOpen,
    setListItems,
  } = returnTrueElementOrUndefined(
    !!navigationContextObject,
    navigationContextObject,
  );

  const navListContextObject = use(NavListProvider.context);

  const { currentListItems, listDispatch, isListOpen, parentRef } =
    returnTrueElementOrUndefined(!!navListContextObject, navListContextObject);

  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [isSubListOpen, setIsSubListOpen] = useState(false);

  useEffect(() => {
    const buttonEl = buttonRef?.current;
    listDispatch(ListActionTypes.REGISTER, buttonEl);
    registerSubNav(isSubListOpen, buttonEl);
  }, [buttonRef, isSubListOpen, listDispatch, registerSubNav]);

  useEffect(() => {
    setListItems(currentListItems, parentRef.current);
  }, [currentListItems, parentRef, setListItems]);

  const closeSubNav = useCallback(
    (buttonEl: HTMLButtonElement) => {
      setIsListOpen(buttonEl, false);
      setIsSubListOpen(false);
    },
    [setIsListOpen, setIsSubListOpen],
  );

  const openSubNav = useCallback(
    (buttonEl: HTMLButtonElement) => {
      setIsListOpen(buttonEl, true);
      setIsSubListOpen(true);
    },
    [setIsListOpen, setIsSubListOpen],
  );

  const handlePress = useCallback(() => {
    const buttonEl = buttonRef.current as HTMLButtonElement;
    if (isSubListOpen) {
      closeSubNav(buttonEl);
    } else {
      openSubNav(buttonEl);
    }
  }, [buttonRef, closeSubNav, isSubListOpen, openSubNav]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
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
      const buttonEl = buttonRef.current as FocusableElement;

      switch (e.key) {
        case Keys.HOME:
          listDispatch(ListActionTypes.FIRST);
          break;
        case Keys.END:
          listDispatch(ListActionTypes.LAST);
          break;
        case Keys.LEFT:
          listDispatch(ListActionTypes.PREVIOUS, buttonEl);
          break;
        case Keys.UP:
          listDispatch(ListActionTypes.PREVIOUS, buttonEl);
          break;
        case Keys.RIGHT:
          listDispatch(ListActionTypes.NEXT, buttonEl);
          break;
        case Keys.DOWN:
          if (isSubListOpen) {
            listDispatch(ListActionTypes.SET, getFirstChildElement(buttonEl));
          } else {
            const nextItem = getNextElement(
              parentRef.current,
              buttonEl,
              currentListItems,
              isListOpen,
            );
            listDispatch(ListActionTypes.SET, nextItem);
          }
          break;
      }
    },
    [
      currentListItems,
      getFirstChildElement,
      getNextElement,
      isListOpen,
      isSubListOpen,
      listDispatch,
      parentRef,
    ],
  );

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
