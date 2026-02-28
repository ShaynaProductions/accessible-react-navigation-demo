"use client";
import { JSX } from "react";
import classNames from "classnames";

import { List, type ListProps } from "@/ui/components";
import {
  NavigationListProvider,
} from "../providers";
import type { NavigationListProps } from "./NavigationTypes";

export default function NavigationList({
  children,
  cx,
  id,
  isOpen,
  ...rest
}: NavigationListProps): JSX.Element {


  const listProps: ListProps = {
    ...rest,
    id,
    cx: classNames({ srOnly: !isOpen }, cx),
  };

  return (
    <NavigationListProvider>
      <List key={`list-$id`} {...listProps}>
        {children}
      </List>
    </NavigationListProvider>
  );
}
