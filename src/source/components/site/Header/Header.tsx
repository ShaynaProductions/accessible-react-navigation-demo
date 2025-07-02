"use client";
import { JSX } from "react";
import { Heading, InternalLink, List, ListItem } from "@/source/components";

export const Header = (): JSX.Element => {
  return (
    <header>
      <Heading headingLevel={1} variant="h2">
        Accessible React Navigation Demonstration
      </Heading>
      <List orientation="horizontal">
        <ListItem>
          <InternalLink href="/">Home</InternalLink>
        </ListItem>
      </List>
    </header>
  );
};
