"use client";
import React, { JSX } from "react";
import {
  Box,
  Button,
  Heading,
  Icon,
  Link,
  List,
  ListItem,
  Text,
} from "@/ui/components";
import { ChevronRightIcon } from "@/ui/svg";
import { Orientation } from "@/ui/types";

interface ComponentsProps {
  cx?: string;
  headingLevel?: number;
}

export function Components({ cx, headingLevel }: ComponentsProps): JSX.Element {
  const [headingOpen, setHeadingOpen] = React.useState(false);
  const [linkOpen, setLinkOpen] = React.useState(false);
  const [buttonOpen, setButtonOpen] = React.useState(false);
  const [listOpen, setListOpen] = React.useState(false);
  const [textOpen, setTextOpen] = React.useState(false);

  const buttonLabel = !buttonOpen
    ? "Display Button Information"
    : "Hide Button Information";
  const headingLabel = !headingOpen
    ? "Display Heading Information"
    : "Hide Heading Information";
  const linkLabel = !linkOpen
    ? "Display Link Information"
    : "Hide Link Information";
  const listLabel = !listOpen
    ? "Display List Information"
    : "Hide List Information";
  const textLabel = !textOpen
    ? "Display Text Information"
    : "Hide Text Information";

  const handleButtonPress = () => {
    setButtonOpen(!buttonOpen);
  };

  const handleHeadingPress = () => {
    setHeadingOpen(!headingOpen);
  };
  const handleLinkPress = () => {
    setLinkOpen(!linkOpen);
  };
  const handleListPress = () => {
    setListOpen(!listOpen);
  };
  const handleTextPress = () => {
    setTextOpen(!textOpen);
  };

  const listProps = {
    cx: cx,
    orientation: "horizontal" as Orientation,
    style: {
      "--component-item-size": 24,
    } as React.CSSProperties,
  };

  return (
    <>
      <Text cx="instructions">
        All of the examples and components in this page are created with the
        same base components used in Navigation. Expand a section to read about
        the component.
      </Text>
      <List {...listProps}>
        <ListItem>
          <Button
            aria-expanded={textOpen}
            aria-controls="text"
            cx="text"
            onPress={handleTextPress}
          >
            {textLabel}
            <Icon IconComponent={ChevronRightIcon} isSilent={true} />
          </Button>
          {textOpen && (
            <Box cx="text" id="text">
              <Heading headingLevel={headingLevel}>Text Component</Heading>
              <Text>
                A Text component encapsulates content within either a &lt;p
                /&gt; or &lt;span /&gt; tag. Certain accessibility features such
                as hiding the text visually, while still allowing it to be in
                the DOM for screen readers adds to the tags basic functionality.
              </Text>
            </Box>
          )}
        </ListItem>

        <ListItem>
          <Button
            aria-expanded={headingOpen}
            aria-controls="heading"
            cx="heading"
            onPress={handleHeadingPress}
          >
            {headingLabel}
            <Icon IconComponent={ChevronRightIcon} isSilent={true} />
          </Button>
          {headingOpen && (
            <Box cx="heading" id="heading">
              <Heading headingLevel={headingLevel}>Heading Component</Heading>
              <Text>
                A Heading component allows for display of &lt;H1 /&gt; - &lt;H6
                /&gt; tags in a uniform manner. As with the Text component,
                additional modifications are added to allow for hiding headings
                from the screen while still exposing them to screen readers.
              </Text>
            </Box>
          )}
        </ListItem>

        <ListItem>
          <Button
            aria-expanded={listOpen}
            aria-controls="list"
            cx="list"
            onPress={handleListPress}
          >
            {listLabel}{" "}
            <Icon IconComponent={ChevronRightIcon} isSilent={true} />
          </Button>
          {listOpen && (
            <Box cx="list" id="list">
              <Heading headingLevel={headingLevel}>
                List and ListItem Components
              </Heading>
              <Text>
                List and ListItem Components wrap around their HTML
                counterparts, to render consistently and allow minimal styling
                for vertical or horizontal display.
              </Text>
            </Box>
          )}
        </ListItem>

        <ListItem>
          <Button
            aria-expanded={linkOpen}
            aria-controls="link"
            cx="link"
            onPress={handleLinkPress}
          >
            {linkLabel}{" "}
            <Icon IconComponent={ChevronRightIcon} isSilent={true} />
          </Button>
          {linkOpen && (
            <Box cx="link" id="link">
              <Heading headingLevel={headingLevel}>Link Component</Heading>
              <Text>
                A link component renders the &lt;a /&gt; element, adding
                consistent base styling and exposing all html attributes.
              </Text>
              <Text>
                The component used in this demonstration implements wrapping the{" "}
                <Link
                  href="https://nextjs.org/docs/app/api-reference/components/link"
                  openInNewTab={true}
                >
                  Next.js/Link
                </Link>
                component, along with adding a variety of accessibility and
                security features.
              </Text>
              <Text>
                Whether creating something new or evaluating a third party link
                component, make sure it conforms to the techniques listed by
                Deque&#39;s{" "}
                <Link
                  href="https://dequeuniversity.com/checklists/web/links"
                  openInNewTab={true}
                >
                  link checklist
                </Link>{" "}
                which includes{" "}
                <abbr title="Web Content Accessibility Guidelines">WCAG</abbr>{" "}
                references.
              </Text>
            </Box>
          )}
        </ListItem>

        <ListItem>
          <Button
            aria-expanded={buttonOpen}
            aria-controls="button"
            cx="button"
            onPress={handleButtonPress}
          >
            {buttonLabel}{" "}
            <Icon IconComponent={ChevronRightIcon} isSilent={true} />
          </Button>
          {buttonOpen && (
            <Box cx="button" id="button">
              <Heading headingLevel={headingLevel}>Button Component </Heading>
              <Text>
                Button components should render the HTML &lt;button /&gt;
                element. A button, when triggered by a user, causes something to
                happen on a page, which then either stays on the same page or,
                in the case of a submit button, can send the page somewhere
                else. Buttons should not be used to send a link to another page,
                no matter how tempting.
              </Text>
              <Text>
                All buttons in these examples use the button from the{" "}
                <Link href="https://react-spectrum.adobe.com/react-aria/Button.html">
                  React Aria Component Library
                </Link>
                , an unstyled component library offered by Adobe.
              </Text>
              <Text>
                A synopsis of button requirements to achieve accessibility is
                detailed in this accompanying article.
              </Text>
              <List>
                <ListItem>
                  <Text>
                    <Link
                      href="https://jessijokes.medium.com/one-button-to-rule-them-all-465e294cba82"
                      openInNewTab={true}
                    >
                      One Button to Rule Them All
                    </Link>
                  </Text>
                </ListItem>
                <ListItem>
                  <Text>
                    <Link
                      href="https://www.magentaa11y.com/#/web-criteria/component/button"
                      openInNewTab={true}
                    >
                      How to test a button
                    </Link>
                  </Text>
                </ListItem>
              </List>
            </Box>
          )}
        </ListItem>
      </List>{" "}
    </>
  );
}
