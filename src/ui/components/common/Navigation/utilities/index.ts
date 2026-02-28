import { FocusableElementType } from "./types";

export * from "./handleCommonKeyDown";
export * from "./renderedTestItems";
export * from "./transformNavigation";

export type { ControllingElementType, FocusableElementType } from "./types";

export const returnArray = (
  array?: FocusableElementType[] | [],
): FocusableElementType[] | [] => {
  /* istanbul ignore next */
  return array || [];
};
