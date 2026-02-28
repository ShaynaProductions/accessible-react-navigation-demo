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
        Currently Implemented - Structure/Transformation Release
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
          Keyboard functionality is not yet implemented. <br />
          <strong>Note:</strong> Keyboard functionality in the
          Structure/Transformation release is limited to Tab and navigating with
          the Tab key will currently cause the focus to disappear into any
          hidden list. Use the Enter key to open a list and then Tab will
          navigate through the now open list.
        </ListItem>
      </List>
    </>
  );
}
