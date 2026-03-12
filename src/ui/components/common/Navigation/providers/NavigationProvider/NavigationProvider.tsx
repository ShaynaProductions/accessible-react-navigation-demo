"use client";
import {
  createContext,
  useCallback,
  useReducer,
  type JSX,
  useRef,
} from "react";
import type { EmptyObject } from "@/ui/types";
import type {
  NavigationContextReturnValueProps,
  NavigationInternalProps,
  NavigationObjectProps,
} from "./NavigationProviderTypes";
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

  const _dispatchSubListCloseByParent: NavigationInternalProps["_dispatchSubListCloseByParent"] =
    useRef(new Map());

  const getNavigationArray: NavigationContextReturnValueProps["getNavigationArray"] =
    useCallback(() => {
      return state.navigationArray.map((obj) => ({
        ...obj,
        dispatchSubListClose: _dispatchSubListCloseByParent.current.get(
          obj.storedParentEl,
        ),
      }));
    }, [state.navigationArray]);

  const registerButtonAsParent: NavigationContextReturnValueProps["registerButtonAsParent"] =
    (isListOpen, parentEl, dispatchSubListClose) => {
      dispatch({ type: "SET_PARENT", parentEl, isListOpen });
      _dispatchSubListCloseByParent.current.set(parentEl, dispatchSubListClose);
    };

  const registerItemInNavigationArray: NavigationContextReturnValueProps["registerItemInNavigationArray"] =
    (navigationList, parentEl) => {
      setListItems(navigationList, parentEl);
    };

  return (
    <NavigationContext.Provider
      value={{
        getNavigationArray,
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
