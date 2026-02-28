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

export function MultipleListLinkEndsPage({ data }) {
  const navigation = transformNavigation(data.navigationArray);

  return (
    <>
      <Heading headingLevel={2}>
        Multiple Lists with Top Row Links and Buttons
      </Heading>
      <Text>
        An example showcasing multiple lists with the top row displaying links
        and buttons.
      </Text>

      <Box cx="example complex">
        <Navigation
          id="multiple-link-ends-demo"
          label="Multiple Lists with Top Row Links and Buttons"
        >
          {navigation}
        </Navigation>
      </Box>
      <Heading headingLevel={3}>
        Currently Implemented -  Single List Keyboard Handling Release
      </Heading>
      <List cx="display">
        <ListItem>
          The component is uncontrolled and the top list is open by default
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
