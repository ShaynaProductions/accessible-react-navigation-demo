"use client";

import {
  OutsideEventListener,
  returnTrueElementOrUndefined,
} from "@/ui/utilities";
import { useNavigation } from "../hooks";
import { NavigationWrapperProps } from "@/ui/components/common/Navigation/components/NavigationTypes";

export function NavigationWrapper({
  children,
  cx,
  label,
  ...rest
}: NavigationWrapperProps) {
  const { closeComponent, isComponentActive } = useNavigation();

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

  return (
    <OutsideEventListener {...outsideElementListenerProps}>
      <nav {...navigationProps}>{children}</nav>
    </OutsideEventListener>
  );
}
