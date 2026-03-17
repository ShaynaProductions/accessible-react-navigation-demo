"use client";
import {
  Box,
  Heading,
  List,
  ListItem,
  Navigation,
  Text,
} from "@/ui/components";
import { transformNavigation } from "@/ui/components/common/Navigation/utilities";

export function MultipleListButtonsPage({ data }) {
  const navigation = transformNavigation(data.navigationArray);

  return (
    <>
      <Heading headingLevel={2}>Multiple List with Top Row Buttons</Heading>
      <Text>
        An example showcasing multiple lists with the entire top row consisting
        of buttons
      </Text>

      <Box cx="example complex">
        <Navigation
          id="multiple-buttons-demo"
          label="Multiple Lists with Top Buttons Demo"
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
          Includes basic layout.
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
          The current implementation is fully functioning. Use the home, end,
          right and left arrow keys to move within a single sublist; tab and the
          down Arrow Key to move down open lists and the shift+tab and up arrow
          keys to move up open lists. Exit the component by activating a pointer
          event (mouse, trackpad or finger) outside of the component or pressing
          the Escape key while any focusable element in the component has focus.
          <br />
        </ListItem>
      </List>
    </>
  );
}
