/* istanbul ignore file */
"use client";

import { use, useCallback } from "react";
import { returnTrueElementOrUndefined } from "@/source/utilities";
import { NavigationHookProps } from "../../hooks";
import { NavigationContext } from "../../providers";
import { FocusableElement } from "@/source/components/common/Navigation/NavigationTypes";

export default function useNavigation(): NavigationHookProps {
  const navigationContextObj = use(NavigationContext);

  const { _getNavObjectContainingElement, getNavigationArray, isTopRow } =
    returnTrueElementOrUndefined(!!navigationContextObj, navigationContextObj);

  const closeOpenSiblings = useCallback(() => {
    const childList: FocusableElement[] = getNavigationArray()[0].storedList;

    for (const childEl of childList) {
      if (childEl.type === "button") {
        const { isListOpen, dispatchChildClose } =
          _getNavObjectContainingElement(childEl);
        if (isListOpen && dispatchChildClose) {
          dispatchChildClose(childEl);
        }
      }
    }
  }, [_getNavObjectContainingElement, getNavigationArray]);

  return { closeOpenSiblings, isTopRow };
}
