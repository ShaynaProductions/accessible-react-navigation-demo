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
      <Heading headingLevel={3}>Closings, Entries and Exits</Heading>
      <DefinitionList>
        <DefinitionTerm>Articles</DefinitionTerm>
        <DefinitionDetail>
          <Text isInline>Development</Text>
          <Link
            href="https://dev.to/shaynaproductions/the-ins-and-outs-of-closings-26fi"
            openInNewTab={true}
          >
            The Ins and Outs of Closings
          </Link>
          <br />
        </DefinitionDetail>
        <DefinitionDetail>
          <Text isInline>Design</Text>
          <Link
            href="https://dev.to/shaynaproductions/styling-the-vertical-achieving-parity-2de5"
            openInNewTab={true}
          >
            Stylng the Vertical - Achieving Parity
          </Link>
          <br />
        </DefinitionDetail>
        <DefinitionTerm>Release</DefinitionTerm>
        <DefinitionDetail>
          <Link
            href="https://github.com/ShaynaProductions/accessible-react-navigation-demo/releases/tag/v0.9.0"
            openInNewTab={true}
          >
            Closings, Entries and Exit Strategies
          </Link>
        </DefinitionDetail>
      </DefinitionList>
    </>
  );
};
