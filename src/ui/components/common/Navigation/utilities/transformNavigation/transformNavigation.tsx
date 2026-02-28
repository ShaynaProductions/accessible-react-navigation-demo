"use client";
import { Fragment, ReactNode } from "react";
import {
  NavigationItem,
  SubNavigation,
  type NavigationItemProps,
} from "@/ui/components";

export function transformNavigation(
  navigationArray: NavigationItemProps[],
  testId?: string,
): Iterable<ReactNode> {
  return navigationArray.map((item) => (
    <Fragment key={`navigation-${item.id}`}>
      {item.menu ? (
        <SubNavigation
          key={item.id}
          id={item.id}
          label={item.label}
          testId={testId && `${testId}-${item.id}`}
        >
          {transformNavigation(item.menu, testId)}
        </SubNavigation>
      ) : (
        <NavigationItem
          id={item.id}
          key={item.id}
          label={item.label}
          href={item.href}
          testId={testId && `${testId}-${item.id}`}
        />
      )}
    </Fragment>
  ));
}
