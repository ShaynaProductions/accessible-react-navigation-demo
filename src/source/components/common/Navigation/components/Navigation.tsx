import { NavigationProps } from "../NavigationTypes";
import { NavigationProvider } from "../providers/NavigationProvider";
import NavigationList from "./NavigationList";
import NavigationWrapper from "./NavigationWrapper";

import "../navigation.css";

export default function Navigation({
  children,
  id,
  orientation = "vertical",
  parentRef,
  testId,
  ...rest
}: NavigationProps) {
  return (
    <NavigationProvider
      value={{
        storedParentEl: parentRef?.current || null,
        storedList: [],
        isListOpen: true,
      }}
    >
      <NavigationWrapper {...rest}>
        <NavigationList
          id={id}
          isOpen={true}
          orientation={orientation}
          testId={testId}
        >
          {children}
        </NavigationList>
      </NavigationWrapper>
    </NavigationProvider>
  );
}
