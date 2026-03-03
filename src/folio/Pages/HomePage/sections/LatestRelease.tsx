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
      <Heading headingLevel={3}>Up and Down Arrow Key Implementation</Heading>
      <DefinitionList>
        <DefinitionTerm>Articles</DefinitionTerm>
        <DefinitionDetail>
          <Text isInline>Development</Text>
          <Link
            href="https://dev.to/shaynaproductions/the-ups-and-downs-of-keyboard-handling-80n"
            openInNewTab={true}
          >
            The Ups and Downs of Keyboard Handling
          </Link>
          <br />
        </DefinitionDetail>

        <DefinitionTerm>Release</DefinitionTerm>
        <DefinitionDetail>
          <Link
            href="https://github.com/ShaynaProductions/accessible-react-navigation-demo/releases/tag/v0.6.0"
            openInNewTab={true}
          >
            Up and Down Key Implementation: Navigation Between Components
          </Link>
        </DefinitionDetail>
      </DefinitionList>
    </>
  );
};
