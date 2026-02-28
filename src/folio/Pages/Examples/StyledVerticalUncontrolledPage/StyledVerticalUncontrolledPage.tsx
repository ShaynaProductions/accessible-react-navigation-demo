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
        An example showcasing layers of custom styling on a navigation omponent
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
        Currently Implemented - Parent Provider Release
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
          Keyboard functionality is partially implemented. <br />
          <strong>Note:</strong> Keyboard functionality in the Single Keyboard
          Handling release is limited.
          <br />
          The current implementation allows for the Home, End, right and left
          arrow keys to navigate within a single list. Use the Tab Key to move
          into an open sublist where the implemented keys will shift focus.
        </ListItem>
      </List>
    </>
  );
}
