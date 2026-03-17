"use client";
import {
  Box,
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
      <Box cx="vertical">
        <Navigation
          cx="vertical-navigation"
          id="vertical-demo"
          label="Vertically Styled Menu"
          orientation="vertical"
        >
          {navigation}
        </Navigation>
      </Box>
      <Heading headingLevel={3}>
        Currently Implemented - Closings, Entries and Exit Strategies Release
      </Heading>
      <List cx="display">
        <ListItem>
          <strong>Current Styling</strong>: <br />
          Includes Full layout.
        </ListItem>
        <ListItem>
          The component is uncontrolled and the primary list is open by default
        </ListItem>
        <ListItem>
          Buttons are fully implemented and can be toggled through pointer, or
          Keyboard (Enter/Space) <br />
        </ListItem>
        <ListItem>
          Screen and Screen readers indicate when a sublist is open or closed.
        </ListItem>
        <ListItem>
          Navigation Keyboard functionality is fully implemented.
          <br />
          The current implementation is not fully functioning. While the home,
          end, right and left arrow keys move within a single sublist; the down
          arrow key is implemented for the horizontal layout and while
          functioning correctly for the layout, appears broken in a vertical
          layout. All other keys work correctly in the feature.
        </ListItem>
      </List>
    </>
  );
}
