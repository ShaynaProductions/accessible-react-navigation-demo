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
      <Heading headingLevel={3}>Tab and Shift+Tab Handling</Heading>
      <DefinitionList>
        <DefinitionTerm>Articles</DefinitionTerm>
        <DefinitionDetail>
          <Text isInline>Development</Text>
          <Link
            href="https://dev.to/shaynaproductions/navigating-with-tabs-17gj"
            openInNewTab={true}
          >
            Navigating with Tabs
          </Link>
          <br />
        </DefinitionDetail>
        <DefinitionDetail>
          <Text isInline>Design</Text>
          <Link
            href="https://dev.to/shaynaproductions/styling-and-color-cjo"
            openInNewTab={true}
          >
            Styling and Color
          </Link>
          <br />
        </DefinitionDetail>

        <DefinitionTerm>Release</DefinitionTerm>
        <DefinitionDetail>
          <Link
            href="https://github.com/ShaynaProductions/accessible-react-navigation-demo/releases/tag/v0.7.0"
            openInNewTab={true}
          >
            Adding Tab Navigation Capabilities
          </Link>
        </DefinitionDetail>
      </DefinitionList>
    </>
  );
};
