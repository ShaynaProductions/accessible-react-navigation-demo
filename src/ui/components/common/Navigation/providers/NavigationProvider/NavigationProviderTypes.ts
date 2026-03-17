import { ControllingElementType, FocusableElementType } from "../../utilities";

export type NavigationState = {
  navigationArray: NavigationObjectProps[];
  isComponentActive: boolean;
};

export interface NavigationContextStoredValueProps {
  data: {
    isSubListOpen: boolean;
    storedList?: FocusableElementType[];
    storedParentEl?: ControllingElementType;
  };
}

export type NavigationAction =
  | { type: "SET_IS_COMPONENT_ACTIVE"; isActive: boolean }
  | {
      type: "SET_IS_LIST_OPEN";
      parentEl: NavigationObjectProps["storedParentEl"];
      isListOpen: boolean;
    }
  | {
      type: "SET_LIST_ITEMS";
      parentEl: NavigationObjectProps["storedParentEl"];
      navigationList: NavigationObjectProps["storedList"];
    }
  | {
      type: "SET_PARENT";
      parentEl: NavigationObjectProps["storedParentEl"];
      isListOpen: boolean;
    };

export interface NavigationObjectProps {
  dispatchSubListClose?: VoidFunction;
  isSubListOpen: boolean;
  storedList: FocusableElementType[];
  storedParentEl: ControllingElementType;
}

export interface NavigationInternalProps {
  _dispatchSubListCloseByParent: React.RefObject<
    Map<ControllingElementType, VoidFunction>
  >;
}

export interface NavigationContextReturnValueProps {
  getNavigationArray: () => NavigationObjectProps[];
  isComponentActive: () => boolean;
  registerItemInNavigationArray: (
    navigationList: FocusableElementType[],
    parentEl: ControllingElementType,
  ) => void;
  registerButtonAsParent: (
    isListOpen: boolean,
    parentEl: ControllingElementType,
    dispatchSubListClose: VoidFunction,
  ) => void;
  setIsComponentActive: (isComponentActive: boolean) => void;
  setIsListOpen: (
    isListOpen: boolean,
    parentEl: ControllingElementType,
  ) => void;
  setListItems: (
    navigationList: FocusableElementType[],
    parentEl: ControllingElementType,
  ) => void;
}
