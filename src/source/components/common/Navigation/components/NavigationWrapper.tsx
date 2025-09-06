import React, { useCallback } from "react";

import { ClickAwayListener } from "@/source/utilities";
import { NavigationWrapperProps } from "../NavigationTypes";
import { useNavigation } from "../hooks";

export default function NavigationWrapper({
  children,
  cx,
  label,
  parentEl,
  ...rest
}: NavigationWrapperProps) {
  const { getLastChildInRow, handleClickAwayClose } = useNavigation();

  const handleClickAway = useCallback(() => {
    handleClickAwayClose();
  }, [handleClickAwayClose]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLElement>) => {
      switch (event.key) {
        case "Escape":
          /* istanbul ignore if */
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
