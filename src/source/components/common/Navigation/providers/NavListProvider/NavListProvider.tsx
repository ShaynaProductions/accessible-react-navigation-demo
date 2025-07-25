import { createContext, useCallback, useState } from "react";
import { DispatchNavAction, FocusableElement } from "./NavListProviderTypes";
import { ListActionTypes } from "../../utilities";

const NavListContext = createContext<
  | {
      currentListItems?: FocusableElement[];
      listDispatch?: DispatchNavAction;
    }
  | undefined
>({});

export default function NavListProvider({ children, value }) {
  const [currentListItems] = useState<FocusableElement[]>([]);
  const {} = value;

  const getCurrentIndex = (
    focusableEl: FocusableElement,
    currentListItems: FocusableElement[],
  ) => {
    let currentIndex = -1;
    /* istanbul ignore else */
    if (currentListItems.length > 0) {
      currentIndex = currentListItems.indexOf(focusableEl);
    }
    return currentIndex;
  };

  const listDispatch: DispatchNavAction = useCallback(
    (actionType: number, focusableEl?: FocusableElement) => {
      const currentListLength = currentListItems?.length || 0;

      let currentIndex: number = 0,
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

          if (newIndex > 0 && newIndex >= currentListLength) {
            newIndex = 0;
          }
          /* istanbul ignore else */
          if (currentListItems && newIndex >= 0) {
            dispatchItem = currentListItems[newIndex];
            shouldFocus = true;
          }
          break;
      }

      if (shouldFocus) {
        dispatchItem?.focus({ preventScroll: true });
      }
    },
    [currentListItems],
  );

  return (
    <NavListContext.Provider
      value={{
        currentListItems,
        listDispatch,
      }}
    >
      {children}
    </NavListContext.Provider>
  );
}

NavListProvider.context = NavListContext;
