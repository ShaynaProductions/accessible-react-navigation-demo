"use client";

import { JSX, useState } from "react";
import type {
  NavigationListProps,
  SubNavigationProps,
} from "./NavigationTypes";
import {
  Button,
  Icon,
  ListItem,
  type ButtonProps,
  type IconProps,
  type ListItemProps,
} from "@/ui/components";
import { ChevronRightIcon } from "@/ui/svg";
import NavigationList from "./NavigationList";

export default function SubNavigation({
  children,
  cx,
  id,
  label,
  testId,
}: SubNavigationProps): JSX.Element {
  const [isSubListOpen, setIsSubListOpen] = useState<boolean>(false);

  const handlePress = () => {
    setIsSubListOpen(!isSubListOpen);
  };

  const buttonProps: ButtonProps = {
    "aria-controls": id,
    "aria-expanded": isSubListOpen,
    "aria-label": `${label} subnavigation`,
    onPress: handlePress,
  };

  const iconProps: IconProps = {
    IconComponent: ChevronRightIcon,
    isSilent: true,
  };

  const listItemProps: Omit<ListItemProps, "children"> = {
    cx: cx,
  };

  const navigationListProps: NavigationListProps = {
    id: id,
    isOpen: isSubListOpen,
    testId: testId && `${testId}-list`,
  };
  return (
    <ListItem key={id} {...listItemProps}>
      <Button {...buttonProps}>
        {label}
        <Icon {...iconProps} />
      </Button>
      <NavigationList key={`list-${id}`} {...navigationListProps}>
        {children}
      </NavigationList>
    </ListItem>
  );
}
