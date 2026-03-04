export const _getRecursiveLastElementByParent = (
  focusableEl,
  _getNavigationObjectByListElement,
  _getNavigationObjectByParent,
) => {
  if (focusableEl.type === "button") {
    const { storedList } = _getNavigationObjectByParent(focusableEl);
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

export const _getRecursiveTopElementByElement = (
  focusableEl,
  _getNavigationObjectByListElement,
  isElementInTopRow,
) => {
  const { storedParentEl } = _getNavigationObjectByListElement(focusableEl);

  if (isElementInTopRow(storedParentEl)) {
    return storedParentEl;
  } else {
    return _getRecursiveTopElementByElement(
      storedParentEl,
      _getNavigationObjectByListElement,
      isElementInTopRow,
    );
  }
};
