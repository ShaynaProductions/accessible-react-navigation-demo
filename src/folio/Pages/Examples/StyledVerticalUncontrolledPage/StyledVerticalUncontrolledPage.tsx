"use client";
import {
  Heading,
  List,
  ListItem,
  Navigation,
  Text,
  transformNavigation,
} from "@/ui/components";
import { type JSX } from "react";

export function StyledVerticalUncontrolledPage({ data }): JSX.Element {
  const navigation = transformNavigation(data.navigationArray);

  return (
    <>
      <Heading headingLevel={2}>
        Ready for Styling - Vertical Navigation
      </Heading>
      <Text>
        An example showcasing layers of custom styling on a navigation component
        comprised of multiple lists with the top row displaying buttons.
      </Text>

      <Navigation
        cx="vertical-navigation"
        id="vertical-demo"
        label="Vertically Styled Menu"
        orientation="vertical"
      >
        {navigation}
      </Navigation>

      <Heading headingLevel={3}>
        Currently Implemented - Focus and Closing Foundation Release
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
          Navigation Keyboard functionality is fully implemented.
          <br />
          The current implementation adds functionality for the Tab and
          Shift+Tab arrow keys, allowing movement into and out of sub-lists, in
          addition to the Home, End, right, and left arrow keys, which navigate
          within a single list. Use the Down or Tab Key to move into an open
          sublist and use the Up or Shift+Tab Key to navigate up through open
          and closed sublists.
          <br />
          Using Shift+Tab from the footer link will now correctly place focus on
          the last element in the top row.
        </ListItem>
      </List>
    </>
  );
}
