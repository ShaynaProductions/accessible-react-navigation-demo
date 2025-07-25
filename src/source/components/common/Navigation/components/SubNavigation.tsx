"use client";
import { useState } from "react";

import { Button, ListItem } from "@/source/components/base";
import { ChevronRightIcon } from "@/source/icons";
import NavigationList from "./NavigationList";
import { SubNavigationProps } from "../NavigationTypes";

export default function SubNavigation({
  children,
  id,
  label,
  testId,
}: SubNavigationProps) {
  const [isSubListOpen, setIsSubListOpen] = useState(false);
  const buttonProps = {
    "aria-controls": `list-${id}`,
    "aria-expanded": true,
    "aria-label": `${label} sub menu`,
    onPress: () => setIsSubListOpen(!isSubListOpen),
    testId: testId,
  };
  const listProps = {
    id: `list-${id}`,
    isOpen: isSubListOpen,
    testId: testId && `${testId}-${id}-list`,
  };
  return (
    <ListItem key={id}>
      <Button {...buttonProps}>
        {label}
        <ChevronRightIcon />
      </Button>
      <NavigationList key={`list-${id}`} {...listProps}>
        {children}
      </NavigationList>
    </ListItem>
  );
}
