"use client";
import { JSX } from "react";
import { Heading, Link, List, ListItem, Text } from "@/ui/components";

export function Introduction(): JSX.Element {
  return (
    <>
      <Text>
        <abbr title="Garbage In, Garbage Out">GIGO</abbr>: Since a React
        application is built as a series of parent/child components, it stands
        to reason that the only way to create an accessible application is to
        make sure your base components, those wrapping around structural and
        semantically valid HTML elements, are as accessible as they can be. All
        components used in the Navigation Component have also been used in the
        creation of these example pages.
      </Text>
      <Text>
        This release holds the code discussed in the article:{" "}
        <Link
          href="https://dev.to/shaynaproductions/foundational-accessibility-begins-with-the-base-components-4f5p"
          openInNewTab={true}
        >
          Foundational Accessibility Begins with the Base Components
        </Link>{" "}
        and the source code for this release may be found in{" "}
        <Link
          href="https://github.com/ShaynaProductions/accessible-react-navigation-demo/releases/tag/v0.2.0"
          openInNewTab={true}
        >
          the v0.2.0 release.
        </Link>
      </Text>

      <Heading headingLevel={3}>General Accessibility Resources</Heading>
      <List cx="general">
        <ListItem>
          <Link
            href="https://www.w3.org/WAI/WCAG22/quickref/"
            openInNewTab={true}
          >
            <abbr title="Web Content Accessibility Guidelines">WCAG</abbr> Quick
            Reference
          </Link>
          <Text>
            A filterable quick reference to the legally required guidelines in
            many countries.
          </Text>
        </ListItem>
        <ListItem>
          <Link
            href="https://dequeuniversity.com/checklists/web/"
            openInNewTab={true}
          >
            Deque Web Accessibility Checklist
          </Link>{" "}
          <Text>
            A useful guide showing requirements for various components. PDF is
            easier to search.
          </Text>
        </ListItem>
        <ListItem>
          <Link
            href="https://accessibilityinsights.io/docs/web/overview/"
            openInNewTab={true}
          >
            Accessibility Insights for Web
          </Link>
          <Text>
            An extension for Chrome and Edge to audit and help developers find
            and fix accessibility issues.
          </Text>
        </ListItem>
      </List>
    </>
  );
}
