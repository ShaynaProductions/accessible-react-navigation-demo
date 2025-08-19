import { render, userEvent } from "@/test";
import fs from "fs";
import {
  Box,
  Button,
  Navigation,
  NavigationProps,
  transformNavigation,
} from "@/source/components";

const jsonObj = fs.readFileSync(
  "public/__static__/SimpleStructureWithSubNav.json",
  "utf8",
);
const nav = JSON.parse(jsonObj);

const TEST_ID = "navigation";
const endButtonLabel = "Focusable End";
const frontButtonLabel = "Focusable Front";

const renderNavigation = ({ children, label, ...rest }: NavigationProps) => {
  return render(
    <Box cx="simple">
      <Button id="front" testId={`${TEST_ID}-front`}>
        {frontButtonLabel}
      </Button>
      <Navigation label={label} testId={TEST_ID} {...rest}>
        {children}
      </Navigation>
      <Button id="button-end" testId={`${TEST_ID}-end`}>
        {endButtonLabel}
      </Button>
    </Box>,
  );
};
describe("Single SubMenu Navigation Next Down Arrow", () => {
  const reqProps = {
    children: transformNavigation(nav.navigation, TEST_ID),
    id: "main-menu",
    label: "Single Sub Menu",
  };

  // Down/Right Arrow.
  it("should move focus to it's next sibling when it's dropdown is collapsed.", async () => {
    const { getByRole, getByTestId } = renderNavigation(reqProps);
    const aboutLink = getByRole("link", { name: "About" });
    const readButton = getByRole("button", { name: "Read sub menu" });
    const readMenu = getByTestId(`${TEST_ID}-read-menu-read-menu-list`);
    const blogLink = getByRole("link", { name: "Musings" });

    expect(readMenu).toHaveClass("srOnly");
    await userEvent.pointer({ target: readButton, keys: "[MouseLeft]" });
    expect(readMenu).not.toHaveClass("srOnly");
    await userEvent.keyboard("{Enter}");
    expect(readMenu).toHaveClass("srOnly");
    await userEvent.keyboard("{ArrowDown}");
    expect(blogLink).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    expect(aboutLink).toHaveFocus();
  });

  it("should move focus to it's first child when it's dropdown is open.", async () => {
    const { getByRole, getByTestId } = renderNavigation(reqProps);
    const readButton = getByRole("button", { name: "Read sub menu" });
    const readMenu = getByTestId(`${TEST_ID}-read-menu-read-menu-list`);
    const storyLink = getByRole("link", { name: "Stories" });
    await userEvent.pointer({ target: readButton, keys: "[MouseLeft]" });
    expect(readMenu).not.toHaveClass("srOnly");
    await userEvent.keyboard("{ArrowDown}");
    expect(storyLink).toHaveFocus();
  });

  it("should move to it's top parent when focused on the last possible element in the subnavigation on arrowDown", async () => {
    const { getByRole, getByTestId } = renderNavigation(reqProps);
    const readButton = getByRole("button", { name: "Read sub menu" });
    const readMenu = getByTestId(`${TEST_ID}-read-menu-read-menu-list`);
    const storyLink = getByRole("link", { name: "Stories" });
    const referenceButton = getByRole("button", { name: "Reference sub menu" });
    const appendicesLink = getByRole("link", { name: "Appendices" });

    await userEvent.pointer({ target: readButton, keys: "[MouseLeft]" });
    expect(readMenu).not.toHaveClass("srOnly");
    await userEvent.keyboard("{ArrowDown}");
    expect(storyLink).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    await userEvent.keyboard("{ArrowDown}");
    expect(referenceButton).toHaveFocus();
    await userEvent.keyboard("{Enter}");
    await userEvent.keyboard("{ArrowDown}");
    await userEvent.keyboard("{ArrowDown}");
    await userEvent.keyboard("{ArrowDown}");
    expect(appendicesLink).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    expect(readButton).toHaveFocus();
  });
});

describe("Single Subnavigation Tab", () => {
  const reqProps = {
    children: transformNavigation(nav.navigation, TEST_ID),
    id: "main-menu",
    label: "Single Sub Menu",
  };
  it("should move focus to it's next sibling when it's dropdown is collapsed except when it is the last item.", async () => {
    const { getByRole, getByTestId } = renderNavigation(reqProps);
    const aboutLink = getByRole("link", { name: "About" });
    const readButton = getByRole("button", { name: "Read sub menu" });
    const readMenu = getByTestId(`${TEST_ID}-read-menu-read-menu-list`);
    const blogLink = getByRole("link", { name: "Musings" });

    expect(readMenu).toHaveClass("srOnly");
    await userEvent.pointer({ target: readButton, keys: "[MouseLeft]" });
    expect(readMenu).not.toHaveClass("srOnly");
    await userEvent.keyboard("{Enter}");
    expect(readMenu).toHaveClass("srOnly");
    await userEvent.tab();
    expect(blogLink).toHaveFocus();
    await userEvent.tab();
    expect(aboutLink).not.toHaveFocus();
  });

  it("should move focus to it's first child when it's dropdown is open.", async () => {
    const { getByRole, getByTestId } = renderNavigation(reqProps);
    const readButton = getByRole("button", { name: "Read sub menu" });
    const readMenu = getByTestId(`${TEST_ID}-read-menu-read-menu-list`);
    const storyLink = getByRole("link", { name: "Stories" });
    await userEvent.pointer({ target: readButton, keys: "[MouseLeft]" });
    expect(readMenu).not.toHaveClass("srOnly");
    await userEvent.tab();
    expect(storyLink).toHaveFocus();
  });

  it("should move to it's top parent's next sibling when focused on the last possible element in the subnavigation on arrowDown, except when it is the very last element on the top row", async () => {
    const { getByRole, getByTestId } = renderNavigation(reqProps);
    const readButton = getByRole("button", { name: "Read sub menu" });
    const readMenu = getByTestId(`${TEST_ID}-read-menu-read-menu-list`);
    const storyLink = getByRole("link", { name: "Stories" });
    const referenceButton = getByRole("button", { name: "Reference sub menu" });
    const appendicesLink = getByRole("link", { name: "Appendices" });

    /* TODO: Needs to be updated when tab out is fixed. */

    await userEvent.pointer({ target: readButton, keys: "[MouseLeft]" });
    expect(readMenu).not.toHaveClass("srOnly");
    await userEvent.tab();
    expect(storyLink).toHaveFocus();
    await userEvent.tab();
    await userEvent.tab();
    expect(referenceButton).toHaveFocus();
    await userEvent.keyboard("{Enter}");
    await userEvent.tab();
    await userEvent.tab();
    await userEvent.tab();
    expect(appendicesLink).toHaveFocus();
    await userEvent.tab();
    expect(readButton).toHaveFocus();
  });

  it("if top row; should move focus out of the component when it's the last child (button closed subnav or link)", async () => {
    const { getByRole, getByTestId } = renderNavigation(reqProps);
    const readButton = getByRole("button", { name: "Read sub menu" });
    const readMenu = getByTestId(`${TEST_ID}-read-menu-read-menu-list`);
    const storyLink = getByRole("link", { name: "Stories" });
    const referenceButton = getByRole("button", { name: "Reference sub menu" });
    const appendicesLink = getByRole("link", { name: "Appendices" });

    /* TODO: Needs to be updated when tab out is fixed. */

    await userEvent.pointer({ target: readButton, keys: "[MouseLeft]" });
    expect(readMenu).not.toHaveClass("srOnly");
    await userEvent.tab();
    expect(storyLink).toHaveFocus();
    await userEvent.tab();
    await userEvent.tab();
    expect(referenceButton).toHaveFocus();
    await userEvent.keyboard("{Enter}");
    await userEvent.tab();
    await userEvent.tab();
    await userEvent.tab();
    expect(appendicesLink).toHaveFocus();
    await userEvent.tab();
    expect(readButton).toHaveFocus();
  });
});

describe("Single SubMenu Behaviors", () => {
  const reqProps = {
    children: transformNavigation(nav.navigation, TEST_ID),
    id: "main-menu",
    label: "Single Sub Menu",
  };
  it("should close children subnavigation when closed itself", async () => {
    const { getByRole, getByTestId } = renderNavigation(reqProps);

    const frontButton = getByRole("button", { name: frontButtonLabel });
    const aboutLink = getByRole("link", { name: "About" });
    const readButton = getByRole("button", { name: "Read sub menu" });
    const readMenu = getByTestId(`${TEST_ID}-read-menu-read-menu-list`);
    const storyLink = getByRole("link", { name: "Stories" });
    const commentaryLink = getByRole("link", { name: "Commentary" });
    const referenceButton = getByRole("button", { name: "Reference sub menu" });
    const referenceMenu = getByTestId(
      `${TEST_ID}-reference-menu-reference-menu-list`,
    );

    await userEvent.tab();
    expect(frontButton).toHaveFocus();
    await userEvent.tab();
    expect(aboutLink).toHaveFocus();
    await userEvent.tab();
    expect(readButton).toHaveFocus();
    expect(readMenu).toHaveClass("srOnly");
    await userEvent.keyboard("{Enter}");
    expect(readMenu).not.toHaveClass("srOnly");
    await userEvent.keyboard("{ArrowDown}");
    expect(storyLink).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    expect(commentaryLink).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    expect(referenceButton).toHaveFocus();
    expect(referenceMenu).toHaveClass("srOnly");
    await userEvent.keyboard("{Enter}");
    expect(referenceMenu).not.toHaveClass("srOnly");
    await userEvent.keyboard("{ArrowUp}");
    await userEvent.keyboard("{ArrowUp}");
    await userEvent.keyboard("{ArrowUp}");
    expect(readButton).toHaveFocus();
    expect(readMenu).not.toHaveClass("srOnly");
    await userEvent.keyboard("{Enter}");
    expect(readMenu).toHaveClass("srOnly");
    expect(referenceMenu).toHaveClass("srOnly");
  });
  it("should trigger basic keyboard navigation on a button when list is closed", async () => {
    const { getByRole, getByTestId } = renderNavigation(reqProps);

    const frontButton = getByRole("button", { name: frontButtonLabel });
    const aboutLink = getByRole("link", { name: "About" });
    const readButton = getByRole("button", { name: "Read sub menu" });
    const readMenu = getByTestId(`${TEST_ID}-read-menu-read-menu-list`);
    const blogLink = getByRole("link", { name: "Musings" });

    await userEvent.tab();
    expect(frontButton).toHaveFocus();
    await userEvent.tab();
    expect(aboutLink).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    expect(readButton).toHaveFocus();
    expect(readMenu).toHaveClass("srOnly");
    await userEvent.keyboard("{Home}");
    expect(aboutLink).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    expect(readButton).toHaveFocus();
    await userEvent.keyboard("{End}");
    expect(blogLink).toHaveFocus();
    await userEvent.keyboard("{ArrowUp}");
    expect(readButton).toHaveFocus();

    await userEvent.keyboard("{ArrowUp}");
    expect(aboutLink).toHaveFocus();
    await userEvent.keyboard("{ArrowRight}");
    expect(readButton).toHaveFocus();
    await userEvent.keyboard("{ArrowLeft}");
    expect(aboutLink).toHaveFocus();
    await userEvent.keyboard("{ArrowRight}");
    expect(readButton).toHaveFocus();
    await userEvent.keyboard("{ArrowRight}");
    expect(blogLink).toHaveFocus();
    await userEvent.keyboard("{ArrowLeft}");
    expect(readButton).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    expect(blogLink).toHaveFocus();
  });

  it("should tab up through the open the read and reference subnavigation and exit at the top.", async () => {
    const { getByRole, getByTestId } = renderNavigation(reqProps);
    const endButton = getByRole("button", { name: endButtonLabel });

    const frontButton = getByRole("button", { name: frontButtonLabel });
    const aboutLink = getByRole("link", { name: "About" });
    const readButton = getByRole("button", { name: "Read sub menu" });
    const readMenu = getByTestId(`${TEST_ID}-read-menu-read-menu-list`);
    const storyLink = getByRole("link", { name: "Stories" });
    const commentaryLink = getByRole("link", { name: "Commentary" });
    const referenceButton = getByRole("button", { name: "Reference sub menu" });

    const charactersLink = getByRole("link", { name: "Characters" });
    const glossaryLink = getByRole("link", { name: "Glossary" });
    const appendicesLink = getByRole("link", { name: "Appendices" });
    const blogLink = getByRole("link", { name: "Musings" });

    // set up scenario with pointer events.
    await userEvent.pointer({ keys: "[MouseLeft]", target: readButton });
    await userEvent.pointer({ keys: "[MouseLeft]", target: referenceButton });
    await userEvent.pointer({ keys: "[MouseLeft]", target: endButton });

    // begin interactions
    expect(endButton).toHaveFocus();
    await userEvent.tab({ shift: true });
    expect(blogLink).toHaveFocus();
    await userEvent.tab({ shift: true });
    expect(appendicesLink).toHaveFocus();
    await userEvent.tab({ shift: true });
    expect(glossaryLink).toHaveFocus();
    await userEvent.tab({ shift: true });
    expect(charactersLink).toHaveFocus();
    await userEvent.tab({ shift: true });
    expect(referenceButton).toHaveFocus();
    await userEvent.keyboard("{Enter}");
    await userEvent.tab({ shift: true });
    expect(commentaryLink).toHaveFocus();
    await userEvent.tab({ shift: true });

    expect(storyLink).toHaveFocus();
    await userEvent.tab({ shift: true });
    expect(readButton).toHaveFocus();
    expect(readMenu).not.toHaveClass("srOnly");
    await userEvent.keyboard("{Enter}");
    expect(readMenu).toHaveClass("srOnly");
    await userEvent.tab({ shift: true });
    expect(aboutLink).toHaveFocus();
    await userEvent.tab({ shift: true });
    expect(frontButton).toHaveFocus();
    await userEvent.tab();
    expect(aboutLink).toHaveFocus();
    await userEvent.keyboard("{ArrowUp}");
    expect(blogLink).toHaveFocus();
    await userEvent.tab({ shift: true });
    expect(readButton).toHaveFocus();
    await userEvent.tab({ shift: true });
    expect(aboutLink).toHaveFocus();
  });
});
// it("should trigger basic keyboard navigation on a button when list is closed", async () => {
//   const { getByRole, getByTestId } = renderNavigation(reqProps);
//
//   const frontButton = getByRole("button", { name: frontButtonLabel });
//   const aboutLink = getByRole("link", { name: "About" });
//   const readButton = getByRole("button", { name: "Read sub menu" });
//   const readMenu = getByTestId(`${TEST_ID}-read-menu-read-menu-list`);
//   const blogLink = getByRole("link", { name: "Musings" });
//
//   await userEvent.tab();
//   expect(frontButton).toHaveFocus();
//   await userEvent.tab();
//   expect(aboutLink).toHaveFocus();
//   await userEvent.keyboard("{ArrowDown}");
//   expect(readButton).toHaveFocus();
//   expect(readMenu).toHaveClass("srOnly");
//   await userEvent.keyboard("{Home}");
//   expect(aboutLink).toHaveFocus();
//   await userEvent.keyboard("{ArrowDown}");
//   expect(readButton).toHaveFocus();
//   await userEvent.keyboard("{End}");
//   expect(blogLink).toHaveFocus();
//   await userEvent.keyboard("{ArrowUp}");
//   expect(readButton).toHaveFocus();
//
//   await userEvent.keyboard("{ArrowUp}");
//   expect(aboutLink).toHaveFocus();
//   await userEvent.keyboard("{ArrowRight}");
//   expect(readButton).toHaveFocus();
//   await userEvent.keyboard("{ArrowLeft}");
//   expect(aboutLink).toHaveFocus();
//   await userEvent.keyboard("{ArrowRight}");
//   expect(readButton).toHaveFocus();
//   await userEvent.keyboard("{ArrowRight}");
//   expect(blogLink).toHaveFocus();
//   await userEvent.keyboard("{ArrowLeft}");
//   expect(readButton).toHaveFocus();
//   await userEvent.keyboard("{ArrowDown}");
//   expect(blogLink).toHaveFocus();
// });
//
// it("should demonstrate different behaviors when down is pressed on a button dependent on its list state", async () => {
//   const { getByRole, getByTestId } = renderNavigation(reqProps);
//   const frontButton = getByRole("button", { name: frontButtonLabel });
//   const aboutLink = getByRole("link", { name: "About" });
//   const readButton = getByRole("button", { name: "Read sub menu" });
//   const readMenu = getByTestId(`${TEST_ID}-read-menu-read-menu-list`);
//   const storyLink = getByRole("link", { name: "Stories" });
//   const commentaryLink = getByRole("link", { name: "Commentary" });
//   const referenceButton = getByRole("button", { name: "Reference sub menu" });
//   const blogLink = getByRole("link", { name: "Musings" });
//
//   await userEvent.tab();
//   expect(frontButton).toHaveFocus();
//   await userEvent.tab();
//   expect(aboutLink).toHaveFocus();
//   await userEvent.keyboard("{ArrowDown}");
//   expect(readButton).toHaveFocus();
//   expect(readMenu).toHaveClass("srOnly");
//   await userEvent.keyboard("{ArrowDown}");
//   expect(blogLink).toHaveFocus();
//
//   await userEvent.keyboard("{ArrowUp}");
//
//   expect(readButton).toHaveFocus();
//   await userEvent.keyboard("{Enter}");
//   expect(readMenu).not.toHaveClass("srOnly");
//   await userEvent.keyboard("{ArrowDown}");
//   expect(storyLink).toHaveFocus();
//   await userEvent.keyboard("{ArrowDown}");
//   expect(commentaryLink).toHaveFocus();
//   await userEvent.keyboard("{ArrowDown}");
//   expect(referenceButton).toHaveFocus();
//   await userEvent.keyboard("{ArrowDown}");
//   expect(readButton).toHaveFocus();
// });
//
// it("should move down through the list and open the read menu.", async () => {
//   const { getByRole, getByTestId } = renderNavigation(reqProps);
//   const frontButton = getByRole("button", { name: frontButtonLabel });
//   const aboutLink = getByRole("link", { name: "About" });
//   const readButton = getByRole("button", { name: "Read sub menu" });
//   const readMenu = getByTestId(`${TEST_ID}-read-menu-read-menu-list`);
//   const storyLink = getByRole("link", { name: "Stories" });
//   const commentaryLink = getByRole("link", { name: "Commentary" });
//   const referenceButton = getByRole("button", { name: "Reference sub menu" });
//   const charactersLink = getByRole("link", { name: "Characters" });
//   const glossaryLink = getByRole("link", { name: "Glossary" });
//   const appendicesLink = getByRole("link", { name: "Appendices" });
//   const blogLink = getByRole("link", { name: "Musings" });
//
//   await userEvent.tab();
//   expect(frontButton).toHaveFocus();
//   await userEvent.tab();
//   expect(aboutLink).toHaveFocus();
//   await userEvent.keyboard("{ArrowDown}");
//   expect(readButton).toHaveFocus();
//   expect(readMenu).toHaveClass("srOnly");
//   await userEvent.keyboard("{Enter}");
//   expect(readMenu).not.toHaveClass("srOnly");
//   await userEvent.keyboard("{Enter}");
//
//   expect(readMenu).toHaveClass("srOnly");
//   await userEvent.keyboard("{Enter}");
//
//   expect(readMenu).not.toHaveClass("srOnly");
//   await userEvent.keyboard("{Down}");
//   expect(storyLink).toHaveFocus();
//   await userEvent.keyboard("{Down}");
//   expect(commentaryLink).toHaveFocus();
//   await userEvent.keyboard("{Down}");
//   expect(referenceButton).toHaveFocus();
//   await userEvent.keyboard("{Enter}");
//   await userEvent.keyboard("{Down}");
//   expect(charactersLink).toHaveFocus();
//   await userEvent.keyboard("{Down}");
//   expect(glossaryLink).toHaveFocus();
//   await userEvent.keyboard("{Down}");
//   expect(appendicesLink).toHaveFocus();
//   await userEvent.keyboard("{Down}");
//   expect(readButton).toHaveFocus();
// });
// it("should move up through the list and open the read menu.", async () => {
//   const { getByRole, getByTestId } = renderNavigation(reqProps);
//   const frontButton = getByRole("button", { name: frontButtonLabel });
//   const aboutLink = getByRole("link", { name: "About" });
//   const readButton = getByRole("button", { name: "Read sub menu" });
//   const readMenu = getByTestId(`${TEST_ID}-read-menu-read-menu-list`);
//   const storyLink = getByRole("link", { name: "Stories" });
//   const commentaryLink = getByRole("link", { name: "Commentary" });
//   const referenceButton = getByRole("button", { name: "Reference sub menu" });
//
//   const charactersLink = getByRole("link", { name: "Characters" });
//   const appendicesLink = getByRole("link", { name: "Appendices" });
//   const blogLink = getByRole("link", { name: "Musings" });
//
//   await userEvent.tab();
//   expect(frontButton).toHaveFocus();
//   await userEvent.tab();
//   expect(aboutLink).toHaveFocus();
//   await userEvent.keyboard("{ArrowUp}");
//   expect(blogLink).toHaveFocus();
//   await userEvent.keyboard("{ArrowUp}");
//   expect(readButton).toHaveFocus();
//   expect(readMenu).toHaveClass("srOnly");
//   await userEvent.keyboard("{Enter}");
//   expect(readMenu).not.toHaveClass("srOnly");
//   await userEvent.keyboard("{ArrowDown}");
//   await userEvent.keyboard("{ArrowDown}");
//   expect(commentaryLink).toHaveFocus();
//   await userEvent.keyboard("{ArrowUp}");
//   expect(storyLink).toHaveFocus();
//   await userEvent.keyboard("{ArrowUp}");
//   expect(readButton).toHaveFocus();
//   await userEvent.keyboard("{ArrowUp}");
//   expect(aboutLink).toHaveFocus();
//   await userEvent.keyboard("{ArrowDown}");
//   expect(readButton).toHaveFocus();
//   await userEvent.keyboard("{ArrowDown}");
//   await userEvent.keyboard("{ArrowDown}");
//   await userEvent.keyboard("{ArrowDown}");
//   expect(referenceButton).toHaveFocus();
//   await userEvent.keyboard("{Enter}");
//   await userEvent.keyboard("{ArrowDown}");
//   expect(charactersLink).toHaveFocus();
//   await userEvent.keyboard("{ArrowUp}");
//   expect(referenceButton).toHaveFocus();
//   await userEvent.keyboard("{Enter}");
//   await userEvent.keyboard("{ArrowDown}");
//   expect(readButton).toHaveFocus();
//   await userEvent.keyboard("{ArrowDown}");
//   await userEvent.keyboard("{ArrowDown}");
//   expect(commentaryLink).toHaveFocus();
//   await userEvent.keyboard("{ArrowDown}");
//   expect(referenceButton).toHaveFocus();
//   await userEvent.keyboard("{ArrowDown}");
//   expect(readButton).toHaveFocus();
//   await userEvent.keyboard("{Enter}");
//   await userEvent.keyboard("{ArrowDown}");
//   expect(blogLink).toHaveFocus();
// });
//
// it("should tab down through the open the read and reference sub navigation and exit at the end .", async () => {
//   const { getByRole, getByTestId } = renderNavigation(reqProps);
//   const endButton = getByRole("button", { name: endButtonLabel });
//   const frontButton = getByRole("button", { name: frontButtonLabel });
//   const aboutLink = getByRole("link", { name: "About" });
//   const readButton = getByRole("button", { name: "Read sub menu" });
//   const readMenu = getByTestId(`${TEST_ID}-read-menu-read-menu-list`);
//   const storyLink = getByRole("link", { name: "Stories" });
//   const commentaryLink = getByRole("link", { name: "Commentary" });
//   const referenceButton = getByRole("button", { name: "Reference sub menu" });
//   const referenceMenu = getByTestId(
//     `${TEST_ID}-reference-menu-reference-menu-list`,
//   );
//   const charactersLink = getByRole("link", { name: "Characters" });
//   const glossaryLink = getByRole("link", { name: "Glossary" });
//   const appendicesLink = getByRole("link", { name: "Appendices" });
//   const blogLink = getByRole("link", { name: "Musings" });
//
//   await userEvent.tab();
//   expect(frontButton).toHaveFocus();
//   await userEvent.tab();
//   expect(aboutLink).toHaveFocus();
//   await userEvent.tab();
//   expect(readButton).toHaveFocus();
//   expect(readMenu).toHaveClass("srOnly");
//   await userEvent.keyboard("{Enter}");
//   expect(readMenu).not.toHaveClass("srOnly");
//   await userEvent.keyboard("{Enter}");
//
//   expect(readMenu).toHaveClass("srOnly");
//   await userEvent.keyboard("{Enter}");
//
//   expect(readMenu).not.toHaveClass("srOnly");
//   await userEvent.tab();
//   expect(storyLink).toHaveFocus();
//   await userEvent.tab();
//   expect(commentaryLink).toHaveFocus();
//   await userEvent.tab();
//   expect(referenceButton).toHaveFocus();
//   expect(referenceMenu).toHaveClass("srOnly");
//   await userEvent.keyboard("{Enter}");
//   expect(referenceMenu).not.toHaveClass("srOnly");
//   await userEvent.tab();
//   expect(charactersLink).toHaveFocus();
//   await userEvent.tab();
//   expect(glossaryLink).toHaveFocus();
//   await userEvent.tab();
//   expect(appendicesLink).toHaveFocus();
//   await userEvent.tab();
//   expect(blogLink).toHaveFocus();
//   await userEvent.tab();
//   expect(endButton).toHaveFocus();
// });
//
// it("should tab down when sub navigation is closed", async () => {
//   const { getByRole } = renderNavigation(reqProps);
//   const endButton = getByRole("button", { name: endButtonLabel });
//
//   const frontButton = getByRole("button", { name: frontButtonLabel });
//   const aboutLink = getByRole("link", { name: "About" });
//   const readButton = getByRole("button", { name: "Read sub menu" });
//   const blogLink = getByRole("link", { name: "Musings" });
//
//   await userEvent.pointer({ keys: "[MouseLeft]", target: frontButton });
//   expect(frontButton).toHaveFocus();
//   await userEvent.tab();
//   expect(aboutLink).toHaveFocus();
//   await userEvent.tab();
//   expect(readButton).toHaveFocus();
//   await userEvent.tab();
//   expect(blogLink).toHaveFocus();
//   await userEvent.tab();
//   expect(endButton).toHaveFocus();
// });
//
// it("should tab up through the open the read and reference subnavigation and exit at the top.", async () => {
//   const { getByRole, getByTestId } = renderNavigation(reqProps);
//   const endButton = getByRole("button", { name: endButtonLabel });
//
//   const frontButton = getByRole("button", { name: frontButtonLabel });
//   const aboutLink = getByRole("link", { name: "About" });
//   const readButton = getByRole("button", { name: "Read sub menu" });
//   const readMenu = getByTestId(`${TEST_ID}-read-menu-read-menu-list`);
//   const storyLink = getByRole("link", { name: "Stories" });
//   const commentaryLink = getByRole("link", { name: "Commentary" });
//   const referenceButton = getByRole("button", { name: "Reference sub menu" });
//
//   const charactersLink = getByRole("link", { name: "Characters" });
//   const glossaryLink = getByRole("link", { name: "Glossary" });
//   const appendicesLink = getByRole("link", { name: "Appendices" });
//   const blogLink = getByRole("link", { name: "Musings" });
//
//   // set up scenario with pointer events.
//   await userEvent.pointer({ keys: "[MouseLeft]", target: readButton });
//   await userEvent.pointer({ keys: "[MouseLeft]", target: referenceButton });
//   await userEvent.pointer({ keys: "[MouseLeft]", target: endButton });
//
//   // begin interactions
//   expect(endButton).toHaveFocus();
//   await userEvent.tab({ shift: true });
//   expect(blogLink).toHaveFocus();
//   await userEvent.tab({ shift: true });
//   expect(appendicesLink).toHaveFocus();
//   await userEvent.tab({ shift: true });
//   expect(glossaryLink).toHaveFocus();
//   await userEvent.tab({ shift: true });
//   expect(charactersLink).toHaveFocus();
//   await userEvent.tab({ shift: true });
//   expect(referenceButton).toHaveFocus();
//   await userEvent.keyboard("{Enter}");
//   await userEvent.tab({ shift: true });
//   expect(commentaryLink).toHaveFocus();
//   await userEvent.tab({ shift: true });
//
//   expect(storyLink).toHaveFocus();
//   await userEvent.tab({ shift: true });
//   expect(readButton).toHaveFocus();
//   expect(readMenu).not.toHaveClass("srOnly");
//   await userEvent.keyboard("{Enter}");
//   expect(readMenu).toHaveClass("srOnly");
//   await userEvent.tab({ shift: true });
//   expect(aboutLink).toHaveFocus();
//   await userEvent.tab({ shift: true });
//   expect(frontButton).toHaveFocus();
//   await userEvent.tab();
//   expect(aboutLink).toHaveFocus();
//   await userEvent.keyboard("{ArrowUp}");
//   expect(blogLink).toHaveFocus();
//   await userEvent.tab({ shift: true });
//   expect(readButton).toHaveFocus();
//   await userEvent.tab({ shift: true });
//   expect(aboutLink).toHaveFocus();
// });
//
// it("should close children subnavigation when closed itself", async () => {
//   const { getByRole, getByTestId } = renderNavigation(reqProps);
//
//   const frontButton = getByRole("button", { name: frontButtonLabel });
//   const aboutLink = getByRole("link", { name: "About" });
//   const readButton = getByRole("button", { name: "Read sub menu" });
//   const readMenu = getByTestId(`${TEST_ID}-read-menu-read-menu-list`);
//   const storyLink = getByRole("link", { name: "Stories" });
//   const commentaryLink = getByRole("link", { name: "Commentary" });
//   const referenceButton = getByRole("button", { name: "Reference sub menu" });
//   const referenceMenu = getByTestId(
//     `${TEST_ID}-reference-menu-reference-menu-list`,
//   );
//
//   await userEvent.tab();
//   expect(frontButton).toHaveFocus();
//   await userEvent.tab();
//   expect(aboutLink).toHaveFocus();
//   await userEvent.tab();
//   expect(readButton).toHaveFocus();
//   expect(readMenu).toHaveClass("srOnly");
//   await userEvent.keyboard("{Enter}");
//   expect(readMenu).not.toHaveClass("srOnly");
//   await userEvent.keyboard("{ArrowDown}");
//   expect(storyLink).toHaveFocus();
//   await userEvent.keyboard("{ArrowDown}");
//   expect(commentaryLink).toHaveFocus();
//   await userEvent.keyboard("{ArrowDown}");
//   expect(referenceButton).toHaveFocus();
//   expect(referenceMenu).toHaveClass("srOnly");
//   await userEvent.keyboard("{Enter}");
//   expect(referenceMenu).not.toHaveClass("srOnly");
//   await userEvent.keyboard("{ArrowUp}");
//   await userEvent.keyboard("{ArrowUp}");
//   await userEvent.keyboard("{ArrowUp}");
//   expect(readButton).toHaveFocus();
//   expect(readMenu).not.toHaveClass("srOnly");
//   await userEvent.keyboard("{Enter}");
//   expect(readMenu).toHaveClass("srOnly");
//   expect(referenceMenu).toHaveClass("srOnly");
// });
// })
