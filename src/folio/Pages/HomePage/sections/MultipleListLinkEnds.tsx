"use client";

import { Heading, Link, Text } from "@/ui/components";

export function MultipleListLinkEnds() {
  return (
    <>
      <Heading headingLevel={3}>
        <Link href="/examples/multiple-lists-link-ends">
          Multiple Lists with Top Row Buttons and Links
        </Link>
      </Heading>
      <Text>
        An example of an uncontrolled, horizontally aligned navigation component
        containing multiple subnavigation lists, where the the top row consists
        of both links and buttons.
      </Text>
    </>
  );
}
