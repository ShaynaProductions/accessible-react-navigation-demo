"use client";

import {
  Heading,
  InternalLink,
  List,
  ListItem,
  Text,
} from "@/source/components";

export default function Home() {
  return (
    <>
      <Text>
        This repository is provided as an example of an accessible react
        navigation component.
      </Text>
      <Heading headingLevel={2}>Examples</Heading>
      <List>
        <ListItem>
          <InternalLink href="/examples/simple-links">
            Simple Structure - Links Only
          </InternalLink>
        </ListItem>
        <ListItem>
          <InternalLink href="/examples/links-buttons">
            Simple Structure - Links Only - Focusable Out of DOM Buttons
          </InternalLink>
        </ListItem>
        <ListItem>
          <InternalLink href="/examples/simple-subnav">
            Simple Subnavigation
          </InternalLink>
        </ListItem>
        <ListItem>
          <InternalLink href="/examples/complex-subnav">
            Complex Subnavigation
          </InternalLink>
        </ListItem>
      </List>
    </>
  );
}
