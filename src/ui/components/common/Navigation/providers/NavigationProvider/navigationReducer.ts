"use client";
import { arraysEqual } from "@/ui/utilities";
import type {
  NavigationAction,
  NavigationObjectProps,
  NavigationState,
} from "./";

export function navigationReducer(
  state: NavigationState,
  action: NavigationAction,
): NavigationState {
  switch (action.type) {
    case "SET_PARENT": {
      const exists = state.navigationArray.some(
        (obj) => obj.storedParentEl === action.parentEl,
      );
      if (exists) return state;

      const navObj: NavigationObjectProps = {
        storedParentEl: action.parentEl,
        isSubListOpen: action.isListOpen,
        storedList: [],
      };

      return {
        ...state,
        navigationArray: [...state.navigationArray, navObj],
      };
    }

    case "SET_IS_LIST_OPEN": {
      const index = state.navigationArray.findIndex(
        (obj) => obj.storedParentEl === action.parentEl,
      );
      const current = state.navigationArray[index];
      /* istanbul ignore if */
      if (current.isSubListOpen === action.isListOpen) return state;

      const next = state.navigationArray.slice();
      next[index] = { ...current, isSubListOpen: action.isListOpen };

      return { ...state, navigationArray: next };
    }

    case "SET_LIST_ITEMS": {
      const index = state.navigationArray.findIndex(
        (obj) => obj.storedParentEl === action.parentEl,
      );

      const current = state.navigationArray[index];
      const currentList = current.storedList;

      const nextList = action.navigationList;

      if (arraysEqual(currentList, nextList)) return state;

      const next = state.navigationArray.slice();
      next[index] = { ...current, storedList: nextList };

      return { ...state, navigationArray: next };
    }

    /* istanbul ignore next */
    default: {
      return state;
    }
  }
}
