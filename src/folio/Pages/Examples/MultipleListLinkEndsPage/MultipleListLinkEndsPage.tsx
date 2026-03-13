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
