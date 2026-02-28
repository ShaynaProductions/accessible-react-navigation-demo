"use client";
import { JSX } from "react";
import { Heading, Link, Text } from "@/ui/components";

export function StyledHorizontal(): JSX.Element {
  return (
    <>
      <Heading headingLevel={3}>
        <Link href="/examples/styled-horizontal-uncontrolled">
          Horizontal Example Ready for Styling
        </Link>
      </Heading>
      <Text>
        An example of an uncontrolled, horizontally aligned navigation component
        containing multiple subnavigation lists, where the the top row consists
        of both links and buttons ready for custom styling.
      </Text>
    </>
  );
}
