import { FocusableElement } from "../../NavigationTypes";
import { NavigationContextStoredValueProps } from "@/source/components/common/Navigation/providers";

export interface UseNavigationReturnProps {
  closeOpenSiblings: (currentlyFocusedEl: FocusableElement) => void;
  getLastChildInRow: (index: number) => FocusableElement;
  getLastTopElement: (
    focusableEl: FocusableElement | null,
  ) => FocusableElement | undefined;

  getNextByButton: (
    parentEl: HTMLButtonElement | null,
    buttonEl: FocusableElement,
    currentFocusedList: FocusableElement[],
    currentKey?: KeyboardEvent["key"],
  ) => FocusableElement;
  getNextByLink: (
    parentEl: HTMLButtonElement | null,
    linkEl: FocusableElement,
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
  getSubNavigation: (parentEl) => NavigationContextStoredValueProps[];
  handleClickAwayClose: () => void;
  handleNavItemFocus: (
    focusableEl: FocusableElement,
    closeOpenSiblings: UseNavigationReturnProps["closeOpenSiblings"],
  ) => void;
}
