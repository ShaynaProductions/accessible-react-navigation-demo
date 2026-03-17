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
  cx,
  isOpen = true,
  label,
  orientation = "horizontal",
  ...rest
}: NavigationProps): JSX.Element {
  const parentRef = useRef<HTMLButtonElement>(null);

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

  const navigationWrapperProps = {
    className: cx,
    label: label,
  };

  return (
    <>
      <NavigationProvider value={navigationContextProps}>
        <NavigationWrapper {...navigationWrapperProps}>
          <NavigationList {...navigationListProps}>{children}</NavigationList>
        </NavigationWrapper>
      </NavigationProvider>
    </>
  );
}
