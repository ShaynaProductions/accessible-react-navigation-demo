"use client";
import { type JSX } from "react";
import { Heading, Link, Text } from "@/ui/components";

export function StyledVertical(): JSX.Element {
  return (
    <>
      <Heading headingLevel={3}>
        <Link href="/examples/styled-vertical-uncontrolled">
          Vertical Example Ready for Styling
        </Link>
      </Heading>
      <Text>
        An example of an uncontrolled, vertically aligned navigation component
        containing multiple subnavigation lists, where the the top row consists
        of buttons ready for custom styling.
      </Text>
    </>
  );
}
