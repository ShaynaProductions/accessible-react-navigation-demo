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

export function SingleListPage({ data }) {
  const navigation = transformNavigation(data.navigationArray);

  return (
    <>
      <Heading headingLevel={2}>Single Link List Structure</Heading>
      <Text>
        An example showcasing one level of links vertically aligned. Keyboard
        functionality in the single keyboard handling release implements the
        following keys: arrow-left, arrow-right, arrow-down, arrow-up, home and
        end. This example is fully functional.
        <strong>Note:</strong> Keyboard functionality in this uncontrolled
        single list component release implements all keyboard and interaction
        handling needed for accessible navigation.
      </Text>
      <Box cx="example simple">
        <Navigation
          id="single-links-demo"
          label="Single Links Demo"
          orientation="vertical"
        >
          {navigation}
        </Navigation>
      </Box>
      <Heading headingLevel={3}>
        Currently Implemented - Structure/Transformation Release
      </Heading>
      <List cx="display">
        <ListItem>The List is uncontrolled and open by default</ListItem>
        <ListItem>
          The link representing the current Page (Single List Links) is
          identifiable through screen and screen reader.
        </ListItem>
        <ListItem>Keyboard Navigable through Tab</ListItem>
      </List>
    </>
  );
}
