import type {  FocusableElementType } from "../../utilities";

export type NavigationListState = {
  items: FocusableElementType[];
};

export type NavigationListAction = {
  type: "REGISTER_ITEM";
  item: FocusableElementType;
};

export interface NavigationListContextReturnValueProps {
  getCurrentListItems: () => FocusableElementType[];
  registerItemInCurrentList: (focusableEl: FocusableElementType) => void;
}
