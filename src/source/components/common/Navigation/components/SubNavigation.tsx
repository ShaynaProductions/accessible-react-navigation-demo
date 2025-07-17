import { Button, ListItem } from "@/source/components/base";
import { ChevronRightIcon } from "@/source/icons";
import NavigationList from "./NavigationList";
import { use, useRef } from "react";
import { NavListContext } from "@/source/components/common/Navigation/providers/NavListProvider/NavListProvider";
import { returnTrueElementOrUndefined } from "@/source/utilities";

export default function SubNavigation({ children, id, label, testId }) {
  const navListContextObject = use(NavListContext);

  const { currentListItems, parentRef } = returnTrueElementOrUndefined(
    !!navListContextObject,
    navListContextObject,
  );

  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const buttonProps = {
    "aria-controls": `list-${id}`,
    "aria-label": `${label} sub menu`,
    ref: buttonRef,
    testId: testId,
  };
  const listProps = {
    id: `list-${id}`,
    parentRef: buttonRef,
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
