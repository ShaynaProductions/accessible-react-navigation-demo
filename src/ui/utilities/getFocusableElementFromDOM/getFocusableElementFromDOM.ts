type DirectionType = "next" | "prev";

export type FocusableElement =
  | HTMLButtonElement
  | HTMLAnchorElement
  | HTMLInputElement
  | HTMLSelectElement
  | HTMLTextAreaElement;

export function getFocusableElementFromDOM(
  lastEl,
  direction: DirectionType,
): FocusableElement {
  //add all elements we want to include in our selection
  const focusable: string =
    'a:not([aria-disabled]), button:not([aria-disabled]), input[type=text]:not([aria-disabled]), select:not([aria-disabled]), textarea:not([aria-disabled]), [tabindex]:not([disabled]):not([tabindex="-1"])';

  const focusableElements = document.querySelectorAll(focusable);

  let index = -1,
    nextIndex;
  for (let i = 0; i < focusableElements.length; i += 1) {
    if (focusableElements[i] === lastEl) {
      index = i;
      break;
    }
  }
  if (direction === "next") {
    nextIndex = index + 1;
  } else {
    nextIndex = index - 1;
  }

  return focusableElements[nextIndex] as FocusableElement;
}
