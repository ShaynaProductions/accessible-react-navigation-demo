import { createContext, JSX, useCallback, useState } from "react";
import {
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

  const setIsListOpen = useCallback(
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
  const setListItems = useCallback(
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

  const registerNavItem = useCallback(
    (navList, parentEl) => {
      setListItems(navList, parentEl);
    },
    [setListItems],
  );
  const registerSubNav = useCallback(
    (
      isListOpen: boolean,
      navList: FocusableElement[],
      parentEl: HTMLButtonElement | null,
    ) => {
      _setParentEl(parentEl);
      setIsListOpen(isListOpen, parentEl);
      setListItems(navList, parentEl);
    },
    [setIsListOpen, setListItems, _setParentEl],
  );

  return (
    <NavigationContext.Provider
      value={{ registerNavItem, registerSubNav, setIsListOpen, setListItems }}
    >
      {children}
    </NavigationContext.Provider>
  );
}
NavigationProvider.context = NavigationContext;
