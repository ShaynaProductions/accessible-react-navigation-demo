"use client";

import { JSX } from "react";
import {
  Link,
  ListItem,
  type LinkProps,
  type ListItemProps,
} from "@/ui/components";
import { usePathname } from "@/ui/hooks";
import { returnTrueElementOrUndefined } from "@/ui/utilities";
import { NavigationItemProps } from "./NavigationTypes";

export default function NavigationItem({
  cx,
  href,
  id,
  label,
  ...rest
}: NavigationItemProps): JSX.Element {
  const currentPath = usePathname();

  const pageURL = href.substring(0, 2) === "/#" ? currentPath + href : href;

  const listItemProps: Omit<ListItemProps, "children"> = {
    cx: cx,
    id: id,
  };
  const linkProps: Omit<LinkProps, "children"> = {
    "aria-current": returnTrueElementOrUndefined(currentPath === href, "page"),
    "aria-label": `${label} navigation`,
    href: pageURL,
    ...rest,
  };

  return (
    <ListItem key={id} {...listItemProps}>
      <Link {...linkProps}>{label}</Link>
    </ListItem>
  );
}
