"use client";

import { use, useCallback } from "react";
import { returnTrueElementOrUndefined } from "@/source/utilities";
import { NavigationHookProps } from "../../hooks";
import { NavigationContext } from "../../providers";
import { FocusableElement } from "@/source/components/common/Navigation/NavigationTypes";

export default function useNavigation(): NavigationHookProps {
  const navigationContextObj = use(NavigationContext);

  const { getNavObjectByParent, getNavigationArray, isTopRow } =
    returnTrueElementOrUndefined(!!navigationContextObj, navigationContextObj);

  const closeOpenSiblings = useCallback(
    (currentlyFocusedEl) => {
      const childList: FocusableElement[] = getNavigationArray()[0].storedList;

      for (const childEl of childList) {
        if (childEl !== currentlyFocusedEl && childEl.type === "button") {
          const { isListOpen, dispatchChildClose } =
            getNavObjectByParent(childEl);
          if (isListOpen && dispatchChildClose) {
            dispatchChildClose(childEl);
          }
        }
      }
    },
    [getNavObjectByParent, getNavigationArray],
  );

  return { closeOpenSiblings, isTopRow };
}
