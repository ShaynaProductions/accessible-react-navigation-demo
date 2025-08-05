import { FocusableElement } from "../../NavigationTypes";

export interface NavigationContextStoredValueProps {
  isListOpen?: boolean;
  storedList?: FocusableElement[];
  storedParentEl?: HTMLButtonElement | null;
}

export interface NavigationContextReturnValueProps {
  getFirstChildElement: (
    parentEl: HTMLButtonElement | null,
  ) => FocusableElement;
  getNextElement: (
    parentEl: HTMLButtonElement | null,
    focusableEl: FocusableElement,
    currentFocusedList: FocusableElement[],
    isListOpen: boolean,
    currentKey?: KeyboardEvent["key"],
  ) => FocusableElement;
  getPreviousElement: (
    parentEl: HTMLButtonElement | null,
    focusableEl: FocusableElement,
    currentFocusedList: FocusableElement[],
    isListOpen: boolean,
    currentKey?: KeyboardEvent["key"],
  ) => FocusableElement;
  registerNavItem: (
    navList: FocusableElement[],
    parentEl: HTMLButtonElement | null,
  ) => void;
  registerSubNav: (
    isListOpen: boolean,
    parentEl: HTMLButtonElement | null,
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
