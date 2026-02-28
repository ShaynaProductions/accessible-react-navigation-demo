"use client";

import { Box, Heading } from "@/ui/components";
import { Components, Introduction } from "./sections";

export function BaseComponentsPage() {
  return (
    <Box id="base-components">
      <Heading headingLevel={2}>
        Base Components are Foundational for Accessibility
      </Heading>
      <Introduction />

      <Heading headingLevel={2}>
        Base Components Used In Navigation Component:
      </Heading>
      <Components headingLevel={3} />
    </Box>
  );
}
