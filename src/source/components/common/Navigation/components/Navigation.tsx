import { NavigationProps } from "../NavigationTypes";
import { NavigationProvider } from "../providers/NavigationProvider";
import NavigationList from "./NavigationList";

import "../navigation.css";

export default function Navigation({
  children,
  cx,
  id,
  orientation = "vertical",
  parentRef,
  label,
}: NavigationProps) {
  return (
    <NavigationProvider
      value={{
        storedParentEl: parentRef?.current || null,
        storedList: [],
        isListOpen: true,
      }}
    >
      <nav aria-label={label} className={cx}>
        <NavigationList id={id} isOpen={true} orientation={orientation}>
          {children}
        </NavigationList>
      </nav>
    </NavigationProvider>
  );
}
