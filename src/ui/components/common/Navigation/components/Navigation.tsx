"use client";

import { useRef, type JSX } from "react";
import {
  NavigationProvider,
  type NavigationContextStoredValueProps,
} from "../providers";
import { NavigationListProps, NavigationProps } from "./NavigationTypes";
import NavigationList from "./NavigationList";
import { NavigationWrapper } from "./NavigationWrapper";

export default function Navigation({
  children,
  controllingRef,
  cx,
  isOpen = true,
  label,
  orientation = "horizontal",
  skipName,
  ...rest
}: NavigationProps): JSX.Element {
  const parentRef = useRef<HTMLButtonElement>(null);

  const navigationContextProps: NavigationContextStoredValueProps = {
    data: {
      controllingRef: controllingRef,
      isSubListOpen: isOpen,
      storedParentEl: null,
      storedList: [],
    },
    config: { orientation: orientation, skipName: skipName || "skip" },
  };

  const navigationListProps: NavigationListProps = {
    ...rest,
    isOpen,
    orientation,
    parentRef,
  };

  const navigationWrapperProps = {
    cx,
    controllingRef,
    isOpen,
    label: label,
  };

  return (
    <NavigationProvider value={navigationContextProps}>
      <NavigationWrapper {...navigationWrapperProps}>
        <NavigationList {...navigationListProps}>{children}</NavigationList>
      </NavigationWrapper>
    </NavigationProvider>
  );
}
