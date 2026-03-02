"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type JSX,
} from "react";

import {
  Button,
  Icon,
  ListItem,
  type ButtonProps,
  type IconProps,
  type ListItemProps,
} from "@/ui/components";
import { usePrevious } from "@/ui/hooks";
import { ChevronRightIcon } from "@/ui/svg";
import { arraysEqual, Keys } from "@/ui/utilities";
import { useNavigation, useNavigationList } from "../hooks";
import { handleCommonKeyDown, type FocusableElementType } from "../utilities";
import NavigationList from "./NavigationList";
import type {
  NavigationListProps,
  SubNavigationProps,
} from "./NavigationTypes";

export default function SubNavigation({
  children,
  cx,
  id,
  label,
  testId,
}: SubNavigationProps): JSX.Element {
  const {
    currentListItems,
    parentEl,
    registerItemInCurrentList,
    setFirstFocus,
    setLastFocus,
    setNextFocus,
    setPreviousFocus,
    shiftFocus,
  } = useNavigationList();

  const {
    getNextByButton,
    getPreviousByButton,
    registerButtonAsParent,
    registerItemInNavigationArray,
    setIsListOpen,
  } = useNavigation();

  const buttonRef = useRef<HTMLButtonElement>(null);
  const prevCurrentListItems = usePrevious(currentListItems);

  const [isSubListOpen, setIsSubListOpen] = useState<boolean>(false);
  const [listWidth, setListWidth] = useState<number>(1);

  const closeSubNavigation = useCallback(() => {
    /* istanbul ignore else */
    if (buttonRef.current !== null) {
      setIsListOpen(false, buttonRef.current);
      setIsSubListOpen(false);
    }
  }, [buttonRef, setIsListOpen, setIsSubListOpen]);

  const openSubNavigation = useCallback(() => {
    /* istanbul ignore else */
    if (buttonRef.current !== null) {
      setIsListOpen(true, buttonRef.current);
      setIsSubListOpen(true);
    }
  }, [buttonRef, setIsListOpen, setIsSubListOpen]);

  useEffect(() => {
    /* istanbul ignore else */
    if (buttonRef.current !== null) {
      registerItemInCurrentList(buttonRef.current as FocusableElementType);
      registerButtonAsParent(isSubListOpen, buttonRef.current);
    }
  }, [
    buttonRef,
    isSubListOpen,
    registerButtonAsParent,
    registerItemInCurrentList,
  ]);

  useEffect(() => {
    const prevList = prevCurrentListItems || [];
    if (
      buttonRef.current !== null &&
      currentListItems.length > 0 &&
      !arraysEqual(currentListItems, prevList)
    ) {
      registerItemInNavigationArray(currentListItems, parentEl);
    }
  }, [
    currentListItems,
    parentEl,
    prevCurrentListItems,
    registerItemInNavigationArray,
  ]);

  useLayoutEffect(() => {
    setListWidth(buttonRef.current!.offsetWidth);
  }, [buttonRef, setListWidth]);

  const handleKeyDown = (e: KeyboardEvent) => {
    const buttonEl = buttonRef.current as HTMLButtonElement;

    switch (e.key) {
      case Keys.HOME:
      case Keys.END:
      case Keys.LEFT:
      case Keys.RIGHT:
        e.preventDefault();
        break;
    }

    handleCommonKeyDown(
      e,
      buttonEl,
      setFirstFocus,
      setLastFocus,
      setNextFocus,
      setPreviousFocus,
    );

    let focusableEl: FocusableElementType | undefined;
    switch (e.key) {
      case Keys.UP:
        focusableEl = getPreviousByButton(buttonEl);
        break;
      case Keys.DOWN:
        focusableEl = getNextByButton(buttonEl, isSubListOpen);
        break;
    }
    if (focusableEl) {
      shiftFocus(focusableEl);
    }
  };

  const handlePress = () => {
    if (isSubListOpen) {
      closeSubNavigation();
    } else {
      openSubNavigation();
    }
  };

  const buttonProps: ButtonProps = {
    "aria-controls": id,
    "aria-expanded": isSubListOpen,
    "aria-label": `${label} subnavigation`,
    onKeyDown: handleKeyDown,
    onPress: handlePress,
    ref: buttonRef,
  };

  const iconProps: IconProps = {
    IconComponent: ChevronRightIcon,
    isSilent: true,
  };

  const listItemProps: Omit<ListItemProps, "children"> = {
    cx: cx,
    style: { "--min-list-width": listWidth + 2 } as CSSProperties,
  };

  const navigationListProps: NavigationListProps = {
    id: id,
    isOpen: isSubListOpen,
    parentRef: buttonRef,
    testId: testId && `${testId}-list`,
  };
  return (
    <ListItem key={id} {...listItemProps}>
      <Button {...buttonProps}>
        {label}
        <Icon {...iconProps} />
      </Button>
      <NavigationList key={`list-${id}`} {...navigationListProps}>
        {children}
      </NavigationList>
    </ListItem>
  );
}
