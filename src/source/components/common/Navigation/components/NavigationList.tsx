import { Fragment, useRef } from "react";
import { List, ListProps } from "@/source/components/base";

import { NavigationListProps } from "../NavigationTypes";
import { NavListContextValueProps, NavListProvider } from "../providers";

export default function NavigationList({
  children,
  id,
  parentRef,
  ...rest
}: NavigationListProps) {
  const emptyRef = useRef<HTMLButtonElement | null>(null);

  const listContext: NavListContextValueProps = {
    parentRef: parentRef || emptyRef,
  };
  const listProps: ListProps = {
    ...rest,
    id,
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
