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
  const [componentActive, setComponentActive] = useState<boolean>(false);

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
        componentActive,
        getNavigationArray,
        registerNavItem,
        registerSubNav,
        setComponentActive,
        setIsListOpen,
        setListItems,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
}
NavigationProvider.context = NavigationContext;
