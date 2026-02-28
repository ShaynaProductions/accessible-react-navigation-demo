import {
  DefinitionDetail,
  DefinitionList,
  DefinitionTerm,
  Heading,
  Link,
  List,
  ListItem,
  Text,
} from "@/ui/components";

export function PreviousReleases({ headingLevel }) {
  return (
    <>
      <Text>
        Explore the previous releases in this series. Each release is associated
        with one or more articles. Links to the release, articles and GitHub
        tagged source are available here.
      </Text>
      <List isOrdered={true}>
        <ListItem>
          <Heading headingLevel={headingLevel}>
            Accessible Base Components
          </Heading>
          <DefinitionList>
            <DefinitionTerm>Articles</DefinitionTerm>
            <DefinitionDetail>
              <Text isInline>Development</Text>
              <Link
                href="https://dev.to/shaynaproductions/foundational-accessibility-begins-with-the-base-components-4f5p"
                openInNewTab
              >
                Foundational Acessibility Begins With Base Components
              </Link>
            </DefinitionDetail>
            <DefinitionDetail>
              <Text isInline>Design</Text>
              <Link
                href="https://dev.to/shaynaproductions/theming-in-the-modern-age-1je5"
                openInNewTab
              >
                Theming in the modern age
              </Link>
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
        </ListItem>{" "}
        <ListItem>
          <Heading headingLevel={headingLevel}>
            Structure and Transformation
          </Heading>
          <DefinitionList>
            <DefinitionTerm>Article</DefinitionTerm>
            <DefinitionDetail>
              <Link
                href="https://dev.to/shaynaproductions/structure-and-transformation-first-steps-in-navigation-implementation-248"
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
        </ListItem>
      </List>
    </>
  );
}
