import React, { createContext, useCallback, useState } from "react";
import { EmptyObject } from "@/source/types";

import { FocusableElement } from "../../NavigationTypes";
import {
  DispatchNavAction,
  NavListContextValueProps,
} from "./NavListProviderTypes";
import { ListActionTypes } from "../../utilities";

export const NavListContext = createContext<
  Partial<NavListContextValueProps> | EmptyObject
>({});

export default function NavListProvider({ children, value }) {
  const [currentListItems] = useState<FocusableElement[]>([]);
  const { isListOpen, parentRef }: NavListContextValueProps = value;

  const getCurrentIndex = useCallback(
    (focusableEl: FocusableElement, currentListItems: FocusableElement[]) => {
      let currentIndex = -1;
      /* istanbul ignore else */
      if (currentListItems.length > 0) {
        currentIndex = currentListItems.indexOf(focusableEl);
      }
      return currentIndex;
    },
    [],
  );

  const listDispatch: DispatchNavAction = useCallback(
    (actionType: number, focusableEl?: FocusableElement) => {
      const currentListLength = currentListItems?.length || 0;

      let currentIndex: number = -1,
        dispatchItem: FocusableElement | undefined,
        newIndex: number = 0,
        shouldFocus: boolean = false;

      switch (actionType) {
        case ListActionTypes.REGISTER:
          /* istanbul ignore else */
          if (focusableEl) {
            /* istanbul ignore else */
            if (currentListItems?.indexOf(focusableEl) === -1) {
              currentListItems.push(focusableEl);
            }
          }
          break;
        case ListActionTypes.SET:
          dispatchItem = focusableEl;
          shouldFocus = true;
          break;
        case ListActionTypes.FIRST:
          /* istanbul ignore else */
          if (!!currentListItems) {
            dispatchItem = currentListItems[0];
            shouldFocus = true;
          }
          break;
        case ListActionTypes.LAST:
          /* istanbul ignore else */
          if (!!currentListItems) {
            dispatchItem = currentListItems[currentListLength - 1];
            shouldFocus = true;
          }
          break;
        case ListActionTypes.PREVIOUS:
          /* istanbul ignore else */
          if (focusableEl && currentListItems) {
            currentIndex = getCurrentIndex(focusableEl, currentListItems);
          }

          newIndex = currentIndex - 1;
          if (newIndex < 0) {
            newIndex = currentListLength - 1;
          }

          /* istanbul ignore else */
          if (currentListItems) {
            dispatchItem = currentListItems[newIndex];
            shouldFocus = true;
          }
          break;
        case ListActionTypes.NEXT:
          /* istanbul ignore else */
          if (focusableEl && currentListItems) {
            currentIndex = getCurrentIndex(focusableEl, currentListItems);
          }

          newIndex = currentIndex + 1;

          dispatchItem = currentListItems[newIndex];
          shouldFocus = true;

          break;
      }

      if (shouldFocus) {
        dispatchItem?.focus({ preventScroll: true });
      }
    },
    [currentListItems, getCurrentIndex],
  );

  return (
    <NavListContext.Provider
      value={{
        currentListItems,
        isListOpen,
        listDispatch,
        parentRef,
      }}
    >
      {children}
    </NavListContext.Provider>
  );
}

NavListProvider.context = NavListContext;
