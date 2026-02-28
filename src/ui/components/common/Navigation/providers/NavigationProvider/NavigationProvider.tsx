"use client";
import { createContext, useCallback, useReducer, type JSX } from "react";
import {
  NavigationContextReturnValueProps,
  NavigationObjectProps,
} from "./NavigationProviderTypes";
import { EmptyObject } from "@/ui/types";
import { navigationReducer } from "./navigationReducer";

export const NavigationContext = createContext<
  NavigationContextReturnValueProps | EmptyObject
>({});

export function NavigationProvider({ children, value }): JSX.Element {
  const { data } = value;
  const navigationObject: NavigationObjectProps = {
    storedParentEl: data.storedParentEl,
    isSubListOpen: data.isSubListOpen,
    storedList: [],
  };
  const [state, dispatch] = useReducer(navigationReducer, {
    navigationArray: [navigationObject],
  });

  const setIsListOpen: NavigationContextReturnValueProps["setIsListOpen"] =
    useCallback((isListOpen, parentEl) => {
      dispatch({ type: "SET_IS_LIST_OPEN", parentEl, isListOpen });
    }, []);

  const setListItems: NavigationContextReturnValueProps["setListItems"] =
    useCallback((navigationList, parentEl) => {
      dispatch({
        type: "SET_LIST_ITEMS",
        parentEl,
        navigationList: navigationList,
      });
    }, []);

  const registerButtonAsParent: NavigationContextReturnValueProps["registerButtonAsParent"] =
    (isListOpen, parentEl) => {
      dispatch({ type: "SET_PARENT", parentEl, isListOpen });
    };

  const registerItemInNavigationArray: NavigationContextReturnValueProps["registerItemInNavigationArray"] =
    (navigationList, parentEl) => {
      setListItems(navigationList, parentEl);
    };

  return (
    <NavigationContext.Provider
      value={{
        registerButtonAsParent,
        registerItemInNavigationArray,
        setIsListOpen,
        setListItems,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
}

NavigationProvider.context = NavigationContext;
