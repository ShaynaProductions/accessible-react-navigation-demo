import { use, useCallback } from "react";

import { returnTrueElementOrUndefined } from "@/source/utilities";
import { NavigationWrapperProps } from "../NavigationTypes";
import { NavigationContext } from "../providers";

export default function NavigationWrapper({
  children,
  cx,
  label,
  ...rest
}: NavigationWrapperProps) {
  const navigationContextObject = use(NavigationContext);
  const { getLastChildInRow } = returnTrueElementOrUndefined(
    !!navigationContextObject,
    navigationContextObject,
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLElement>) => {
      switch (event.key) {
        case "Escape":
          const nextFocus = getLastChildInRow(0);
          nextFocus.focus();
          break;
      }
    },
    [getLastChildInRow],
  );
  return (
    <>
      <nav
        aria-label={label}
        className={cx}
        onKeyDown={handleKeyDown}
        {...rest}
      >
        {children}
      </nav>
    </>
  );
}
