"use client";
import {
  Box,
  Button,
  Heading,
  Navigation,
  Text,
  transformNavigation,
} from "@/source/components";
import "../links-buttons.css";

export default function LinksButtonsView(navObject) {
  const navigation = transformNavigation(navObject.navigation);

  return (
    <>
      <Heading headingLevel={3}>Simple Link Structure</Heading>
      <Text>One level of links</Text>
      <Box cx="simple">
        <Button id="front">Focusable Front</Button>
        <Navigation label="Simple Links Demo">{navigation}</Navigation>
        <Button id="end">Focusable End</Button>
      </Box>
    </>
  );
}
