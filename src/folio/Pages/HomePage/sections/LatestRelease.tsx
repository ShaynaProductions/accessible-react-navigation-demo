import {
  DefinitionDetail,
  DefinitionList,
  DefinitionTerm,
  Heading,
  Link,
  Text
} from "@/ui/components";

export const LatestRelease = () => {
  return (
    <>
      <Heading headingLevel={3}>Single List Keyboard Handling</Heading>
      <DefinitionList>
        <DefinitionTerm>Articles</DefinitionTerm>
        <DefinitionDetail>
          <Text isInline>Development</Text>
          <Link
            href="https://dev.to/shaynaproductions/single-list-keyboard-handling-254g"
            openInNewTab={true}
          >
            Single List Keyboard Handling
          </Link>
          <br />
        </DefinitionDetail>
        <DefinitionDetail>
          <Text isInline={true}>Design</Text>
          <Link
            href="https://dev.to/shaynaproductions/laying-it-all-out-2a8e"
            openInNewTab={true}
          >
            Laying it all Out
          </Link>
          <br />
        </DefinitionDetail>

        <DefinitionTerm>Release</DefinitionTerm>
        <DefinitionDetail>
          <Link
            href="https://github.com/ShaynaProductions/accessible-react-navigation-demo/releases/tag/v0.4.0"
            openInNewTab={true}
          >
            Implementing Single List Keyboard Handling{" "}
          </Link>
        </DefinitionDetail>
      </DefinitionList>
    </>
  );
};
