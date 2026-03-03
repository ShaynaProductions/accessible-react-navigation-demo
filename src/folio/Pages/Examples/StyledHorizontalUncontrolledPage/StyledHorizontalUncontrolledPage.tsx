"use client";
import {
  Heading,
  List,
  ListItem,
  Navigation,
  Text,
  transformNavigation,
} from "@/ui/components";

export function StyledHorizontalUncontrolledPage({ data }) {
  const navigation = transformNavigation(data.navigationArray);

  return (
    <>
      <Heading headingLevel={2}>
        Ready for Styling - Horizontal Navigation
      </Heading>
      <Text>
        An example showcasing layers of custom styling on a navigation omponent
        comprised of multiple lists with the top row displaying links and
        buttons.
      </Text>

      <Navigation
        cx="horizontal-navigation"
        id="multiple-link-ends-demo"
        label="Multiple Lists with Top Row Links and Buttons"
      >
        {navigation}
      </Navigation>

      <Heading headingLevel={3}>
        Currently Implemented - Up and Down Key Implementation: Navigation
        Between Components
      </Heading>
      <List cx="display">
        <ListItem>
          <strong>Current Styling</strong>: <br />
          Includes basic layout.
        </ListItem>
        <ListItem>
          The component is uncontrolled and the primary list is open by default
        </ListItem>
        <ListItem>
          Buttons are fully implemented and can be toggled through pointer, or
          Keyboard (Enter/Space) <br />
          <strong>Note:</strong> Buttons must be closed manually at this time.
        </ListItem>
        <ListItem>
          Screen and Screen readers indicate when a sublist is open or closed.
        </ListItem>
        <ListItem>
          Keyboard functionality is partially implemented.
          <br />
          The current implementation adds functionality for the up and down
          arrow keys, allowing movement into and out of sub-lists, in addition
          to the Home, End, right, and left arrow keys, which navigate within a
          single list. Use the Down Key to move into an open sublist and use the
          Up Key to navigate up through open and closed sublists.
        </ListItem>
      </List>
    </>
  );
}
