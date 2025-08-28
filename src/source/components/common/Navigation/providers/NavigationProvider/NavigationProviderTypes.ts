import { FocusableElement } from "../../NavigationTypes";

export interface NavigationContextStoredValueProps {
  dispatchChildClose?: (parentEl: HTMLButtonElement) => void;
  isListOpen?: boolean;
  storedList?: FocusableElement[];
  storedParentEl?: HTMLButtonElement | null;
}

export interface NavigationContextReturnValueProps {
  getNavObjectByParent: (
    parentElement: HTMLButtonElement | null,
  ) => NavigationContextStoredValueProps;
  getFirstChildElement: (
    parentEl: HTMLButtonElement | null,
  ) => FocusableElement;
  getLastChildInRow: (index: number) => FocusableElement;
  getNextElement: (
    parentEl: HTMLButtonElement | null,
    focusableEl: FocusableElement,
    currentFocusedList: FocusableElement[],
    currentKey?: KeyboardEvent["key"],
  ) => FocusableElement;
  getPreviousElement: (
    parentEl: HTMLButtonElement | null,
    focusableEl: FocusableElement,
    currentFocusedList: FocusableElement[],
    isListOpen: boolean,
    currentKey?: KeyboardEvent["key"],
  ) => FocusableElement;
  getNavigationArray: () => NavigationContextStoredValueProps[];
  getSubNavigation: (parentEl) => NavigationContextStoredValueProps[];
  handleFocusableFocus: (
    focusableEl: FocusableElement,
    closeOpenSiblings: (focusableEl: FocusableElement) => void,
  ) => void;
  // isTopRow: (parentEl: HTMLButtonElement | null) => boolean;
  registerNavItem: (
    navList: FocusableElement[],
    parentEl: HTMLButtonElement | null,
  ) => void;
  registerSubNav: (
    isListOpen: boolean,
    parentEl: HTMLButtonElement | null,
    dispatchChildClose: () => void,
  ) => void;
  setIsListOpen: (
    isListOpen: boolean,
    parentEl: HTMLButtonElement | null,
  ) => void;
  setListItems: (
    navList: FocusableElement[],
    parentEl: HTMLButtonElement | null,
  ) => void;
}

export interface NavigationContextValueProps
  extends NavigationContextStoredValueProps,
    NavigationContextReturnValueProps {}
