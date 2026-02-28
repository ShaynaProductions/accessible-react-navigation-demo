"use client";

import { JSX } from "react";
import { NavigationListProps, NavigationProps } from "./NavigationTypes";
import NavigationList from "./NavigationList";

export default function Navigation({
  children,
  cx,
  isOpen = true,
  label,
  orientation = "horizontal",
  ...rest
}: NavigationProps): JSX.Element {
  const navigationProps = {
    "aria-label": label,
    className: cx,
  };

  const navigationListProps: NavigationListProps = {
    ...rest,
    isOpen,
    orientation,
  };

  return (
    <>
      <nav {...navigationProps}>
        <NavigationList {...navigationListProps}>{children}</NavigationList>
      </nav>
    </>
  );
}
