import { use, useCallback } from "react";

import {
  ClickAwayListener,
  returnTrueElementOrUndefined,
} from "@/source/utilities";
import { NavigationWrapperProps } from "../NavigationTypes";
import { NavigationContext } from "../providers";

export default function NavigationWrapper({
  children,
  cx,
  label,
  parentEl,
  ...rest
}: NavigationWrapperProps) {
  const navigationContextObject = use(NavigationContext);
  const { getLastChildInRow, handleClickAwayClose } =
    returnTrueElementOrUndefined(
      !!navigationContextObject,
      navigationContextObject,
    );

  const handleClickAway = useCallback(() => {
    handleClickAwayClose();
  }, [handleClickAwayClose]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLElement>) => {
      switch (event.key) {
        case "Escape":
          if (parentEl) {
            parentEl.focus();
          } else {
            const nextFocus = getLastChildInRow(0);
            nextFocus.focus();
          }
          break;
      }
    },
    [getLastChildInRow, parentEl],
  );
  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <nav
        aria-label={label}
        className={cx}
        onKeyDown={handleKeyDown}
        {...rest}
      >
        {children}
      </nav>
    </ClickAwayListener>
  );
}
