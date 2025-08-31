export * from "./constants";
export * from "./ClickAwayListener/";
export * from "./getFocusableElement";
export * from "./mergeRefs";
export * from "./returnTrueElementOrUndefined";

export const safeEventHandlerCall = (fn, arg) =>
  typeof fn === "function" ? fn(arg) : fn;
