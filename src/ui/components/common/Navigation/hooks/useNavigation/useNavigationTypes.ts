import { NavigationContextReturnValueProps } from "@/ui/components/common/Navigation/providers/NavigationProvider";

export interface UseNavigationReturnTypes {
  registerItemInNavigationArray: NavigationContextReturnValueProps["registerItemInNavigationArray"];
  registerButtonAsParent: NavigationContextReturnValueProps["registerButtonAsParent"];
  setIsListOpen: NavigationContextReturnValueProps["setIsListOpen"];
  setListItems: NavigationContextReturnValueProps["setListItems"];
}
