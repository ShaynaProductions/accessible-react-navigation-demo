"use client";

import { createContext, useCallback, useReducer } from "react";
import type { EmptyObject } from "@/ui/types";
import { type FocusableElementType } from "../../utilities";
import type { NavigationListContextReturnValueProps } from "./NavigationListProviderTypes";
import { navigationListReducer } from "./navigationListReducer";

export const NavigationListContext = createContext<
  Partial<NavigationListContextReturnValueProps> | EmptyObject
>({});

export function NavigationListProvider({ children, value }) {
  const { parentRef } = value;
  const [state, dispatch] = useReducer(navigationListReducer, {
    parentRef: parentRef,
    items: [],
  });

  const getCurrentListItems: NavigationListContextReturnValueProps["getCurrentListItems"] =
    useCallback(() => {
      return state.items;
    }, [state.items]);

  const getParentEl: NavigationListContextReturnValueProps["getParentEl"] =
    useCallback(() => {
      return state.parentRef.current;
    }, [state.parentRef]);

  const registerItemInCurrentList: NavigationListContextReturnValueProps["registerItemInCurrentList"] =
    useCallback((focusableEl: FocusableElementType) => {
      dispatch({ type: "REGISTER_ITEM", item: focusableEl });
    }, []);

  return (
    <NavigationListContext.Provider
      value={{
        getCurrentListItems,
        getParentEl,
        registerItemInCurrentList,
      }}
    >
      {children}
    </NavigationListContext.Provider>
  );
}
NavigationListProvider.context = NavigationListContext;
