import React from "react";
import { Keys } from "@/ui/utilities";
import type { UseNavigationListReturnProps } from "../../hooks";
import type { FocusableElementType } from "../../utilities";

export const handleCommonKeyDown = (
  e: React.KeyboardEvent,
  currentlyFocusedEl: FocusableElementType,
  setFirstFocus: UseNavigationListReturnProps["setFirstFocus"],
  setLastFocus: UseNavigationListReturnProps["setLastFocus"],
  setNextFocus: UseNavigationListReturnProps["setNextFocus"],
  setPreviousFocus: UseNavigationListReturnProps["setPreviousFocus"],
) => {
  switch (e.key) {
    case Keys.HOME:
      setFirstFocus();
      break;
    case Keys.END:
      setLastFocus();
      break;
    case Keys.LEFT:
      setPreviousFocus(currentlyFocusedEl);
      break;
    case Keys.RIGHT:
      setNextFocus(currentlyFocusedEl);
      break;
  }
};
