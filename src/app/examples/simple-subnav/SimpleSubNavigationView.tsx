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

export default function SimpleSubNavigationView(navObject) {
  const navigation = transformNavigation(navObject.navigation);

  return (
    <>
      <Heading headingLevel={3}>Simple SubNavigation</Heading>
      <Text>Links and One SubNavigation</Text>
      <Box cx="simple">
        <Button id="front">Focusable Front</Button>
        <Navigation label="Simple Sub Navigation Demo">{navigation}</Navigation>
        <Button id="end">Focusable End</Button>
      </Box>
    </>
  );
}
