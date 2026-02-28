"use client";

import { createContext, useCallback, useReducer } from "react";
import type { EmptyObject } from "@/ui/types";
import { FocusableElementType } from "../../utilities";
import type { NavigationListContextReturnValueProps } from "./NavigationListProviderTypes";
import { navigationListReducer } from "./navigationListReducer";

export const NavigationListContext = createContext<
  Partial<NavigationListContextReturnValueProps> | EmptyObject
>({});

export function NavigationListProvider({ children }) {
  const [state, dispatch] = useReducer(navigationListReducer, {
    items: [],
  });

  const getCurrentListItems: NavigationListContextReturnValueProps["getCurrentListItems"] =
    useCallback(() => {
      return state.items;
    }, [state.items]);

  const registerItemInCurrentList: NavigationListContextReturnValueProps["registerItemInCurrentList"] =
    useCallback((focusableEl: FocusableElementType) => {
      dispatch({ type: "REGISTER_ITEM", item: focusableEl });
    }, []);

  return (
    <NavigationListContext.Provider
      value={{
        getCurrentListItems,
        registerItemInCurrentList,
      }}
    >
      {children}
    </NavigationListContext.Provider>
  );
}
NavigationListProvider.context = NavigationListContext;
