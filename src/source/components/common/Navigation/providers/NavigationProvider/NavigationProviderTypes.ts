import { JSX } from "react";
import { FocusableElement } from "../../NavigationTypes";

export interface NavigationProviderProps {
  children: JSX.Element;
  value: NavigationContextStoredValueProps;
}

export interface NavigationContextStoredValueProps {
  isListOpen?: boolean;
  storedList?: FocusableElement[];
  storedParentEl?: HTMLButtonElement | null;
}

export interface NavigationContextReturnValueProps {
  registerNavItem: (
    navList: FocusableElement[],
    parentEl: HTMLButtonElement | null,
  ) => void;
  registerSubNav: (
    isListOpen: boolean,
    navList: FocusableElement[],
    parentEl: HTMLButtonElement | null,
  ) => void;
  setIsListOpen: (isListOpen: boolean, parentEl: HTMLButtonElement) => void;
  setListItems: (
    navList: FocusableElement[],
    parentEl: HTMLButtonElement | null,
  ) => void;
}

export interface NavigationContextValueProps
  extends NavigationContextStoredValueProps,
    NavigationContextReturnValueProps {}
