"use client";
import { use } from "react";
import { returnTrueElementOrUndefined } from "@/ui/utilities";
import { NavigationContext } from "../../providers/";
import type { UseNavigationReturnTypes } from "./useNavigationTypes";

export function useNavigation() {
  const navigationContextObj = use(NavigationContext);
  const {
    registerItemInNavigationArray,
    registerButtonAsParent,
    setIsListOpen,
    setListItems,
  }: UseNavigationReturnTypes = returnTrueElementOrUndefined(
    !!navigationContextObj,
    navigationContextObj,
  );

  return {
    registerItemInNavigationArray,
    registerButtonAsParent,
    setIsListOpen,
    setListItems,
  };
}
