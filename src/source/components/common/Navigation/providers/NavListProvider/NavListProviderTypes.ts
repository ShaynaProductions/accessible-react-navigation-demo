import React from "react";
import { FocusableElement } from "../../NavigationTypes";

export interface DispatchNavAction {
  (actionType: number, item?: FocusableElement);
}

export interface NavListContextStoredValueProps {
  isListOpen?: boolean;
  parentRef?: React.RefObject<HTMLButtonElement | null>;
}

export interface NavListContextReturnValueProps {
  currentListItems?: FocusableElement[];
  isListOpen?: boolean;
  listDispatch?: DispatchNavAction;
  parentRef?: React.RefObject<HTMLButtonElement | null>;
}

export interface NavListContextValueProps
  extends NavListContextReturnValueProps,
    DispatchNavAction {}
