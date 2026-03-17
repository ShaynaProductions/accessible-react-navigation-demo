import React from "react";
import { Keys } from "@/ui/utilities";
import type { UseNavigationListReturnProps } from "../../hooks";
import type { FocusableElementType } from "../../utilities";
import { UseNavigationReturnTypes } from "@/ui/components/common/Navigation/hooks/useNavigation/useNavigationTypes";

export const handleCommonKeyDown = (
  e: React.KeyboardEvent,
  currentlyFocusedEl: FocusableElementType,
  closeComponentWithFocus: UseNavigationReturnTypes["closeComponentWithFocus"],
  setFirstFocus: UseNavigationListReturnProps["setFirstFocus"],
  setLastFocus: UseNavigationListReturnProps["setLastFocus"],
  setNextFocus: UseNavigationListReturnProps["setNextFocus"],
  setPreviousFocus: UseNavigationListReturnProps["setPreviousFocus"],
  shiftFocus: UseNavigationListReturnProps["shiftFocus"],
) => {
  switch (e.key) {
    case Keys.ESC:
      const closedEl = closeComponentWithFocus(currentlyFocusedEl);
      if (closedEl) {
        shiftFocus(closedEl);
      }
      break;
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
