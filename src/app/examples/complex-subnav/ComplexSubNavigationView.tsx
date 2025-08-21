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

export default function ComplexSubNavigationView(navObject) {
  const navigation = transformNavigation(navObject.navigation);

  return (
    <>
      <Heading headingLevel={3}>Complex SubNavigation</Heading>
      <Text>Top Row and Closing</Text>
      <Box cx="simple">
        <Button id="front">Focusable Front</Button>
        <Navigation
          label="Complex Sub Navigation Demo"
          orientation={"horizontal"}
        >
          {navigation}
        </Navigation>
        <Button id="end">Focusable End</Button>
      </Box>
    </>
  );
}
