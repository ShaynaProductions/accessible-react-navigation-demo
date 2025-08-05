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

  /* ----------- Private ----------------*/
  const _getNavigationArray = useCallback(() => {
    return navigationArray;
  }, [navigationArray]);

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
      const currentObj = _getNavigationArray()[index];
      navigationArray[index] = {
        ...currentObj,
        ...updatedContent,
      };
    },
    [_getNavigationArray, navigationArray],
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

  const _isTopRow = useCallback(
    (parentEl: HTMLButtonElement | null) => {
      const topRowParent = _getNavigationArray()[0].storedParentEl;
      return topRowParent === parentEl;
    },
    [_getNavigationArray],
  );

  const _getLastOpenElementByParent = useCallback(
    (navObject: NavigationContextStoredValueProps): FocusableElement => {
      /* istanbul ignore next */
      const { isListOpen, storedList = [], storedParentEl } = navObject;
      const lastIndex = storedList.length - 1;

      if (isListOpen) {
        if (storedList[lastIndex].type === "button") {
          const currentObj = storedList[lastIndex];
          const currentNavObject = _getNavObjectByParent(currentObj);
          return _getLastOpenElementByParent(currentNavObject);
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
      for (const navObject of _getNavigationArray()) {
        const { storedList } = navObject;
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
    [_getNavigationArray],
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

  const _setDispatchChildClose = useCallback(
    (parentEl: HTMLButtonElement | null, dispatchChildClose: () => void) => {
      const parentIndex: number = _getNavigationIndex(parentEl);
      const currentObj = _getNavigationArray()[parentIndex];
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
    [_getNavigationArray, _getNavigationIndex, _setNavigationArrayObject],
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
  const getFirstChildElement: NavigationContextReturnValueProps["getFirstChildElement"] =
    (parentEl) => {
      const parentIndex = _getNavigationIndex(parentEl);

      const currentList = _getNavigationArray()[parentIndex].storedList;
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
        const currentlyFocusedIndex = currentFocusedList.indexOf(focusableEl);
        const parentNavObject = _getNavObjectContainingElement(focusableEl);
        let nextFocusableElement: FocusableElement = _getNextElementInRow(
          focusableEl,
          currentFocusedList,
        );

        if (
          !isTopRow &&
          currentlyFocusedIndex === currentFocusedList.length - 1 &&
          isListOpen
        ) {
          const { storedParentEl, storedList, isListOpen } =
            _getNavObjectContainingElement(parentEl as FocusableElement);

          nextFocusableElement = getNextElement(
            storedParentEl as HTMLButtonElement | null,
            parentEl as FocusableElement,
            storedList as FocusableElement[],
            isListOpen as boolean,
          );
        }
        if (
          currentKey === "Tab" &&
          // !isTopRow &&
          focusableEl === _getLastOpenElementByParent(parentNavObject)
        ) {
          nextFocusableElement = getFocusableElement(
            focusableEl,
            "next",
          ) as FocusableElement;
        }

        return nextFocusableElement;
      },
      [_getLastOpenElementByParent, _getNavObjectContainingElement, _isTopRow],
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
          prevFocusableElement = _getLastOpenElementByParent(parentNavObj);
        }
        if (
          currentKey === "Tab" &&
          // isTopRow &&
          focusableEl === _getNavigationArray()[0].storedList[0]
        ) {
          prevFocusableElement = getFocusableElement(
            focusableEl,
            "prev",
          ) as FocusableElement;
        }
        return prevFocusableElement;
      },
      [
        _getLastOpenElementByParent,
        _getNavObjectByParent,
        _getNavigationArray,
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

  const setIsListOpen: NavigationContextReturnValueProps["setIsListOpen"] =
    useCallback(
      (isListOpen: boolean, parentEl: HTMLButtonElement | null) => {
        const parentIndex: number = _getNavigationIndex(parentEl);
        const currentObj = _getNavigationArray()[parentIndex];
        if (parentIndex >= 0 && currentObj.isListOpen !== isListOpen) {
          _setNavigationArrayObject(parentIndex, {
            isListOpen: isListOpen,
          });
        }
      },
      [_getNavigationArray, _getNavigationIndex, _setNavigationArrayObject],
    );
  const setListItems: NavigationContextReturnValueProps["setListItems"] =
    useCallback(
      (navList: FocusableElement[], parentEl: HTMLButtonElement | null) => {
        const parentIndex = _getNavigationIndex(parentEl);
        /* istanbul ignore else */
        if (parentIndex >= 0) {
          const currentObj = _getNavigationArray()[parentIndex];
          if (currentObj.storedList !== navList) {
            _setNavigationArrayObject(parentIndex, {
              storedList: navList,
            });
          }
        }
      },
      [_getNavigationArray, _getNavigationIndex, _setNavigationArrayObject],
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
        getFirstChildElement,
        getNextElement,
        getPreviousElement,
        getSubNavigation,
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
