"use client";

import { ControllingElementType, FocusableElementType } from "../../utilities";
import { UseNavigationInternalTypes } from "./useNavigationTypes";

export const _getRecursiveLastElementByParent: UseNavigationInternalTypes["_getRecursiveLastElementByParent"] =
  (
    focusableEl,
    _getNavigationObjectByListElement,
    _getNavigationObjectByParent,
  ) => {
    if (focusableEl.type === "button") {
      const { storedList } = _getNavigationObjectByParent(
        focusableEl as ControllingElementType,
      );
      return _getRecursiveLastElementByParent(
        storedList[storedList.length - 1],
        _getNavigationObjectByListElement,
        _getNavigationObjectByParent,
      );
    } else {
      const { storedList } = _getNavigationObjectByListElement(focusableEl);
      return storedList[storedList.length - 1];
    }
  };

export const _getRecursiveTopElementByElement: UseNavigationInternalTypes["_getRecursiveTopElementByElement"] =
  (focusableEl, _getNavigationObjectByListElement, isElementInTopRow) => {
    const { storedParentEl } = _getNavigationObjectByListElement(focusableEl);

    if (!!storedParentEl && isElementInTopRow(storedParentEl)) {
      return storedParentEl;
    } else {
      return _getRecursiveTopElementByElement(
        storedParentEl as FocusableElementType,
        _getNavigationObjectByListElement,
        isElementInTopRow,
      );
    }
  };
