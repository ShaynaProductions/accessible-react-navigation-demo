import { Button, ListItem } from "@/source/components/base";
import { ChevronRightIcon } from "@/source/icons";
import NavigationList from "./NavigationList";

export default function SubNavigation({ children, id, label, testId }) {
  const buttonProps = {
    "aria-controls": `list-${id}`,
    "aria-label": `${label} sub menu`,
    testId: testId,
  };
  const listProps = {
    id: `list-${id}`,
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
