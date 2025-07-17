import { createContext, useCallback, useState } from "react";
import {
  DispatchNavAction,
  FocusableElement,
} from "@/source/components/common/Navigation/providers/NavListProvider/NavListProviderTypes";
import { ListActionTypes } from "@/source/components/common/Navigation/utilities";

export const NavListContext = createContext<
  | {
      currentListItems?: FocusableElement[];
      listDispatch?: DispatchNavAction;
    }
  | undefined
>({});

export default function NavListProvider({ children, value }) {
  const [currentListItems] = useState<FocusableElement[]>([]);
  const {} = value;
  const listDispatch: DispatchNavAction = useCallback(
    (actionType: number, item?: FocusableElement) => {
      switch (actionType) {
        case ListActionTypes.REGISTER:
          /* istanbul ignore else */
          if (item) {
            /* istanbul ignore else */
            if (currentListItems?.indexOf(item) === -1) {
              currentListItems.push(item);
            }
          }
          break;
      }
    },
    [currentListItems],
  );

  return (
    <NavListContext.Provider
      value={{
        currentListItems,
        listDispatch,
      }}
    >
      {children}
    </NavListContext.Provider>
  );
}

NavListProvider.context = NavListContext;
