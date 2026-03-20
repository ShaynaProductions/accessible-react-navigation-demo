"use client";
import {
  createContext,
  useCallback,
  useReducer,
  useRef,
  type JSX,
} from "react";
import type { EmptyObject } from "@/ui/types";
import type {
  NavigationContextReturnValueProps,
  NavigationInternalProps,
  NavigationObjectProps,
} from "./NavigationProviderTypes";
import { navigationReducer } from "./navigationReducer";
import { returnElementFromRefObject } from "@/ui/components/common/Navigation/utilities";

export const NavigationContext = createContext<
  NavigationContextReturnValueProps | EmptyObject
>({});

export function NavigationProvider({ children, value }): JSX.Element {
  const { data, config } = value;
  const navigationObject: NavigationObjectProps = {
    storedParentEl: data.storedParentEl,
    isSubListOpen: data.isSubListOpen,
    storedList: [],
  };
  const [state, dispatch] = useReducer(navigationReducer, {
    navigationArray: [navigationObject],
    isComponentActive: false,
    controllingRef: data.controllingRef,
  });

  const isComponentActive = () => {
    return state.isComponentActive;
  };

  const setIsComponentActive = (isActive) => {
    dispatch({ type: "SET_IS_COMPONENT_ACTIVE", isActive });
  };

  const getControllingElement = useCallback(() => {
    return returnElementFromRefObject(state.controllingRef);
  }, [state.controllingRef]);

  const isComponentControlled = () => {
    return getControllingElement() !== null;
  };

  const getSkipName = useCallback(() => {
    return config.skipName;
  }, [config.skipName]);

  const isLayoutVertical = useCallback(() => {
    return config.orientation === "vertical";
  }, [config.orientation]);

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
    useCallback((isListOpen, parentEl, dispatchSubListClose) => {
      dispatch({ type: "SET_PARENT", parentEl, isListOpen });
      _dispatchSubListCloseByParent.current.set(parentEl, dispatchSubListClose);
    }, []);

  const registerItemInNavigationArray: NavigationContextReturnValueProps["registerItemInNavigationArray"] =
    (navigationList, parentEl) => {
      setListItems(navigationList, parentEl);
    };

  return (
    <NavigationContext.Provider
      value={{
        getControllingElement,
        getNavigationArray,
        getSkipName,
        isComponentActive,
        isComponentControlled,
        isLayoutVertical,
        registerButtonAsParent,
        registerItemInNavigationArray,
        setIsComponentActive,
        setIsListOpen,
        setListItems,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
}

NavigationProvider.context = NavigationContext;
