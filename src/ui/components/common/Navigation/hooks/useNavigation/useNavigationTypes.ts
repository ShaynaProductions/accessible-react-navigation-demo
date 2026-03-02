import type {
  NavigationContextReturnValueProps,
  NavigationObjectProps,
} from "../../providers/NavigationProvider";
import type {
  ControllingElementType,
  FocusableElementType,
} from "../../utilities";

export interface UseNavigationInternalTypes {
  _getNavigationObjectByListElement: (
    focusedEL: FocusableElementType,
  ) => NavigationObjectProps;
  _getNavigationObjectByParent: (
    parentEl: ControllingElementType,
  ) => NavigationObjectProps;
  _getIndexInTopRow: (focusedEl: FocusableElementType) => number;
  _getFirstElementInIndexedList: (index: number) => FocusableElementType;
  _isElementInTopRow: (focusedEl: FocusableElementType) => boolean;
  _getTopRowElement: (focusedEl: FocusableElementType) => FocusableElementType;
  _getParentByElement: (
    focusedEl: FocusableElementType,
  ) => ControllingElementType;
  _isLastElementInCurrentList: (focusedEl: FocusableElementType) => boolean;
  _getNextElementInList: (
    focusedEl: FocusableElementType,
    currentList: FocusableElementType[],
  ) => FocusableElementType;
  _getPreviousElementInList: (
    focusedEl: FocusableElementType,
    currentList: FocusableElementType[],
  ) => FocusableElementType;
  _getPreviousByElement: (
    focusedEl: FocusableElementType,
  ) => FocusableElementType | undefined;
}

export interface UseNavigationReturnTypes {
  getNextByButton: (
    buttonEl: HTMLButtonElement,
    isSubListOpen: boolean,
  ) => FocusableElementType | undefined;
  getNextByLink: (
    linkEl: HTMLAnchorElement,
  ) => FocusableElementType | undefined;
  getPreviousByButton: (
    buttonEl: HTMLButtonElement,
  ) => FocusableElementType | undefined;
  getPreviousByLink: (
    linkEl: HTMLAnchorElement,
  ) => FocusableElementType | undefined;
  registerItemInNavigationArray: NavigationContextReturnValueProps["registerItemInNavigationArray"];
  registerButtonAsParent: NavigationContextReturnValueProps["registerButtonAsParent"];
  setIsListOpen: NavigationContextReturnValueProps["setIsListOpen"];
  setListItems: NavigationContextReturnValueProps["setListItems"];
}
