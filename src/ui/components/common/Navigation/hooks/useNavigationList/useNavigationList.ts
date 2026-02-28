"use client";
import { use, useCallback } from "react";
import { returnTrueElementOrUndefined } from "@/ui/utilities";
import { NavigationListContext } from "../../providers";
import type { FocusableElementType } from "../../utilities";
import type {
  UseNavigationListInternalProps,
  UseNavigationListReturnProps,
} from "./useNavigationListTypes";

export function useNavigationList(): UseNavigationListReturnProps {
  const navigationListContextObj = use(NavigationListContext);
  const { getCurrentListItems, registerItemInCurrentList } =
    returnTrueElementOrUndefined(
      !!navigationListContextObj,
      navigationListContextObj,
    );

  const currentListItems: FocusableElementType[] = getCurrentListItems();

  const _getCurrentIndex: UseNavigationListInternalProps["_getCurrentIndex"] =
    useCallback(
      (currentlyFocusedEl): number => {
        return currentListItems.indexOf(currentlyFocusedEl);
      },
      [currentListItems],
    );

  const shiftFocus: UseNavigationListReturnProps["shiftFocus"] = (
    focusableEl,
  ) => {
    focusableEl.focus({ preventScroll: true });
  };

  const setFirstFocus: UseNavigationListReturnProps["setFirstFocus"] = () => {
    shiftFocus(currentListItems[0]);
  };

  const setLastFocus: UseNavigationListReturnProps["setLastFocus"] = () => {
    shiftFocus(currentListItems[currentListItems.length - 1]);
  };

  const setNextFocus: UseNavigationListReturnProps["setNextFocus"] = (
    currentlyFocusedEl,
  ) => {
    const newIndex = _getCurrentIndex(currentlyFocusedEl) + 1;
    if (newIndex >= currentListItems.length) {
      setFirstFocus();
    } else {
      shiftFocus(currentListItems[newIndex]);
    }
  };

  const setPreviousFocus: UseNavigationListReturnProps["setPreviousFocus"] = (
    currentlyFocusedEl,
  ) => {
    const newIndex = _getCurrentIndex(currentlyFocusedEl) - 1;
    if (newIndex < 0) {
      setLastFocus();
    } else {
      shiftFocus(currentListItems[newIndex]);
    }
  };

  return {
    currentListItems,
    registerItemInCurrentList,
    setFirstFocus,
    setLastFocus,
    setNextFocus,
    setPreviousFocus,
    shiftFocus,
  };
}
