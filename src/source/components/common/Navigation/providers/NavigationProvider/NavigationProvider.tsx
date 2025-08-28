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

  const getNavObjectByParent = useCallback(
    (
      parentElement: HTMLButtonElement | null,
    ): NavigationContextStoredValueProps => {
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
      const { storedList = [] } = navObject;
      const lastIndex = storedList.length - 1;
      /* istanbul ignore if */
      if (storedList[lastIndex].type === "button") {
        return _getLastElementByParent(
          getNavObjectByParent(
            storedList[lastIndex] as HTMLButtonElement | null,
          ),
        );
      } else {
        return storedList[lastIndex];
      }
    },
    [getNavObjectByParent],
  );

  const _getLastElementOpenByParent = useCallback(
    (navObject: NavigationContextStoredValueProps): FocusableElement => {
      /* istanbul ignore next */
      const { /*isListOpen, storedList = [], */ storedParentEl } = navObject;
      // const lastIndex = storedList.length - 1;

      // if (isListOpen) {
      //   if (storedList[lastIndex].type === "button") {
      //     const currentObj = storedList[lastIndex];
      //     const currentNavObject = getNavObjectByParent(
      //       currentObj as HTMLButtonElement | null,
      //     );
      //     return _getLastElementOpenByParent(currentNavObject);
      //   } else {
      //     return storedList[lastIndex];
      //   }
      // }
      return storedParentEl as FocusableElement;
    },
    [
      /*getNavObjectByParent*/
    ],
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
        navObj = getNavObjectByParent(focusableEl as HTMLButtonElement | null);
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
    [getNavObjectByParent, _getNavObjectContainingElement],
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
      /* istanbul ignore else */
      const currentList = getNavigationArray()[parentIndex].storedList || [];
      return currentList[0];
    };

  const getLastChildInRow: NavigationContextReturnValueProps["getLastChildInRow"] =
    (index: number) => {
      /* istanbul ignore next */
      const currentList = getNavigationArray()[index].storedList || [];
      return currentList[currentList.length - 1];
    };

  const getNextElement: NavigationContextReturnValueProps["getNextElement"] =
    useCallback(
      (
        parentEl,
        focusableEl,
        currentFocusedList,
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
          const currentNavObject = getNavObjectByParent(
            focusableEl as HTMLButtonElement | null,
          );
          const { isListOpen, storedList } = currentNavObject;
          const isSubListOpen = isListOpen;
          /* istanbul ignore next */
          const subNavigation = storedList || [];

          if (isSubListOpen && subNavigation.length > 0) {
            nextFocusableElement = subNavigation[0];
          }
          if (
            !isSubListOpen &&
            currentFocusedList.indexOf(focusableEl) ===
              currentFocusedList.length - 1 &&
            currentKey === "Tab"
          ) {
            nextFocusableElement = getFocusableElement(
              _getLastElementByParent(currentNavObject),
              "next",
            ) as FocusableElement;
          }
        } else {
          // focusableEl.type !== "button";
          if (focusableEl === lastElement) {
            if (currentKey === "Tab") {
              nextFocusableElement = getFocusableElement(
                lastElement,
                "next",
              ) as FocusableElement;
            } else {
              if (!isTopRow) {
                nextFocusableElement = _getTopParent(
                  parentNavObject,
                ) as FocusableElement;
              }
            }
          }
        }

        return nextFocusableElement;
      },
      [
        _getLastElementByParent,
        getNavObjectByParent,
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
        /* istanbul ignore next */
        const topList = getNavigationArray()[0].storedList || [];
        const currentlyFocusedIndex = currentFocusedList.indexOf(focusableEl);

        let prevFocusableElement = _getPreviousElementInRow(
          focusableEl,
          currentFocusedList,
        );

        if (isTopRow) {
          /* istanbul ignore else */
          if (currentlyFocusedIndex >= 0) {
            if (prevFocusableElement.type === "button") {
              const parentNavObj = getNavObjectByParent(
                prevFocusableElement as HTMLButtonElement | null,
              );
              prevFocusableElement = _getLastElementOpenByParent(parentNavObj);
            }
          }

          if (currentKey === "Tab") {
            if (focusableEl === topList[0]) {
              prevFocusableElement = getFocusableElement(
                focusableEl,
                "prev",
              ) as FocusableElement;
            }
          }
        } else {
          // !isTopRow
          if (isListOpen && currentlyFocusedIndex === 0) {
            prevFocusableElement = parentEl as FocusableElement;
          }
        }

        return prevFocusableElement;
      },
      [
        _getLastElementOpenByParent,
        getNavObjectByParent,
        getNavigationArray,
        _isTopRow,
      ],
    );

  const getSubNavigation: NavigationContextReturnValueProps["getSubNavigation"] =
    useCallback(
      (parentEl) => {
        const subNavListItems: NavigationContextStoredValueProps[] = [];
        const currentNavObject = getNavObjectByParent(parentEl);
        const currentList = currentNavObject.storedList;
        /* istanbul ignore else */
        if (currentList) {
          for (const currentItem of currentList) {
            if (currentItem.type === "button") {
              subNavListItems.push(
                getNavObjectByParent(currentItem as HTMLButtonElement | null),
              );
            }
          }
        }
        return subNavListItems;
      },
      [getNavObjectByParent],
    );

  // const isTopRow: NavigationContextReturnValueProps["isTopRow"] = useCallback(
  //   (parentEl) => {
  //     return _isTopRow(parentEl);
  //   },
  //   [_isTopRow],
  // );

  const handleFocusableFocus: NavigationContextReturnValueProps["handleFocusableFocus"] =
    useCallback(
      (focusableEl, closeOpenSiblings) => {
        if (_indexInTopRow(focusableEl) !== -1) {
          closeOpenSiblings(focusableEl);
        }
      },
      [_indexInTopRow],
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
        getNavObjectByParent,
        getFirstChildElement,
        getLastChildInRow,
        getNavigationArray,
        getNextElement,
        getPreviousElement,
        getSubNavigation,
        handleFocusableFocus,
        // isTopRow,
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
