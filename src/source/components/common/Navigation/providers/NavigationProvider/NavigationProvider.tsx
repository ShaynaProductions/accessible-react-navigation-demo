import { createContext, JSX, useCallback, useState } from "react";
import {
  NavigationContextReturnValueProps,
  NavigationContextStoredValueProps,
  NavigationContextValueProps,
} from "./NavigationProviderTypes";
import { FocusableElement } from "../../NavigationTypes";
import { EmptyObject } from "@/source/types";

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

  // const _getLastElement = useCallback(
  //   (parentEl: HTMLButtonElement | null): FocusableElement => {
  //     const parentIndex = _getNavigationIndex(parentEl);
  //     const { storedList } = _getNavigationArray()[parentIndex];
  //     return storedList[storedList.length - 1];
  //   },
  //   [_getNavigationArray, _getNavigationIndex],
  // );

  const _getNavObjectContainingElement = useCallback(
    (focusableElement: FocusableElement): NavigationContextStoredValueProps => {
      let returnObj;
      for (const navObject of navigationArray) {
        const { storedList } = navObject;
        if (storedList.length > 0) {
          if (storedList.indexOf(focusableElement) > -1) {
            returnObj = navObject;
            break;
          }
        }
      }
      return returnObj;
    },
    [navigationArray],
  );

  // const _getNextElement = useCallback(
  //   (parentEl, focusedEl) => {
  //     const parentIndex = _getNavigationIndex(parentEl);
  //     const { storedList } = _getNavigationArray()[parentIndex];
  //     const currentElementIndex = storedList.indexOf(focusedEl);
  //     let nextIndex = 0;
  //
  //     if (currentElementIndex === storedList.length - 1) {
  //       nextIndex = 0;
  //     } else {
  //       nextIndex = currentElementIndex + 1;
  //     }
  //
  //     return storedList[nextIndex];
  //   },
  //   [_getNavigationArray, _getNavigationIndex],
  // );

  const getNextElementInRow = (focusableEl, currentList) => {
    let newIndex = 0;

    const currentIndex = currentList.indexOf(focusableEl);

    newIndex = currentIndex + 1;

    if (newIndex < 0 || newIndex >= currentList.length) {
      newIndex = 0;
    }
    return currentList[newIndex];
  };

  const _isTopRow = (parentEl) => {
    const topRowParent = _getNavigationArray()[0].storedParentEl;
    return topRowParent === parentEl;
  };

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

  const getNextSiblingElement: NavigationContextReturnValueProps["getNextSiblingElement"] =
    (
      parentEl,
      focusableEl,
      currentFocusedList,
      isListOpen,
    ): FocusableElement => {
      const isTopRow = _isTopRow(parentEl);
      const currentlyFocusedIndex = currentFocusedList.indexOf(focusableEl);
      let nextFocusableElement: FocusableElement = getNextElementInRow(
        focusableEl,
        currentFocusedList,
      );

      if (!isTopRow) {
        if (
          currentlyFocusedIndex === currentFocusedList.length - 1 &&
          isListOpen
        ) {
          const { storedParentEl, storedList, isListOpen } =
            _getNavObjectContainingElement(parentEl as FocusableElement);
          nextFocusableElement = getNextSiblingElement(
            storedParentEl as HTMLButtonElement | null,
            parentEl as FocusableElement,
            storedList as FocusableElement[],
            isListOpen || false,
          );
        }
      }

      return nextFocusableElement;
    };

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
      (isListOpen: boolean, parentEl: HTMLButtonElement | null) => {
        _setParentEl(parentEl);
        setIsListOpen(isListOpen, parentEl);
      },
      [setIsListOpen, _setParentEl],
    );

  return (
    <NavigationContext.Provider
      value={{
        getFirstChildElement,
        getNextSiblingElement,
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
