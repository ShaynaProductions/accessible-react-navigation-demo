import { Box, List, ListItem, Text } from "@/ui/components";
import { MultipleListButtons, MultipleListLinkEnds, SingleList } from "./";

export const Examples = () => {
  return (
    <Box cx="example-section">
      <Text>
        The examples in this codebase represent the progression of the code as
        completed in the latest release and article. Each release layers upon
        the previous code to progressively enhance a main navigation component.
        The source code for this release is fully typed and tested.
      </Text>
      <Text>
        Current Examples provide differing desktop navigation scenarios which
        currently implement a base navigation structure accessible by screen,
        screen reader, mouse and the TAB key.
      </Text>
      <List>
        <ListItem>
          <SingleList />
        </ListItem>
        <ListItem>
          <MultipleListButtons />
        </ListItem>
        <ListItem>
          <MultipleListLinkEnds />
        </ListItem>
      </List>
    </Box>
  );
};
