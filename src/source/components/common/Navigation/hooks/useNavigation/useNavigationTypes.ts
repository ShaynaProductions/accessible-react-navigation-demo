import { FocusableElement } from "../../NavigationTypes";

export interface NavigationHookProps {
  closeOpenSiblings: (currentlyFocusedEl: FocusableElement) => void;
  isTopRow: (parentEl: HTMLButtonElement | null) => boolean;
}
