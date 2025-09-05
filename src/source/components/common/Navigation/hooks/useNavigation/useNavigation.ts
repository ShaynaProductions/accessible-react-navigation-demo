import { use, useCallback } from "react";
import {
  getFocusableElement,
  returnTrueElementOrUndefined,
} from "@/source/utilities";
import { UseNavigationReturnProps } from "./NavigationHookTypes";
import {
  NavigationContext,
  NavigationContextStoredValueProps,
} from "../../providers";
import { FocusableElement } from "../../NavigationTypes";

export default function useNavigation(): UseNavigationReturnProps {
  const navigationContextObj = use(NavigationContext);
  const { componentActive, getNavigationArray, setComponentActive } =
    returnTrueElementOrUndefined(!!navigationContextObj, navigationContextObj);

  /* Public Foundational Functions */
  const getLastChildInRow: UseNavigationReturnProps["getLastChildInRow"] =
    useCallback(
      (index: number) => {
        /* istanbul ignore next */
        const currentList = getNavigationArray()[index].storedList || [];
        return currentList[currentList.length - 1];
      },
      [getNavigationArray],
    );

  /* Private Functions (dependent on Public Foundational */
  const _getIndexInTopRow = useCallback(
    (focusedElement: FocusableElement): number => {
      const topRow = getNavigationArray()[0];
      return topRow.storedList?.indexOf(focusedElement) as number;
    },
    [getNavigationArray],
  );
  const _getNavObjectContainingElement = useCallback(
    (focusableElement: FocusableElement): NavigationContextStoredValueProps => {
      let returnObj: NavigationContextStoredValueProps = {};
      for (const navObject of getNavigationArray()) {
        /* istanbul ignore next */
        const storedList = navObject.storedList || [];
        /* istanbul ignore else */
        if (
          storedList.length > 0 &&
          storedList.indexOf(focusableElement) > -1
        ) {
          returnObj = navObject;
          break;
        }
      }
      return returnObj;
    },
    [getNavigationArray],
  );

  const _getNavObjectByParent = useCallback(
    (
      parentElement: HTMLButtonElement | null,
    ): NavigationContextStoredValueProps => {
      let returnObj: NavigationContextStoredValueProps = {};
      const navArray = getNavigationArray();
      for (const navObject of navArray) {
        const { storedParentEl } = navObject;
        /* istanbul ignore else */
        if (storedParentEl === parentElement) {
          returnObj = navObject;
          break;
        }
      }
      return returnObj;
    },
    [getNavigationArray],
  );
  const _getTopParent = useCallback(
    (
      navObject: NavigationContextStoredValueProps,
    ): HTMLButtonElement | null => {
      const { storedParentEl } = navObject;
      const indexInTopRow = _getIndexInTopRow(
        storedParentEl as FocusableElement,
      );
      if (storedParentEl && indexInTopRow < 0) {
        const nextNavObject = _getNavObjectContainingElement(storedParentEl);

        return _getTopParent(nextNavObject);
      } else {
        return storedParentEl as HTMLButtonElement | null;
      }
    },
    [_getNavObjectContainingElement, _getIndexInTopRow],
  );

  const _closeAll = useCallback(() => {
    const childList: FocusableElement[] =
      getNavigationArray()[0].storedList || [];

    for (const childEl of childList) {
      if (childEl.type === "button") {
        const { isListOpen, dispatchChildClose } = _getNavObjectByParent(
          childEl as HTMLButtonElement,
        );
        if (isListOpen && dispatchChildClose) {
          dispatchChildClose(childEl as HTMLButtonElement);
        }
      }
    }
  }, [_getNavObjectByParent, getNavigationArray]);

  const _closeParentComponent = useCallback(
    (navObject: NavigationContextStoredValueProps) => {
      const topLevelParent = _getTopParent(navObject);
      const { dispatchChildClose } = _getNavObjectByParent(topLevelParent);
      if (dispatchChildClose && topLevelParent !== null) {
        dispatchChildClose(topLevelParent);
      }
    },
    [_getTopParent, _getNavObjectByParent],
  );

  const _getLastElementByParent = useCallback(
    (navObject: NavigationContextStoredValueProps) => {
      /* istanbul ignore next */
      const { storedList = [] } = navObject;
      const lastIndex = storedList.length - 1;
      /* istanbul ignore if */
      if (storedList[lastIndex].type === "button") {
        return _getLastElementByParent(
          _getNavObjectByParent(
            storedList[lastIndex] as HTMLButtonElement | null,
          ),
        );
      } else {
        return storedList[lastIndex];
      }
    },
    [_getNavObjectByParent],
  );

  const _getLastElementOpenByParent = useCallback(
    (navObject: NavigationContextStoredValueProps): FocusableElement => {
      /* istanbul ignore next */
      const { storedParentEl } = navObject;

      return storedParentEl as FocusableElement;
    },
    [],
  );
  /* istanbul ignore next */
  const _getLastFocusableElementByParent = useCallback(
    (focusableEl: FocusableElement) => {
      let navObj: NavigationContextStoredValueProps;
      if (focusableEl.type === "button") {
        navObj = _getNavObjectByParent(focusableEl as HTMLButtonElement | null);
      } else {
        navObj = _getNavObjectContainingElement(focusableEl);
      }
      const currentList = navObj.storedList || [];
      const listLength = currentList.length;

      if (currentList[listLength - 1].type === "button") {
        return _getLastFocusableElementByParent(currentList[listLength - 1]);
      } else {
        return currentList[listLength - 1];
      }
    },
    [_getNavObjectByParent, _getNavObjectContainingElement],
  );

  const _getNextElementInRow = useCallback(
    (focusableEl: FocusableElement, currentList: FocusableElement[]) => {
      let newIndex: number;

      const currentIndex = currentList.indexOf(focusableEl);

      newIndex = currentIndex + 1;

      if (newIndex < 0 || newIndex >= currentList.length) {
        newIndex = 0;
      }
      return currentList[newIndex];
    },
    [],
  );

  const _getPreviousElementInRow = useCallback(
    (focusableEl: FocusableElement, currentList: FocusableElement[]) => {
      let newIndex: number;
      const currentIndex = currentList.indexOf(focusableEl);
      newIndex = currentIndex - 1;
      if (newIndex < 0) {
        newIndex = currentList.length - 1;
      }
      return currentList[newIndex];
    },
    [],
  );

  const _IsFirstOrLastItem = useCallback(
    (focusableEl: FocusableElement): boolean => {
      let isFirstOrLastItem = false;
      /* istanbul ignore next */
      const topList = getNavigationArray()[0].storedList || [];
      const firstEl = topList[0];
      const lastTopEl = getLastChildInRow(0);
      const lastEl = _getLastFocusableElementByParent(lastTopEl);

      if (focusableEl?.type !== "button" && focusableEl === lastTopEl) {
        isFirstOrLastItem = true;
      } else if (focusableEl === firstEl || focusableEl === lastEl) {
        isFirstOrLastItem = true;
      }

      return isFirstOrLastItem;
    },
    [_getLastFocusableElementByParent, getLastChildInRow, getNavigationArray],
  );

  const _isInTopRow = useCallback(
    (parentEl: HTMLButtonElement | null): boolean => {
      const topRowParent = getNavigationArray()[0].storedParentEl;
      return topRowParent === parentEl;
    },
    [getNavigationArray],
  );

  /* Public use */
  const closeOpenSiblings = useCallback(
    // currently passed through to hook.
    (currentlyFocusedEl: FocusableElement) => {
      /* istanbul ignore next */
      const childList: FocusableElement[] =
        getNavigationArray()[0].storedList || [];

      for (const childEl of childList) {
        if (childEl !== currentlyFocusedEl && childEl.type === "button") {
          const { isListOpen, dispatchChildClose } = _getNavObjectByParent(
            childEl as HTMLButtonElement,
          );
          if (isListOpen && dispatchChildClose) {
            dispatchChildClose(childEl as HTMLButtonElement);
          }
        }
      }
    },
    [_getNavObjectByParent, getNavigationArray],
  );

  const getLastTopElement: UseNavigationReturnProps["getLastTopElement"] =
    useCallback(
      (focusableEl) => {
        const lastTopEl = getLastChildInRow(0);
        const lastEl = _getLastFocusableElementByParent(lastTopEl);
        if (focusableEl === lastEl && !componentActive) {
          setComponentActive(true);
          return lastTopEl;
        }
      },
      [
        getLastChildInRow,
        _getLastFocusableElementByParent,
        componentActive,
        setComponentActive,
      ],
    );

  const getNextByButton: UseNavigationReturnProps["getNextByButton"] =
    useCallback(
      (parentEl, buttonEl, currentFocusedList, currentKey) => {
        let nextFocusableElement: FocusableElement = _getNextElementInRow(
          buttonEl,
          currentFocusedList,
        );
        const currentNavObject = _getNavObjectByParent(
          buttonEl as HTMLButtonElement,
        );
        const { isListOpen, storedList } = currentNavObject;
        const isSubListOpen = isListOpen;
        /* istanbul ignore next */
        const subNavigation = storedList || [];

        if (isSubListOpen && subNavigation.length > 0) {
          nextFocusableElement = subNavigation[0];
        }
        if (
          !isSubListOpen &&
          currentFocusedList.indexOf(buttonEl) ===
            currentFocusedList.length - 1 &&
          currentKey === "Tab"
        ) {
          nextFocusableElement = getFocusableElement(
            _getLastElementByParent(currentNavObject),
            "next",
          ) as FocusableElement;
          setComponentActive(false);
        }
        if (currentKey === "ArrowRight" && _isInTopRow(parentEl)) {
          nextFocusableElement = _getNextElementInRow(
            buttonEl,
            currentFocusedList,
          );
        }
        return nextFocusableElement;
      },
      [
        _getNextElementInRow,
        _getNavObjectByParent,
        _isInTopRow,
        _getLastElementByParent,
        setComponentActive,
      ],
    );
  const getNextByLink: UseNavigationReturnProps["getNextByLink"] = useCallback(
    (parentEl, linkEl, currentFocusedList, currentKey) => {
      const isTopRow = _isInTopRow(parentEl);
      const parentNavObject = _getNavObjectContainingElement(linkEl);
      const lastElement = _getLastElementByParent(parentNavObject);
      let nextFocusableElement: FocusableElement = _getNextElementInRow(
        linkEl,
        currentFocusedList,
      );
      if (linkEl === lastElement) {
        if (currentKey === "Tab") {
          nextFocusableElement = getFocusableElement(
            lastElement,
            "next",
          ) as FocusableElement;
          setComponentActive(false);

          _closeParentComponent(parentNavObject);
        } else {
          if (!isTopRow) {
            nextFocusableElement = _getTopParent(
              parentNavObject,
            ) as FocusableElement;
          }
        }
      }
      return nextFocusableElement;
    },
    [
      _closeParentComponent,
      _getLastElementByParent,
      _getNavObjectContainingElement,
      _getNextElementInRow,
      _getTopParent,
      _isInTopRow,
      setComponentActive,
    ],
  );

  const getPreviousElement: UseNavigationReturnProps["getPreviousElement"] =
    useCallback(
      (
        parentEl,
        focusableEl,
        currentFocusedList,
        isListOpen,
        currentKey,
      ): FocusableElement => {
        const isTopRow = _isInTopRow(parentEl);
        /* istanbul ignore next */
        const topList = getNavigationArray()[0].storedList || [];
        const currentlyFocusedIndex = currentFocusedList.indexOf(focusableEl);

        let prevFocusableElement = _getPreviousElementInRow(
          focusableEl,
          currentFocusedList,
        );

        if (isTopRow) {
          /* istanbul ignore else */
          if (currentlyFocusedIndex >= 0) {
            if (prevFocusableElement.type === "button") {
              const parentNavObj = _getNavObjectByParent(
                prevFocusableElement as HTMLButtonElement | null,
              );
              prevFocusableElement = _getLastElementOpenByParent(parentNavObj);
            }
          }

          if (currentKey === "Tab") {
            if (focusableEl === topList[0]) {
              prevFocusableElement = getFocusableElement(
                focusableEl,
                "prev",
              ) as FocusableElement;
              setComponentActive(false);
            }
          }
        } else {
          // !isTopRow
          if (isListOpen && currentlyFocusedIndex === 0) {
            prevFocusableElement = parentEl as FocusableElement;
          }
        }

        return prevFocusableElement;
      },
      [
        _getLastElementOpenByParent,
        _getNavObjectByParent,
        getNavigationArray,
        _getPreviousElementInRow,
        _isInTopRow,
        setComponentActive,
      ],
    );

  const getSubNavigation: UseNavigationReturnProps["getSubNavigation"] =
    useCallback(
      (parentEl) => {
        const subNavListItems: NavigationContextStoredValueProps[] = [];
        const currentNavObject = _getNavObjectByParent(parentEl);
        const currentList = currentNavObject.storedList;
        /* istanbul ignore else */
        if (currentList) {
          for (const currentItem of currentList) {
            if (currentItem.type === "button") {
              subNavListItems.push(
                _getNavObjectByParent(currentItem as HTMLButtonElement | null),
              );
            }
          }
        }
        return subNavListItems;
      },
      [_getNavObjectByParent],
    );

  const handleClickAwayClose = useCallback(() => {
    _closeAll();
    setComponentActive(false);
  }, [_closeAll, setComponentActive]);

  const handleNavItemFocus: UseNavigationReturnProps["handleNavItemFocus"] =
    useCallback(
      (focusableEl, closeOpenSiblings) => {
        if (_getIndexInTopRow(focusableEl) !== -1) {
          closeOpenSiblings(focusableEl);
        }

        if (!componentActive && _IsFirstOrLastItem(focusableEl)) {
          setComponentActive(true);
        }
      },
      [
        _getIndexInTopRow,
        componentActive,
        _IsFirstOrLastItem,
        setComponentActive,
      ],
    );

  return {
    closeOpenSiblings,
    getLastChildInRow,
    getLastTopElement,
    getNextByButton,
    getNextByLink,
    getPreviousElement,
    getSubNavigation,
    handleClickAwayClose,
    handleNavItemFocus,
  };
}
