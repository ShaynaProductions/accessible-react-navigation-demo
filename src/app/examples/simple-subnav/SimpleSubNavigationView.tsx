"use client";
import {
  Heading,
  Navigation,
  Text,
  transformNavigation,
} from "@/source/components";

export default function SimpleSubNavigationView(navObject) {
  const navigation = transformNavigation(navObject.navigation);

  return (
    <>
      <Heading headingLevel={3}>Simple SubNavigation</Heading>
      <Text>Links and One SubNavigation</Text>
      <Navigation label="Simple Sub Navigation Demo">{navigation}</Navigation>
    </>
  );
}
