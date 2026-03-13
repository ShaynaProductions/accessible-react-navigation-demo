"use client";
import {
  DefinitionDetail,
  DefinitionList,
  DefinitionTerm,
  Heading,
  Link,
  Text,
} from "@/ui/components";

export const LatestRelease = () => {
  return (
    <>
      <Heading headingLevel={3}>
        Focus on Shift+Tab and Refinement Support
      </Heading>
      <DefinitionList>
        <DefinitionTerm>Articles</DefinitionTerm>
        <DefinitionDetail>
          <Text isInline>Development</Text>
          <Link
            href="https://dev.to/shaynaproductions/focus-issues-and-refinement-support-4be4"
            openInNewTab={true}
          >
            Focus Issues and Refinement Support
          </Link>
          <br />
        </DefinitionDetail>
        <DefinitionTerm>Release</DefinitionTerm>
        <DefinitionDetail>
          <Link
            href="https://github.com/ShaynaProductions/accessible-react-navigation-demo/releases/tag/v0.8.0"
            openInNewTab={true}
          >
            Shift+Tab Focus and Support for Closing Requirements
          </Link>
        </DefinitionDetail>
      </DefinitionList>
    </>
  );
};
