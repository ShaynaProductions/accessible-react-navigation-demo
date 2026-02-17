export { sanitizeUrl } from "@braintree/sanitize-url";
export * from "./returnTrueElementOrUndefined"


export const safeEventHandlerCall = (fn, arg) =>
    typeof fn === "function" ? fn(arg) : fn;
