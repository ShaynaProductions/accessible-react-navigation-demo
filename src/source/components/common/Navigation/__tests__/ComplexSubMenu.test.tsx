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
  "public/__static__/complexStructureWithSubNav.json",
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

describe("Complex SubNavigation Next", () => {
  const reqProps = {
    children: transformNavigation(nav, TEST_ID),
    id: "main-menu",
    label: "Complex Sub Menu",
  };
  it("should move focus to it's next sibling when it's dropdown is collapsed.", async () => {
    const { getByRole, getByTestId } = renderNavigation(reqProps);

    const communityButton = getByRole("button", { name: "Community sub menu" });
    const communityMenu = getByTestId(
      `${TEST_ID}-community-menu-community-menu-list`,
    );
    const storiesButton = getByRole("button", {
      name: "Stories and Commentary sub menu",
    });
    const storiesMenu = getByTestId(
      `${TEST_ID}-stories-menu-stories-menu-list`,
    );

    const referenceButton = getByRole("button", { name: "Reference sub menu" });
    const referenceMenu = getByTestId(
      `${TEST_ID}-reference-menu-reference-menu-list`,
    );
    const aboutButton = getByRole("button", { name: "About sub menu" });
    const aboutMenu = getByTestId(`${TEST_ID}-about-menu-about-menu-list`);

    expect(storiesMenu).toHaveClass("srOnly");
    await userEvent.pointer({ target: storiesButton, keys: "[MouseLeft]" });
    expect(storiesMenu).not.toHaveClass("srOnly");
    await userEvent.keyboard("{Enter}");
    await userEvent.keyboard("{ArrowDown}");
    expect(referenceButton).toHaveFocus();
    expect(referenceMenu).toHaveClass("srOnly");
    await userEvent.keyboard("{ArrowDown}");
    expect(aboutButton).toHaveFocus();
    expect(aboutMenu).toHaveClass("srOnly");
    await userEvent.keyboard("{ArrowDown}");
    expect(communityButton).toHaveFocus();
    expect(communityMenu).toHaveClass("srOnly");
  });
  it("should move focus to it's first child when it's dropdown is open.", async () => {
    const { getByRole, getByTestId } = renderNavigation(reqProps);
    const storiesButton = getByRole("button", {
      name: "Stories and Commentary sub menu",
    });
    const storiesMenu = getByTestId(
      `${TEST_ID}-stories-menu-stories-menu-list`,
    );

    const storyLink = getByRole("link", { name: "All Stories" });

    await userEvent.pointer({ target: storiesButton, keys: "[MouseLeft]" });
    expect(storiesMenu).not.toHaveClass("srOnly");
    await userEvent.keyboard("{ArrowDown}");
    expect(storyLink).toHaveFocus();
  });

  // Down/Right Arrow. Last Child in SubNav
  it("if not top row: should move focus to it's parent when it's the last open child.", async () => {
    const { getByRole, getByTestId } = renderNavigation(reqProps);

    const storiesButton = getByRole("button", {
      name: "Stories and Commentary sub menu",
    });
    const storiesMenu = getByTestId(
      `${TEST_ID}-stories-menu-stories-menu-list`,
    );

    const storyLink = getByRole("link", { name: "All Stories" });

    const findStoryButton = getByRole("button", {
      name: "Find Your Next Story sub menu",
    });

    const findStoryMenu = getByTestId(
      `${TEST_ID}-find-your-next-story-find-your-next-story-list`,
    );
    const storytellerLink = getByRole("link", { name: "By Storyteller" });
    const eraLink = getByRole("link", { name: "By Era" });

    await userEvent.pointer({ target: storiesButton, keys: "[MouseLeft]" });
    expect(storiesMenu).not.toHaveClass("srOnly");
    await userEvent.keyboard("{ArrowDown}");
    expect(storyLink).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    await userEvent.keyboard("{ArrowDown}");
    expect(findStoryButton).toHaveFocus();
    await userEvent.keyboard("{Enter}");
    expect(findStoryMenu).not.toHaveClass("srOnly");
    await userEvent.keyboard("{ArrowDown}");
    expect(storytellerLink).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    expect(eraLink).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");

    expect(storiesButton).toHaveFocus();
  });

  it("if top row; should move focus out of the component when it's the last child (button closed subnav or link)", async () => {});
});

describe("Complex SubNavigation Previous", () => {
  const reqProps = {
    children: transformNavigation(nav, TEST_ID),
    id: "main-menu",
    label: "Complex Sub Menu",
  };

  it("Arrow Up should move focus to it's previous sibling, previous parent and then end of row when all dropdowns are collapsed and the parent is the first sibling", async () => {
    const { getByRole, getByTestId } = renderNavigation(reqProps);

    const communityButton = getByRole("button", { name: "Community sub menu" });
    const communityMenu = getByTestId(
      `${TEST_ID}-community-menu-community-menu-list`,
    );
    const blogLink = getByRole("link", { name: "Musings" });
    const forumLink = getByRole("link", { name: "Forum" });
    const aboutButton = getByRole("button", { name: "About sub menu" });

    expect(communityMenu).toHaveClass("srOnly");
    await userEvent.pointer({ target: communityButton, keys: "[MouseLeft]" });
    expect(communityMenu).not.toHaveClass("srOnly");
    await userEvent.keyboard("{ArrowDown}");
    await userEvent.keyboard("{ArrowDown}");
    expect(forumLink).toHaveFocus();
    await userEvent.keyboard("{ArrowUp}");
    expect(blogLink).toHaveFocus();
    await userEvent.keyboard("{ArrowUp}");
    expect(communityButton).toHaveFocus();
    await userEvent.keyboard("{ArrowUp}");
    expect(aboutButton).toHaveFocus();
  });
  it("shift Tab should move focus to it's previous sibling, previous parent and previous focusable item outside of the component.", async () => {
    const { getByRole, getByTestId } = renderNavigation(reqProps);

    const frontButton = getByRole("button", { name: frontButtonLabel });
    const communityButton = getByRole("button", { name: "Community sub menu" });
    const communityMenu = getByTestId(
      `${TEST_ID}-community-menu-community-menu-list`,
    );
    const blogLink = getByRole("link", { name: "Musings" });
    const forumLink = getByRole("link", { name: "Forum" });

    expect(communityMenu).toHaveClass("srOnly");
    await userEvent.pointer({ target: communityButton, keys: "[MouseLeft]" });
    expect(communityMenu).not.toHaveClass("srOnly");
    await userEvent.tab();
    await userEvent.tab();
    expect(forumLink).toHaveFocus();
    await userEvent.tab({ shift: true });
    expect(blogLink).toHaveFocus();
    await userEvent.tab({ shift: true });
    expect(communityButton).toHaveFocus();
    await userEvent.tab({ shift: true });
    expect(frontButton).toHaveFocus();
  });
});
describe("Multiple SubMenu Navigation", () => {
  const reqProps = {
    children: transformNavigation(nav, TEST_ID),
    id: "main-menu",
    label: "Complex Sub Menu",
  };

  it("should load the menu", async () => {
    const { getByRole, getByTestId } = renderNavigation(reqProps);

    const storiesButton = getByRole("button", {
      name: "Stories and Commentary sub menu",
    });
    const storiesMenu = getByTestId(
      `${TEST_ID}-stories-menu-stories-menu-list`,
    );

    const findStoryButton = getByRole("button", {
      name: "Find Your Next Story sub menu",
    });

    const findStoryMenu = getByTestId(
      `${TEST_ID}-find-your-next-story-find-your-next-story-list`,
    );
    const eraLink = getByRole("link", { name: "By Era" });

    expect(storiesButton).toBeInTheDocument();

    expect(storiesMenu).toBeInTheDocument();
    await userEvent.pointer({ target: storiesButton, keys: "[MouseLeft]" });
    expect(storiesButton).toBeInTheDocument();
    expect(storiesMenu).not.toHaveClass("srOnly");

    await userEvent.keyboard("{ArrowDown}");
    await userEvent.keyboard("{ArrowDown}");
    await userEvent.keyboard("{ArrowDown}");
    expect(findStoryButton).toHaveFocus();

    expect(findStoryMenu).toHaveClass("srOnly");
    await userEvent.keyboard("{Enter}");
    expect(findStoryMenu).not.toHaveClass("srOnly");

    await userEvent.keyboard("{ArrowDown}");
    await userEvent.keyboard("{ArrowDown}");
    expect(eraLink).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    expect(storiesButton).toHaveFocus();
  });

  it("should move through the first SubNav and end up on the parentButton.", async () => {
    const { getByRole, getByTestId } = renderNavigation(reqProps);
    const communityButton = getByRole("button", { name: "Community sub menu" });
    const communityNav = getByTestId(
      `${TEST_ID}-community-menu-community-menu-list`,
    );

    const blogLink = getByRole("link", { name: "Musings" });
    const forumLink = getByRole("link", { name: "Forum" });

    expect(forumLink).toBeInTheDocument();
    await userEvent.pointer({ target: communityButton, keys: "[MouseLeft]" });
    expect(communityNav).not.toHaveClass("srOnly");
    await userEvent.keyboard("{ArrowDown}");
    expect(blogLink).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    expect(forumLink).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    expect(communityButton).toHaveFocus();
  });

  it("should move from a closed subnav button at the end and it's parent's next sibling", async () => {
    const { getByRole, getByTestId } = renderNavigation(reqProps);
    const storiesButton = getByRole("button", {
      name: "Stories and Commentary sub menu",
    });
    const storiesMenu = getByTestId(
      `${TEST_ID}-stories-menu-stories-menu-list`,
    );
    const findStoryButton = getByRole("button", {
      name: "Find Your Next Story sub menu",
    });
    const findStoryMenu = getByTestId(
      `${TEST_ID}-find-your-next-story-find-your-next-story-list`,
    );
    const referenceButton = getByRole("button", { name: "Reference sub menu" });

    const referenceMenu = getByTestId(
      `${TEST_ID}-reference-menu-reference-menu-list`,
    );
    const endButton = getByRole("button", { name: endButtonLabel });

    expect(storiesButton).toBeInTheDocument();
    expect(storiesMenu).toHaveClass("srOnly");
    await userEvent.pointer({ target: storiesButton, keys: "[MouseLeft]" });
    expect(storiesMenu).not.toHaveClass("srOnly");
    await userEvent.tab();
    await userEvent.tab();
    await userEvent.tab();
    expect(findStoryButton).toHaveFocus();
    expect(findStoryMenu).toHaveClass("srOnly");
    await userEvent.tab();
    expect(referenceButton).toHaveFocus();
    expect(referenceMenu).toHaveClass("srOnly");
    await userEvent.tab();
    await userEvent.tab();
    expect(endButton).toHaveFocus();
  });

  it("should move from out of component to the last child on the top row if it is a button.", async () => {
    const { getByRole } = renderNavigation(reqProps);

    const aboutLink = getByRole("button", { name: "About sub menu" });
    const endButton = getByRole("button", { name: endButtonLabel });

    await userEvent.pointer({ target: endButton, keys: "[MouseLeft]" });
    expect(endButton).toHaveFocus();
    await userEvent.tab({ shift: true });
    expect(aboutLink).toHaveFocus();
  });

  it("should move out of component if the last child is a link and any open menus should be closed.", async () => {
    const { getByRole, getByTestId } = renderNavigation(reqProps);

    const aboutLink = getByRole("button", { name: "About sub menu" });
    const donateLink = getByRole("link", { name: "Donate" });
    const aboutMenu = getByTestId(`${TEST_ID}-about-menu-about-menu-list`);
    const endButton = getByRole("button", { name: endButtonLabel });

    await userEvent.pointer({ target: endButton, keys: "[MouseLeft]" });
    expect(endButton).toHaveFocus();
    await userEvent.tab({ shift: true });
    expect(aboutLink).toHaveFocus();
    expect(aboutMenu).toHaveClass("srOnly");
    await userEvent.keyboard("{Enter}");
    expect(aboutMenu).not.toHaveClass("srOnly");
    await userEvent.tab();
    await userEvent.tab();
    await userEvent.tab();
    await userEvent.tab();
    await userEvent.tab();
    expect(donateLink).toHaveFocus();
    await userEvent.tab();
    expect(endButton).toHaveFocus();
    expect(aboutMenu).toHaveClass("srOnly");
  });

  it("should move through the first row on right Arrow regardless of open subnav", async () => {
    const { getByRole, getByTestId } = renderNavigation(reqProps);

    const communityButton = getByRole("button", { name: "Community sub menu" });
    const communityMenu = getByTestId(
      `${TEST_ID}-community-menu-community-menu-list`,
    );
    const storiesButton = getByRole("button", {
      name: "Stories and Commentary sub menu",
    });

    await userEvent.pointer({ target: communityButton, keys: "[MouseLeft]" });
    expect(communityButton).toHaveFocus();
    expect(communityMenu).not.toHaveClass("srOnly");
    await userEvent.keyboard("{ArrowRight}");
    expect(storiesButton).toHaveFocus();
    expect(communityMenu).toHaveClass("srOnly");
  });
});

describe("Closing SubMenus", () => {
  const reqProps = {
    children: transformNavigation(nav, TEST_ID),
    id: "main-menu",
    label: "Complex Sub Menu",
  };

  it("should close all open siblings when a top row item is focused upon", async () => {
    const { getByRole, getByTestId } = renderNavigation(reqProps);

    const storiesButton = getByRole("button", {
      name: "Stories and Commentary sub menu",
    });
    const storiesMenu = getByTestId(
      `${TEST_ID}-stories-menu-stories-menu-list`,
    );
    const referenceButton = getByRole("button", { name: "Reference sub menu" });
    const referenceMenu = getByTestId(
      `${TEST_ID}-reference-menu-reference-menu-list`,
    );

    expect(storiesMenu).toHaveClass("srOnly");
    await userEvent.pointer({ target: storiesButton, keys: "[MouseLeft]" });
    expect(storiesMenu).not.toHaveClass("srOnly");
    await userEvent.pointer({ target: referenceButton, keys: "[MouseLeft]" });
    expect(referenceMenu).not.toHaveClass("srOnly");
    expect(storiesMenu).toHaveClass("srOnly");
  });

  it("should close all submenus and send focus to the last item in the top row when Escape is pushed.", async () => {
    const { getByRole, getByTestId } = renderNavigation(reqProps);

    const referenceButton = getByRole("button", { name: "Reference sub menu" });
    const referenceMenu = getByTestId(
      `${TEST_ID}-reference-menu-reference-menu-list`,
    );
    const characterLink = getByRole("link", { name: "Characters" });
    const aboutButton = getByRole("button", { name: "About sub menu" });

    await userEvent.pointer({ target: referenceButton, keys: "[MouseLeft]" });
    expect(referenceMenu).not.toHaveClass("srOnly");
    await userEvent.keyboard("{ArrowDown}");
    await userEvent.keyboard("{ArrowDown}");
    expect(characterLink).toHaveFocus();
    await userEvent.keyboard("{Escape}");
    expect(aboutButton).toHaveFocus();
  });
  // it.skip("should close all submenus when there is a click outside the component.", async () => {
  //   const { getByRole, getByTestId } = renderNavigation(reqProps);
  // });
});
