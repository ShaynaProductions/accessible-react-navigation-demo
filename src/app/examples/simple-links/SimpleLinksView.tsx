"use client";
import {
  Heading,
  Navigation,
  Text,
  transformNavigation,
} from "@/source/components";

export default function SimpleLinksView(navObject) {
  const navigation = transformNavigation(navObject.navigation);

  return (
    <>
      <Heading headingLevel={3}>Simple Link Structure</Heading>
      <Text>One level of links</Text>
      <Navigation label="Simple Links Demo">{navigation}</Navigation>
    </>
  );
}
