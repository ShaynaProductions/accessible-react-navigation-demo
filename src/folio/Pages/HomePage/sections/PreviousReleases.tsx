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
        </ListItem>
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
        <ListItem>
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
        </ListItem>
        <ListItem>
          <Heading headingLevel={3}>Parent Provider Implementation</Heading>
          <DefinitionList>
            <DefinitionTerm>Articles</DefinitionTerm>
            <DefinitionDetail>
              <Text isInline>Development</Text>
              <Link
                href="https://dev.to/shaynaproductions/are-you-my-parent-scaffolding-in-the-architecture-necessary-for-keyboard-handling-between-23dg"
                openInNewTab={true}
              >
                Are You My Parent?
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
        </ListItem>
        <ListItem>
          <Heading headingLevel={3}>
            Up and Down Arrow Key Implementation
          </Heading>
          <DefinitionList>
            <DefinitionTerm>Articles</DefinitionTerm>
            <DefinitionDetail>
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
        </ListItem>
      </List>
    </>
  );
}
