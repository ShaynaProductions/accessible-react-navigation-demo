import { ControllingElementType, FocusableElementType } from "../../utilities";

export interface UseNavigationListInternalProps {
  _getCurrentIndex: (focusedElement: FocusableElementType) => number;
}

export interface UseNavigationListReturnProps {
  currentListItems: FocusableElementType[];
  parentEl: ControllingElementType;
  registerItemInCurrentList: (focusableEl: FocusableElementType) => void;
  setFirstFocus: () => void;
  setLastFocus: () => void;
  setNextFocus: (currentlyFocusedEl: FocusableElementType) => void;
  setPreviousFocus: (currentlyFocusedEl: FocusableElementType) => void;
  shiftFocus: (focusableEl: FocusableElementType) => void;
}
