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
        Currently Implemented - Focus and Closing Foundation Release
      </Heading>
      <List cx="display">
        <ListItem>
          The component is uncontrolled and the top list is open by default
        </ListItem>
        <ListItem>
          Buttons are fully implemented and can be toggled through pointer, or
          Keyboard (Enter/Space). <br />
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
