"use client";
import {
  Box,
  Heading,
  List,
  ListItem,
  MobileNavigation,
  Text,
  transformNavigation,
} from "@/ui/components";

export function MobileNavigationPage({ navigation, title, description }) {
  const nav = transformNavigation(navigation);

  return (
    <>
      <Heading headingLevel={2}>{title}</Heading>
      <Text>{description}</Text>
      <MobileNavigation
        id="mobile-nav"
        cx="mobile-navigation"
        label="Mobile Menu Demo"
      >
        {nav}
      </MobileNavigation>
      <Box cx="instructions">
        <Heading headingLevel={3}>
          Currently Implemented - Controlled and Vertical Layout Release
        </Heading>
        <List cx="display">
          <ListItem>
            <strong>Current Styling</strong>: <br />
            Includes Full layout.
          </ListItem>
          <ListItem>
            The component is controlled and the navigation component is closed
            by default.
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
            The current implementation is fully functioning for a vertical
            layout. The Up and Down arrow keys mimic the Tab and Shift+Tab keys
            except when at the end. Tab and Shift+Tab leave the component, while
            the up and down arrow keys remain respectively at the first and last
            element in the first row.
          </ListItem>
        </List>
      </Box>
    </>
  );
}
