export * from "./returnTrueElementOrUndefined"


export const safeEventHandlerCall = (fn, arg) =>
    typeof fn === "function" ? fn(arg) : fn;
