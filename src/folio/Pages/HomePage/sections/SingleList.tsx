"use client";

import { Heading, Link, Text } from "@/ui/components";

export function SingleList() {
  return (
    <>
      <Heading headingLevel={3}>
        <Link href="/examples/single-list">Single List</Link>
      </Heading>
      <Text>
        A simple example of a single list of links in a vertical alignment
      </Text>
    </>
  );
}
