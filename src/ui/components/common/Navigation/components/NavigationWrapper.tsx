"use client";

import { useEffect } from "react";
import {
  OutsideEventListener,
  returnTrueElementOrUndefined,
} from "@/ui/utilities";
import { useNavigation } from "../hooks";
import { NavigationWrapperProps } from "@/ui/components/common/Navigation/components/NavigationTypes";

export function NavigationWrapper({
  children,
  controllingRef,
  cx,
  isOpen,
  label,
  ...rest
}: NavigationWrapperProps) {
  const {
    closeComponent,
    isComponentActive,
    isComponentControlled,
    setIsListOpen,
  } = useNavigation();

  useEffect(() => {
    /* istanbul ignore else */
    if (controllingRef?.current !== null) {
      if (!isOpen) {
        closeComponent();
      }
      setIsListOpen(isOpen, null);
    }
  });

  const navigationProps = {
    "aria-label": label,
    className: cx,
    ...rest,
  };

  const outsideElementListenerProps = {
    onOutsideEvent: returnTrueElementOrUndefined(
      isComponentActive(),
      closeComponent,
    ),
  };

  if (isComponentControlled()) {
    return <nav {...navigationProps}>{children}</nav>;
  } else {
    return (
      <OutsideEventListener {...outsideElementListenerProps}>
        <nav {...navigationProps}>{children}</nav>
      </OutsideEventListener>
    );
  }
}
