"use client";
import { use, useCallback, useState } from "react";
import {
  getFocusableElementFromDOM,
  returnTrueElementOrUndefined,
} from "@/ui/utilities";
import { NavigationContext } from "../../providers/";
import type {
  ControllingElementType,
  FocusableElementType,
} from "../../utilities";
import {
  _getRecursiveLastElementByParent,
  _getRecursiveTopElementByElement,
} from "./hookFunctions";
import type {
  UseNavigationInternalTypes,
  UseNavigationReturnTypes,
} from "./useNavigationTypes";

export function useNavigation() {
  const navigationContextObj = use(NavigationContext);
  const {
    getNavigationArray,
    registerItemInNavigationArray,
    registerButtonAsParent,
    setIsListOpen,
    setListItems,
  } = returnTrueElementOrUndefined(
    !!navigationContextObj,
    navigationContextObj,
  );

  const [lastComponentElement, setLastComponentElement] =
    useState<FocusableElementType | null>(null);

  const _getNavigationObjectByListElement: UseNavigationInternalTypes["_getNavigationObjectByListElement"] =
    useCallback(
      (focusedEl) => {
        return getNavigationArray().find(({ storedList }) =>
          storedList.includes(focusedEl),
        );
      },
      [getNavigationArray],
    );

  const _getNavigationObjectByParent: UseNavigationInternalTypes["_getNavigationObjectByParent"] =
    useCallback(
      (parentEl) => {
        return getNavigationArray().find(
          ({ storedParentEl }) => storedParentEl === parentEl,
        );
      },
      [getNavigationArray],
    );

  const _getIndexInTopRow: UseNavigationInternalTypes["_getIndexInTopRow"] =
    useCallback(
      (focusedEl) => {
        const { storedList } = getNavigationArray()[0];
        return storedList.indexOf(focusedEl);
      },
      [getNavigationArray],
    );

  const _getFirstElementInIndexedList: UseNavigationInternalTypes["_getFirstElementInIndexedList"] =
    useCallback(
      (index) => {
        return getNavigationArray()[index].storedList[0];
      },
      [getNavigationArray],
    );

  const _getLastElementInIndexedList: UseNavigationInternalTypes["_getLastElementInIndexedList"] =
    useCallback(
      (index) => {
        const { storedList } = getNavigationArray()[index];
        return storedList[storedList.length - 1];
      },
      [getNavigationArray],
    );

  const _getLastElementByParent: UseNavigationInternalTypes["_getLastElementByParent"] =
    useCallback(
      (parentEl) => {
        return _getRecursiveLastElementByParent(
          parentEl,
          _getNavigationObjectByListElement,
          _getNavigationObjectByParent,
        );
      },
      [_getNavigationObjectByListElement, _getNavigationObjectByParent],
    );

  const _getLastElementInComponent: UseNavigationInternalTypes["_getLastElementInComponent"] =
    useCallback(() => {
      let lastEl = lastComponentElement;
      if (!lastEl) {
        const lastElement = _getLastElementInIndexedList(0);
        if (lastElement.type === "button") {
          lastEl = _getLastElementByParent(
            lastElement as ControllingElementType,
          );
        } else {
          lastEl = lastElement;
        }
        setLastComponentElement(lastEl);
      }
      return lastEl;
    }, [
      _getLastElementByParent,
      _getLastElementInIndexedList,
      lastComponentElement,
    ]);

  const _getLastElementInTopRow: UseNavigationInternalTypes["_getLastElementInTopRow"] =
    (focusedEl) => {
      const lastTopEl = _getLastElementInIndexedList(0);
      /* istanbul ignore else */
      if (lastTopEl.type === "button") {
        const lastEl = _getLastElementByParent(
          lastTopEl as ControllingElementType,
        );
        /* istanbul ignore else */
        if (focusedEl === lastEl) {
          return lastTopEl;
        }
      }
    };

  const _isElementInTopRow: UseNavigationInternalTypes["_isElementInTopRow"] = (
    focusedEl,
  ) => {
    return _getIndexInTopRow(focusedEl) >= 0;
  };

  const _getTopRowElement: UseNavigationInternalTypes["_getTopRowElement"] = (
    focusedEl,
  ) => {
    return _getRecursiveTopElementByElement(
      focusedEl,
      _getNavigationObjectByListElement,
      _isElementInTopRow,
    );
  };

  const _getParentByElement: UseNavigationInternalTypes["_getParentByElement"] =
    (focusedEl) => {
      const { storedParentEl } = _getNavigationObjectByListElement(focusedEl);
      return storedParentEl;
    };

  const _isLastElementInComponent = (focusedEl) => {
    return focusedEl === _getLastElementInComponent();
  };

  const _isLastElementInCurrentList: UseNavigationInternalTypes["_isLastElementInCurrentList"] =
    (focusedEl) => {
      const { storedList } = _getNavigationObjectByListElement(focusedEl);
      return storedList.indexOf(focusedEl) === storedList.length - 1;
    };

  const _isLastElementInTopList: UseNavigationInternalTypes["_isLastElementInTopList"] =
    (focusedEl) => {
      const topRowParent = _getTopRowElement(focusedEl);
      const lastListElement = _getLastElementByParent(
        topRowParent as ControllingElementType,
      );
      return focusedEl === lastListElement;
    };

  const _getNextElementInList: UseNavigationInternalTypes["_getNextElementInList"] =
    (focusedEl, currentList) => {
      const nextIndex = currentList.indexOf(focusedEl) + 1;
      return currentList[nextIndex];
    };

  const _getPreviousElementInList: UseNavigationInternalTypes["_getPreviousElementInList"] =
    (focusedEl, currentList) => {
      const previousIndex = currentList.indexOf(focusedEl) - 1;
      return currentList[previousIndex];
    };

  const _getPreviousByElement: UseNavigationInternalTypes["_getPreviousByElement"] =
    (focusedEl) => {
      const { storedList, storedParentEl } =
        _getNavigationObjectByListElement(focusedEl);

      // default to previous item in list
      let focusableEl = _getPreviousElementInList(focusedEl, storedList);

      const isInTopRow = _isElementInTopRow(focusedEl);

      // not on the top row and first child in its list.
      if (!isInTopRow && storedList.indexOf(focusedEl) === 0) {
        focusableEl = storedParentEl as FocusableElementType;
      }
      if (!isInTopRow || focusedEl !== _getFirstElementInIndexedList(0)) {
        return focusableEl;
      }
    };

  const _handleLastChildFocus = (focusedEl) => {
    const { isSubListOpen } = _getNavigationObjectByListElement(focusedEl);
    if (!isSubListOpen) {
      return _getLastElementInTopRow(focusedEl);
    } else {
      return focusedEl;
    }
  };

  /* Controllers */

  const getNextByButton: UseNavigationReturnTypes["getNextByButton"] = (
    buttonEl,
    isSubListOpen,
  ) => {
    const { storedList: currentList } =
      _getNavigationObjectByListElement(buttonEl);
    // default to next item in list
    let focusableEl = _getNextElementInList(buttonEl, currentList);

    if (isSubListOpen) {
      const currentNavObject = _getNavigationObjectByParent(buttonEl);
      const { storedList: subNavigationList } = currentNavObject;
      // move into sublists first child
      /* istanbul ignore else */
      focusableEl = subNavigationList[0];
    } else if (currentList.indexOf(buttonEl) === currentList.length - 1) {
      // last focusable element and sublist is collapsed. Set to parent;
      focusableEl = _getParentByElement(buttonEl) as FocusableElementType;
    }

    return focusableEl;
  };

  const getNextByLink: UseNavigationReturnTypes["getNextByLink"] = (linkEl) => {
    const { storedParentEl, storedList } =
      _getNavigationObjectByListElement(linkEl);

    // default to next item in list
    let focusableEl = _getNextElementInList(linkEl, storedList);

    // is Link the last element in the current list and not in the top row?
    if (
      storedList.indexOf(linkEl) === storedList.length - 1 &&
      storedParentEl !== null
    ) {
      const isLinkLast = _isLastElementInCurrentList(linkEl);
      const isParentInTopRow = _isElementInTopRow(storedParentEl);
      const isParentLast = _isLastElementInCurrentList(storedParentEl);

      if (isParentInTopRow) {
        focusableEl = storedParentEl;
      } else if (isParentLast && isLinkLast) {
        focusableEl = _getTopRowElement(linkEl);
      } else {
        // focus goes to Parent's next sibling
        const parentNavObject =
          _getNavigationObjectByListElement(storedParentEl);
        const { storedList: parentList } = parentNavObject;
        focusableEl = _getNextElementInList(storedParentEl, parentList);
      }
    }

    return focusableEl;
  };

  const getNextByTabButton: UseNavigationReturnTypes["getNextByTabButton"] = (
    buttonEl,
    isSubListOpen,
  ) => {
    let focusableEl = getNextByButton(buttonEl, isSubListOpen);

    const { storedList } = _getNavigationObjectByListElement(buttonEl);

    if (
      !isSubListOpen &&
      storedList.indexOf(buttonEl) === storedList.length - 1
    ) {
      const lastEl = _getLastElementByParent(buttonEl);

      focusableEl = getFocusableElementFromDOM(
        lastEl,
        "next",
      ) as FocusableElementType;
    }

    return focusableEl;
  };

  const getNextByTabLink: UseNavigationReturnTypes["getNextByTabLink"] = (
    linkEl,
  ) => {
    let focusableEl = getNextByLink(linkEl);

    const isInTopRow = _isElementInTopRow(linkEl);

    if (
      (isInTopRow && !focusableEl) ||
      (!isInTopRow && _isLastElementInTopList(linkEl))
    ) {
      focusableEl = getFocusableElementFromDOM(
        linkEl,
        "next",
      ) as FocusableElementType;
    }

    return focusableEl;
  };

  const getPreviousByButton: UseNavigationReturnTypes["getPreviousByButton"] = (
    buttonEl,
  ) => {
    return _getPreviousByElement(buttonEl);
  };

  const getPreviousByLink: UseNavigationReturnTypes["getPreviousByLink"] = (
    linkEl,
  ) => {
    const isButton = (focusableEl: FocusableElementType) => {
      return focusableEl?.type === "button";
    };

    let focusableEl = _getPreviousByElement(linkEl) as FocusableElementType;
    if (isButton(focusableEl)) {
      const { isSubListOpen, storedList } = _getNavigationObjectByParent(
        focusableEl as ControllingElementType,
      );
      if (isSubListOpen && storedList.indexOf(linkEl) < 0) {
        focusableEl = storedList[storedList.length - 1];
      }
    }
    return focusableEl;
  };

  const getPreviousByTabButton: UseNavigationReturnTypes["getPreviousByTabButton"] =
    (buttonEl) => {
      let focusableEl = getPreviousByButton(buttonEl);
      if (_isElementInTopRow(buttonEl)) {
        const { storedList } = _getNavigationObjectByListElement(buttonEl);
        if (storedList.indexOf(buttonEl) === 0) {
          focusableEl = getFocusableElementFromDOM(
            buttonEl,
            "prev",
          ) as FocusableElementType;
        }
      }
      return focusableEl;
    };

  const getPreviousByTabLink: UseNavigationReturnTypes["getPreviousByTabLink"] =
    (linkEl) => {
      let focusableEl = getPreviousByLink(linkEl);
      if (_isElementInTopRow(linkEl)) {
        const { storedList } = _getNavigationObjectByListElement(linkEl);
        if (storedList.indexOf(linkEl) === 0) {
          focusableEl = getFocusableElementFromDOM(
            linkEl,
            "prev",
          ) as FocusableElementType;
        } else {
          focusableEl = _getPreviousElementInList(linkEl, storedList);
        }
      }
      return focusableEl;
    };

  const handleLinkFocus = (linkEl) => {
    if (_isLastElementInComponent(linkEl)) {
      return _handleLastChildFocus(linkEl);
    }
  };

  return {
    getNextByButton,
    getNextByLink,
    getNextByTabButton,
    getNextByTabLink,
    getPreviousByButton,
    getPreviousByLink,
    getPreviousByTabButton,
    getPreviousByTabLink,
    handleLinkFocus,
    registerItemInNavigationArray,
    registerButtonAsParent,
    setIsListOpen,
    setListItems,
  };
}
