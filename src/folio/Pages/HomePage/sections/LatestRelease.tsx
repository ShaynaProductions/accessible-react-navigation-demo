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
        {" "}
        Controlled and Vertical Layout Release
      </Heading>
      <DefinitionList>
        <DefinitionTerm>Articles</DefinitionTerm>
        <DefinitionDetail>
          <Text isInline>Development</Text>
          <Link
            href="https://dev.to/shaynaproductions/setting-up-a-controlled-component-2j9a"
            openInNewTab={true}
          >
            Setting Up a Controlled Component
          </Link>
          <br />
        </DefinitionDetail>
        <DefinitionDetail>
          <Text isInline>Development</Text>
          <Link
            href="https://dev.to/shaynaproductions/vertical-layout-considerations-2gdc"
            openInNewTab={true}
          >
            Vertical Layout Considerations
          </Link>
          <br />
        </DefinitionDetail>
        <DefinitionTerm>Release</DefinitionTerm>
        <DefinitionDetail>
          <Link
            href="https://github.com/ShaynaProductions/accessible-react-navigation-demo/releases/tag/v1.0.0"
            openInNewTab={true}
          >
            Full Release - Uncontrolled/Controlled - Horizontal/Vertical Layouts
          </Link>
        </DefinitionDetail>
      </DefinitionList>
    </>
  );
};
