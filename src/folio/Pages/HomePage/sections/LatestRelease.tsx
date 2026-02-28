"use client";
import {
  DefinitionDetail,
  DefinitionList,
  DefinitionTerm,
  Heading,
  Link,
} from "@/ui/components";

export const LatestRelease = () => {
  return (
    <>
      <Heading headingLevel={3}>Accessible Base Components</Heading>
      <DefinitionList>
        <DefinitionTerm>Article</DefinitionTerm>
        <DefinitionDetail>
          <Link
            href="https://dev.to/shaynaproductions/foundational-accessibility-begins-with-the-base-components-4f5p"
            openInNewTab={true}
          >
            Foundational Accessibility Begins with the Base Components
          </Link>
          <br />
        </DefinitionDetail>
        <DefinitionTerm>Example Page</DefinitionTerm>
        <DefinitionDetail>
          <Link href="/base-components">
            Examples of Accessible Base Components
          </Link>
        </DefinitionDetail>
        <DefinitionTerm>Release</DefinitionTerm>
        <DefinitionDetail>
          <Link
            href="https://github.com/ShaynaProductions/accessible-react-navigation-demo/releases/tag/v0.2.0"
            openInNewTab={true}
          >
            Accessible Base Components
          </Link>
        </DefinitionDetail>
      </DefinitionList>
    </>
  );
};
