"use client";
import { type JSX } from "react";
import classNames from "classnames";

import { List, type ListProps } from "@/ui/components";

import { useNavigation } from "../hooks";
import {
  NavigationListProvider,
  type NavigationListContextStoredValueProps,
} from "../providers";
import type { NavigationListProps } from "./NavigationTypes";

export default function NavigationList({
  children,
  cx,
  id,
  isOpen,
  parentRef,
  ...rest
}: NavigationListProps): JSX.Element {
  const { isLayoutVertical } = useNavigation();

  const listContext: NavigationListContextStoredValueProps = {
    isLayoutVertical,
    parentRef: parentRef,
  };

  const listProps: ListProps = {
    ...rest,
    id,
    cx: classNames({ srOnly: !isOpen }, cx),
  };

  return (
    <NavigationListProvider value={listContext}>
      <List key={`list-$id`} {...listProps}>
        {children}
      </List>
    </NavigationListProvider>
  );
}
