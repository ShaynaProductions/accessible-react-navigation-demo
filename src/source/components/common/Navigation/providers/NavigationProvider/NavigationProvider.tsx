import { createContext, JSX, useCallback, useState } from "react";
import {
  NavigationContextReturnValueProps,
  NavigationContextStoredValueProps,
  NavigationContextValueProps,
} from "./NavigationProviderTypes";
import { FocusableElement } from "../../NavigationTypes";
import { EmptyObject } from "@/source/types";
import { getFocusableElement } from "@/source/utilities";

export const NavigationContext = createContext<
  NavigationContextValueProps | EmptyObject
>({});

export default function NavigationProvider({ children, value }): JSX.Element {
  const currentObj = { ...value };
  const [navigationArray] = useState([currentObj]);

  const getNavigationArray = useCallback(() => {
    return navigationArray as NavigationContextStoredValueProps[];
  }, [navigationArray]);

  /* ----------- Private ----------------*/

  const _getNavigationIndex = useCallback(
    (parentEl: HTMLButtonElement | null): number => {
      let foundIndex = -1,
        index = 0;
      for (const navObject of navigationArray) {
        const { storedParentEl } = navObject;
        if (storedParentEl === parentEl) {
          foundIndex = index;
          break;
        }
        index += 1;
      }
      return foundIndex;
    },
    [navigationArray],
  );

  const _setNavigationArrayObject = useCallback(
    (
      index: number,
      updatedContent: Partial<NavigationContextStoredValueProps>,
    ) => {
      const currentObj = getNavigationArray()[index];
      navigationArray[index] = {
        ...currentObj,
        ...updatedContent,
      };
    },
    [getNavigationArray, navigationArray],
  );

  const _getNavObjectByParent = useCallback(
    (parentElement: FocusableElement): NavigationContextStoredValueProps => {
      let returnObj: NavigationContextStoredValueProps = {};
      for (const navObject of navigationArray) {
        const { storedParentEl } = navObject;
        /* istanbul ignore else */
        if (storedParentEl === parentElement) {
          returnObj = navObject;
          break;
        }
      }
      return returnObj;
    },
    [navigationArray],
  );

  const _indexInTopRow = useCallback(
    (focusedElement: FocusableElement): number => {
      const topRow = getNavigationArray()[0];
      return topRow.storedList?.indexOf(focusedElement) as number;
    },
    [getNavigationArray],
  );

  const _isTopRow = useCallback(
    (parentEl: HTMLButtonElement | null) => {
      const topRowParent = getNavigationArray()[0].storedParentEl;
      return topRowParent === parentEl;
    },
    [getNavigationArray],
  );

  const _getLastElementByParent = useCallback(
    (navObject: NavigationContextStoredValueProps): FocusableElement => {
      /* istanbul ignore next */
      const { isListOpen, storedList = [], storedParentEl } = navObject;
      const lastIndex = storedList.length - 1;

      if (isListOpen) {
        if (storedList[lastIndex].type === "button") {
          const currentObj = storedList[lastIndex];
          const currentNavObject = _getNavObjectByParent(currentObj);
          return _getLastElementByParent(currentNavObject);
        } else {
          return storedList[lastIndex];
        }
      }
      return storedParentEl as FocusableElement;
    },
    [_getNavObjectByParent],
  );

  const _getNavObjectContainingElement = useCallback(
    (focusableElement: FocusableElement): NavigationContextStoredValueProps => {
      let returnObj: NavigationContextStoredValueProps = {};
      for (const navObject of getNavigationArray()) {
        /* istanbul ignore next */
        const storedList = navObject.storedList || [];
        /* istanbul ignore else */
        if (
          storedList.length > 0 &&
          storedList.indexOf(focusableElement) > -1
        ) {
          returnObj = navObject;
          break;
        }
      }
      return returnObj;
    },
    [getNavigationArray],
  );

  /* istanbul ignore next */
  const _getLastFocusableElementByParent = useCallback(
    (focusableEl: FocusableElement) => {
      let navObj: NavigationContextStoredValueProps;
      if (focusableEl.type === "button") {
        navObj = _getNavObjectByParent(focusableEl);
      } else {
        navObj = _getNavObjectContainingElement(focusableEl);
      }
      const currentList = navObj.storedList || [];
      const listLength = currentList.length;

      if (currentList[listLength - 1].type === "button") {
        return _getLastFocusableElementByParent(currentList[listLength - 1]);
      } else {
        return currentList[listLength - 1];
      }
    },
    [_getNavObjectByParent, _getNavObjectContainingElement],
  );

  const _getNextElementInRow = (
    focusableEl: FocusableElement,
    currentList: FocusableElement[],
  ) => {
    let newIndex: number;

    const currentIndex = currentList.indexOf(focusableEl);

    newIndex = currentIndex + 1;

    if (newIndex < 0 || newIndex >= currentList.length) {
      newIndex = 0;
    }
    return currentList[newIndex];
  };

  const _getPreviousElementInRow = (
    focusableEl: FocusableElement,
    currentList: FocusableElement[],
  ) => {
    let newIndex: number;
    const currentIndex = currentList.indexOf(focusableEl);
    newIndex = currentIndex - 1;
    if (newIndex < 0) {
      newIndex = currentList.length - 1;
    }
    return currentList[newIndex];
  };

  const _getTopParent = useCallback(
    (
      navObject: NavigationContextStoredValueProps,
    ): HTMLButtonElement | null => {
      const { storedParentEl } = navObject;
      const indexInTopRow = _indexInTopRow(storedParentEl as FocusableElement);
      if (storedParentEl && indexInTopRow < 0) {
        const nextNavObject = _getNavObjectContainingElement(storedParentEl);

        return _getTopParent(nextNavObject);
      } else {
        return storedParentEl as HTMLButtonElement | null;
      }
    },
    [_getNavObjectContainingElement, _indexInTopRow],
  );

  const _setDispatchChildClose = useCallback(
    (parentEl: HTMLButtonElement | null, dispatchChildClose: () => void) => {
      const parentIndex: number = _getNavigationIndex(parentEl);
      const currentObj = getNavigationArray()[parentIndex];
      if (
        parentIndex >= 0 &&
        currentObj.dispatchChildClose?.toString() !==
          dispatchChildClose.toString()
      ) {
        _setNavigationArrayObject(parentIndex, {
          dispatchChildClose: dispatchChildClose,
        });
      }
    },
    [getNavigationArray, _getNavigationIndex, _setNavigationArrayObject],
  );

  const _setParentEl = useCallback(
    (parentEl: HTMLButtonElement | null) => {
      const parentIndex = _getNavigationIndex(parentEl);
      if (parentIndex === -1) {
        navigationArray.push({ storedParentEl: parentEl });
      }
    },
    [_getNavigationIndex, navigationArray],
  );

  /* ---------- Public ------------------*/
  /* istanbul ignore next */
  const getFirstChildElement: NavigationContextReturnValueProps["getFirstChildElement"] =
    (parentEl) => {
      const parentIndex = _getNavigationIndex(parentEl);

      const currentList = getNavigationArray()[parentIndex].storedList || [];
      return currentList[0];
    };

  const getNextElement: NavigationContextReturnValueProps["getNextElement"] =
    useCallback(
      (
        parentEl,
        focusableEl,
        currentFocusedList,
        isListOpen,
        currentKey,
      ): FocusableElement => {
        const isTopRow = _isTopRow(parentEl);
        const parentNavObject = _getNavObjectContainingElement(focusableEl);
        const lastElement = _getLastElementByParent(parentNavObject);
        let nextFocusableElement: FocusableElement = _getNextElementInRow(
          focusableEl,
          currentFocusedList,
        );

        if (focusableEl.type === "button") {
          const { isListOpen, storedList } = _getNavObjectByParent(focusableEl);
          const isSubListOpen = isListOpen;
          /* istanbul ignore next */
          const subNavigation = storedList || [];
          if (isSubListOpen) {
            /* istanbul ignore else */
            if (subNavigation.length > 0) {
              nextFocusableElement = subNavigation[0];
            }
            if (isTopRow) {
              /* istanbul ignore else */
            } else {
              // !isTopRow
            }
          } else {
            // !isSubListOpen
            /* istanbul ignore else */
            if (isTopRow) {
            } else {
              // !isTopRow
            }
          }
        } else {
          // focusableEl.type !== "button";
          if (isTopRow) {
            if (focusableEl == lastElement) {
              if (currentKey === "Tab") {
                nextFocusableElement = getFocusableElement(
                  lastElement,
                  "next",
                ) as FocusableElement;
              }
            }
          } else {
            // !isTopRow
            if (focusableEl === lastElement) {
              /* istanbul ignore else */
              if (focusableEl == lastElement) {
                nextFocusableElement = _getTopParent(
                  parentNavObject,
                ) as FocusableElement;
              }
            }
          }
        }
        // New
        // if (focusableEl.type === "button") {
        //   const { isListOpen, storedList } = _getNavObjectByParent(focusableEl);
        //   const isSubListOpen = isListOpen;
        //   const subNavigation = storedList || [];
        //
        //   if (isSubListOpen) {
        //
        //   }
        //   if (isTopRow) {
        //     if (currentKey === "Tab") {
        //       if (
        //         focusableEl === lastTopElement &&
        //         !parentNavObject.isListOpen
        //       ) {
        //         nextFocusableElement = getFocusableElement(
        //           lastElement,
        //           "next",
        //         ) as FocusableElement;
        //       }
        //     } else {
        //       // focusableEl.type is not button.
        //     }
        //   }
        // } else if (currentKey === "Tab") {
        //   if (focusableEl === lastElement) {
        //     nextFocusableElement = getFocusableElement(
        //       focusableEl,
        //       "next",
        //     ) as FocusableElement;
        //   }
        // } else {
        //   if (focusableEl === lastElement && !isTopRow) {
        //     nextFocusableElement = _getTopParent(
        //       parentNavObject,
        //     ) as FocusableElement;
        //   }
        // }

        return nextFocusableElement;
      },
      [
        _getLastElementByParent,
        _getNavObjectByParent,
        _getNavObjectContainingElement,
        _getTopParent,
        _isTopRow,
      ],
    );
  const getPreviousElement: NavigationContextReturnValueProps["getPreviousElement"] =
    useCallback(
      (
        parentEl,
        focusableEl,
        currentFocusedList,
        isListOpen,
        currentKey,
      ): FocusableElement => {
        const isTopRow = _isTopRow(parentEl);
        const currentlyFocusedIndex = currentFocusedList.indexOf(focusableEl);

        let prevFocusableElement = _getPreviousElementInRow(
          focusableEl,
          currentFocusedList,
        );

        if (!isTopRow && isListOpen && currentlyFocusedIndex === 0) {
          prevFocusableElement = parentEl as FocusableElement;
        } else if (
          isTopRow &&
          currentlyFocusedIndex > 0 &&
          prevFocusableElement.type === "button"
        ) {
          const parentNavObj = _getNavObjectByParent(
            prevFocusableElement as FocusableElement,
          );
          prevFocusableElement = _getLastElementByParent(parentNavObj);
        }
        /* istanbul ignore next */
        const topList = getNavigationArray()[0].storedList || [];
        if (currentKey === "Tab" && focusableEl === topList[0]) {
          prevFocusableElement = getFocusableElement(
            focusableEl,
            "prev",
          ) as FocusableElement;
        }
        return prevFocusableElement;
      },
      [
        _getLastElementByParent,
        _getNavObjectByParent,
        getNavigationArray,
        _isTopRow,
      ],
    );

  const getSubNavigation: NavigationContextReturnValueProps["getSubNavigation"] =
    useCallback(
      (parentEl) => {
        const subNavListItems: NavigationContextStoredValueProps[] = [];
        const currentNavObject = _getNavObjectByParent(parentEl);
        const currentList = currentNavObject.storedList;
        /* istanbul ignore else */
        if (currentList) {
          for (const currentItem of currentList) {
            if (currentItem.type === "button") {
              subNavListItems.push(_getNavObjectByParent(currentItem));
            }
          }
        }
        return subNavListItems;
      },
      [_getNavObjectByParent],
    );
  /* istanbul ignore next */
  const isTopRow: NavigationContextReturnValueProps["isTopRow"] = useCallback(
    (parentEl) => {
      return _isTopRow(parentEl);
    },
    [_isTopRow],
  );

  const setIsListOpen: NavigationContextReturnValueProps["setIsListOpen"] =
    useCallback(
      (isListOpen: boolean, parentEl: HTMLButtonElement | null) => {
        const parentIndex: number = _getNavigationIndex(parentEl);
        const currentObj = getNavigationArray()[parentIndex];
        if (parentIndex >= 0 && currentObj.isListOpen !== isListOpen) {
          _setNavigationArrayObject(parentIndex, {
            isListOpen: isListOpen,
          });
        }
      },
      [getNavigationArray, _getNavigationIndex, _setNavigationArrayObject],
    );
  const setListItems: NavigationContextReturnValueProps["setListItems"] =
    useCallback(
      (navList: FocusableElement[], parentEl: HTMLButtonElement | null) => {
        const parentIndex = _getNavigationIndex(parentEl);
        /* istanbul ignore else */
        if (parentIndex >= 0) {
          const currentObj = getNavigationArray()[parentIndex];
          if (currentObj.storedList !== navList) {
            _setNavigationArrayObject(parentIndex, {
              storedList: navList,
            });
          }
        }
      },
      [getNavigationArray, _getNavigationIndex, _setNavigationArrayObject],
    );

  const registerNavItem: NavigationContextReturnValueProps["registerNavItem"] =
    useCallback(
      (navList, parentEl) => {
        _setParentEl(parentEl);
        setListItems(navList, parentEl);
      },
      [_setParentEl, setListItems],
    );
  const registerSubNav: NavigationContextReturnValueProps["registerSubNav"] =
    useCallback(
      (
        isListOpen: boolean,
        parentEl: HTMLButtonElement | null,
        dispatchChildClose: () => void,
      ) => {
        _setParentEl(parentEl);
        setIsListOpen(isListOpen, parentEl);
        _setDispatchChildClose(parentEl, dispatchChildClose);
      },
      [_setParentEl, setIsListOpen, _setDispatchChildClose],
    );

  return (
    <NavigationContext.Provider
      value={{
        _getNavObjectContainingElement,
        getFirstChildElement,
        getNavigationArray,
        getNextElement,
        getPreviousElement,
        getSubNavigation,
        isTopRow,
        registerNavItem,
        registerSubNav,
        setIsListOpen,
        setListItems,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
}
NavigationProvider.context = NavigationContext;
