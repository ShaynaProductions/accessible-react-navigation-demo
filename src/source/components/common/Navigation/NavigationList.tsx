import { Fragment } from "react";
import { List, ListProps } from "@/source/components/base";
import { NavigationListProps } from "./NavigationTypes";
import classNames from "classnames";

export default function NavList({
  children,
  cx,
  id,
  isOpen,
  ...rest
}: NavigationListProps) {
  const listProps: ListProps = {
    ...rest,
    cx: classNames({ srOnly: !isOpen }, cx),
    id,
  };
  return (
    <Fragment>
      <List key={`list-${id}`} {...listProps}>
        {children}
      </List>
    </Fragment>
  );
}
