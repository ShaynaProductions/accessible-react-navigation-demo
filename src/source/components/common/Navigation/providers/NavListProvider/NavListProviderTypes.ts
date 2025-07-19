import { RefObject } from "react";

export type FocusableElement = HTMLAnchorElement | HTMLButtonElement;

export interface DispatchNavAction {
  (actionType: number, item?: FocusableElement);
}

export type NavListContextValueProps = {
  parentRef?: RefObject<HTMLButtonElement | null>;
};
