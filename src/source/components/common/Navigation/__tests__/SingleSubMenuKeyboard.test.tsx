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
describe("Single SubMenu Navigation", () => {
  const reqProps = {
    children: transformNavigation(nav.navigation, TEST_ID),
    id: "main-menu",
    label: "Single Sub Menu",
  };

  it("should move down through the list and open the read menu.", async () => {
    const { getByRole, getByTestId } = renderNavigation(reqProps);
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

    await userEvent.tab();
    expect(frontButton).toHaveFocus();
    await userEvent.tab();
    expect(aboutLink).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    expect(readButton).toHaveFocus();
    expect(readMenu).toHaveClass("srOnly");
    await userEvent.keyboard("{Enter}");
    expect(readMenu).not.toHaveClass("srOnly");
    await userEvent.keyboard("{Enter}");

    expect(readMenu).toHaveClass("srOnly");
    await userEvent.keyboard("{Enter}");

    expect(readMenu).not.toHaveClass("srOnly");
    await userEvent.keyboard("{Down}");
    expect(storyLink).toHaveFocus();
    await userEvent.keyboard("{Down}");
    expect(commentaryLink).toHaveFocus();
    await userEvent.keyboard("{Down}");
    expect(referenceButton).toHaveFocus();
    await userEvent.keyboard("{Enter}");
    await userEvent.keyboard("{Down}");
    expect(charactersLink).toHaveFocus();
    await userEvent.keyboard("{Down}");
    expect(glossaryLink).toHaveFocus();
    await userEvent.keyboard("{Down}");
    expect(appendicesLink).toHaveFocus();
    await userEvent.keyboard("{Down}");
    expect(blogLink).toHaveFocus();

    await userEvent.keyboard("{Down}");
    expect(aboutLink).toHaveFocus();
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

  it("should demonstrate different behaviors when down is pressed on a button dependent on its list state", async () => {
    const { getByRole, getByTestId } = renderNavigation(reqProps);
    const frontButton = getByRole("button", { name: frontButtonLabel });
    const aboutLink = getByRole("link", { name: "About" });
    const readButton = getByRole("button", { name: "Read sub menu" });
    const readMenu = getByTestId(`${TEST_ID}-read-menu-read-menu-list`);
    const storyLink = getByRole("link", { name: "Stories" });
    const commentaryLink = getByRole("link", { name: "Commentary" });
    const referenceButton = getByRole("button", { name: "Reference sub menu" });
    const blogLink = getByRole("link", { name: "Musings" });

    await userEvent.tab();
    expect(frontButton).toHaveFocus();
    await userEvent.tab();
    expect(aboutLink).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    expect(readButton).toHaveFocus();
    expect(readMenu).toHaveClass("srOnly");
    await userEvent.keyboard("{ArrowDown}");
    expect(blogLink).toHaveFocus();

    await userEvent.keyboard("{ArrowUp}");

    expect(readButton).toHaveFocus();
    await userEvent.keyboard("{Enter}");
    expect(readMenu).not.toHaveClass("srOnly");
    await userEvent.keyboard("{ArrowDown}");
    expect(storyLink).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    expect(commentaryLink).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    expect(referenceButton).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    expect(blogLink).toHaveFocus();
  });
});
