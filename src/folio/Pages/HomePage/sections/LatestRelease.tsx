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
      <Heading headingLevel={3}>Parent Provider Implementation</Heading>
      <DefinitionList>
        <DefinitionTerm>Articles</DefinitionTerm>
        <DefinitionDetail>
          <Text isInline>Development</Text>
          <Link
            href="https://dev.to/shaynaproductions/are-you-my-parent-scaffolding-in-the-architecture-necessary-for-keyboard-handling-between-23dg"
            openInNewTab={true}
          >
            Are You My Parent?: Scaffolding in the architecture necessary for
            keyboard handling between components.
          </Link>
          <br />
        </DefinitionDetail>
        <DefinitionDetail>
          <Text isInline>Design</Text>
          <Link
            href="https://dev.to/shaynaproductions/laying-it-all-out-on-the-vertical-23b3"
            openInNewTab={true}
          >
            Laying it all out on the vertical
          </Link>
          <br />
        </DefinitionDetail>

        <DefinitionTerm>Release</DefinitionTerm>
        <DefinitionDetail>
          <Link
            href="https://github.com/ShaynaProductions/accessible-react-navigation-demo/releases/tag/v0.5.0"
            openInNewTab={true}
          >
            Data and Provider Handling for Keyboarding Between Components.
          </Link>
        </DefinitionDetail>
      </DefinitionList>
    </>
  );
};
