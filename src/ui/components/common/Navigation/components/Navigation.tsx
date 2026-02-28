"use client";

import { useRef, type JSX } from "react";
import { NavigationListProps, NavigationProps } from "./NavigationTypes";
import NavigationList from "./NavigationList";
import { NavigationProvider, type NavigationContextStoredValueProps } from "../providers";

export default function Navigation({
  children,
  cx,
  isOpen = true,
  label,
  orientation = "horizontal",
  ...rest
}: NavigationProps): JSX.Element {
  const parentRef = useRef<HTMLButtonElement>(null);
  const navigationProps = {
    "aria-label": label,
    className: cx,
  };

  const navigationContextProps: NavigationContextStoredValueProps = {
    data: {
      isSubListOpen: isOpen,
      storedParentEl: null,
      storedList: [],
    },
  };

  const navigationListProps: NavigationListProps = {
    ...rest,
    isOpen,
    orientation,
    parentRef,
  };

  return (
    <>
      <NavigationProvider value={navigationContextProps}>
        <nav {...navigationProps}>
          <NavigationList {...navigationListProps}>{children}</NavigationList>
        </nav>
      </NavigationProvider>
    </>
  );
}
