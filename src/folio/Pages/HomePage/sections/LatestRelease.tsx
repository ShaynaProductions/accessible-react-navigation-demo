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
      <Heading headingLevel={3}>Structure and Transformation</Heading>
      <DefinitionList>
        <DefinitionTerm>Article</DefinitionTerm>
        <DefinitionDetail>
          <Link
            href="hhttps://dev.to/shaynaproductions/structure-and-transformation-first-steps-in-navigation-implementation-248"
            openInNewTab={true}
          >
            Structure and Transformation: First Steps in Navigation
            Implementation
          </Link>
          <br />
        </DefinitionDetail>

        <DefinitionTerm>Release</DefinitionTerm>
        <DefinitionDetail>
          <Link
            href="https://github.com/ShaynaProductions/accessible-react-navigation-demo/releases/tag/v0.3.0"
            openInNewTab={true}
          >
            Struction and Transformation
          </Link>
        </DefinitionDetail>
      </DefinitionList>
    </>
  );
};
