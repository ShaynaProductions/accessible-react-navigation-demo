import { Fragment, useRef } from "react";
import classNames from "classnames";
import { List, ListProps } from "@/source/components/base";

import { NavigationListProps } from "../NavigationTypes";
import { NavListContextStoredValueProps, NavListProvider } from "../providers";

export default function NavigationList({
  children,
  cx,
  id,
  isOpen,
  parentRef,
  ...rest
}: NavigationListProps) {
  const emptyRef = useRef<HTMLButtonElement | null>(null);

  const listContext: NavListContextStoredValueProps = {
    isListOpen: isOpen,
    parentRef: parentRef || emptyRef,
  };

  const listProps: ListProps = {
    ...rest,
    id,
    cx: classNames({ srOnly: !isOpen }, cx),
  };

  return (
    <Fragment>
      <NavListProvider value={listContext}>
        <List key={`list-${id}`} {...listProps}>
          {children}
        </List>
      </NavListProvider>
    </Fragment>
  );
}
