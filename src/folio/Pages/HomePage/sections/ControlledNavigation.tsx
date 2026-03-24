"use client";

import { Heading, Link, Text } from "@/ui/components";

export function ControlledNavigation() {
  return (
    <>
      <Heading headingLevel={3}>
        <Link href="/examples/mobile-nav-buttons">
          Controlled Navigation (Mobile) - button ends
        </Link>
      </Heading>
      <Text>
        An example of a controlled navigation component arranged vertically.
      </Text>
      <Heading headingLevel={3}>
        <Link href="/examples/mobile-nav-links">
          Controlled Navigation (Mobile) - link ends
        </Link>
      </Heading>
      <Text>
        An example of a controlled navigation component arranged vertically.
      </Text>
    </>
  );
}
