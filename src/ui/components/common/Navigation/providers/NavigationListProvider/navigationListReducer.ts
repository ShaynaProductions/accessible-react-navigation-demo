import type {
  NavigationListAction,
  NavigationListState,
} from "./NavigationListProviderTypes";

export function navigationListReducer(
  state: NavigationListState,
  action: NavigationListAction,
): NavigationListState {
  switch (action.type) {
    case "REGISTER_ITEM": {
      /* istanbul ignore if */
      if (state.items.includes(action.item)) return state;
      return { ...state, items: [...state.items, action.item] };
    }

    /* istanbul ignore next */
    default: {
      return state;
    }
  }
}
