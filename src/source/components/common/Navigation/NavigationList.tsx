import { Fragment } from "react";
import { List, ListProps } from "@/source/components/base";
import { NavigationListProps } from "./NavigationTypes";

export default function NavList({
  children,
  id,
  ...rest
}: NavigationListProps) {
  const listProps: ListProps = {
    ...rest,
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
