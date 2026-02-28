import React from "react";
import type {
  ControllingElementType,
  FocusableElementType,
} from "../../utilities";

export type NavigationListState = {
  items: FocusableElementType[];
  parentRef: React.RefObject<ControllingElementType>;
};

export type NavigationListAction = {
  type: "REGISTER_ITEM";
  item: FocusableElementType;
};

export interface NavigationListContextStoredValueProps {
  parentRef: React.RefObject<ControllingElementType>;
}

export interface NavigationListContextReturnValueProps {
  getCurrentListItems: () => FocusableElementType[];
  getParentEl: () => ControllingElementType;
  registerItemInCurrentList: (focusableEl: FocusableElementType) => void;
}
