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
