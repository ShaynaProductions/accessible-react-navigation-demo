import { ControllingElementType, FocusableElementType } from "../../utilities";

export type NavigationState = {
  navigationArray: NavigationObjectProps[];
};

export interface NavigationContextStoredValueProps {
  data: {
    isSubListOpen: boolean;
    storedList?: FocusableElementType[];
    storedParentEl?: ControllingElementType;
  };
}

export type NavigationAction =
  | {
      type: "SET_PARENT";
      parentEl: NavigationObjectProps["storedParentEl"];
      isListOpen: boolean;
    }
  | {
      type: "SET_IS_LIST_OPEN";
      parentEl: NavigationObjectProps["storedParentEl"];
      isListOpen: boolean;
    }
  | {
      type: "SET_LIST_ITEMS";
      parentEl: NavigationObjectProps["storedParentEl"];
      navigationList: NavigationObjectProps["storedList"];
    };

export interface NavigationObjectProps {
  storedList: FocusableElementType[];
  storedParentEl: ControllingElementType;
  isSubListOpen: boolean;
}

export interface NavigationContextReturnValueProps {
  registerItemInNavigationArray: (
    navigationList: FocusableElementType[],
    parentEl: ControllingElementType,
  ) => void;
  registerButtonAsParent: (
    isListOpen: boolean,
    parentEl: ControllingElementType,
  ) => void;
  setIsListOpen: (
    isListOpen: boolean,
    parentEl: ControllingElementType,
  ) => void;
  setListItems: (
    navigationList: FocusableElementType[],
    parentEl: ControllingElementType,
  ) => void;
}

// export interface NavigationContextValueProps
//   extends
//     NavigationContextStoredValueProps,
//     NavigationContextReturnValueProps {}
