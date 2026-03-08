import { render, userEvent } from "@/test";
import fs from "fs";
import { Box, Button, Navigation, transformNavigation } from "@/ui/components";
import {
  getMultipleButtonsTestElements,
  getMultipleLinkTestElements,
  getSingleListTestElements,
} from "../utilities/renderedTestItems";

const multipleButtonsJSONObj = fs.readFileSync(
  "src/ui/__static__/multiple-lists-buttons.json",
  "utf8",
);

const multipleLinksJSONObj = fs.readFileSync(
  "src/ui/__static__/multiple-lists-link-ends.json",
  "utf8",
);

const singleListJSONObj = fs.readFileSync(
  "src/ui/__static__/single-list.json",
  "utf8",
);

const multipleButtons = JSON.parse(multipleButtonsJSONObj);
const multipleLinkEnds = JSON.parse(multipleLinksJSONObj);
const singleList = JSON.parse(singleListJSONObj);

const TEST_ID = "navigation";
const endButtonLabel = "Focusable End";
const frontButtonLabel = "Focusable Front";
const buttonChildren = transformNavigation(multipleButtons, TEST_ID);
const linkChildren = transformNavigation(multipleLinkEnds, TEST_ID);
const singleListChildren = transformNavigation(singleList, TEST_ID);

const renderNavigation = ({ label, children, ...rest }) => {
  return render(
    <Box cx="simple">
      {" "}
      <Button id="button-front" testId={TEST_ID && `${TEST_ID}-front`}>
        {frontButtonLabel}
      </Button>
      <Navigation
        id="test-menu"
        label={label}
        orientation="horizontal"
        testId={TEST_ID}
        {...rest}
      >
        {children}
      </Navigation>
      <Button id="button-end" testId={TEST_ID && `${TEST_ID}-end`}>
        {endButtonLabel}
      </Button>
    </Box>,
  );
};

const reqProps = {
  id: "main-menu",
  label: "Buttons SubNav List",
};

const buttonProps = {
  ...reqProps,
  children: buttonChildren,
};

const linkProps = {
  ...reqProps,
  children: linkChildren,
};

const singleListProps = {
  ...reqProps,
  children: singleListChildren,
};

describe("Navigation Keyboard Handling Tab", () => {
  it("should move down the list when Tab is pressed", async () => {
    /* conforms to Tab Handling AC 1 / 2 */
    const { getByRole } = renderNavigation(singleListProps);
    const {
      homeLink,
      baseComponentsLink,
      singleListLink,
      horizontalButtonsLink,
      horizontalLinkEndsLink,
      horizontalStyledLink,
      verticalStyledLink,
    } = getSingleListTestElements(getByRole);
    const endButton = getByRole("button", { name: endButtonLabel });

    await userEvent.tab();
    await userEvent.tab();
    expect(homeLink).toHaveFocus();
    await userEvent.tab();
    expect(baseComponentsLink).toHaveFocus();
    await userEvent.tab();
    expect(singleListLink).toHaveFocus();
    await userEvent.tab();
    expect(horizontalButtonsLink).toHaveFocus();
    await userEvent.tab();
    expect(horizontalLinkEndsLink).toHaveFocus();
    await userEvent.tab();
    expect(horizontalStyledLink).toHaveFocus();
    await userEvent.tab();
    expect(verticalStyledLink).toHaveFocus();
    await userEvent.tab();
    expect(endButton).toHaveFocus();
  });
  it("should move down through the top row of buttons when lists are closed", async () => {
    /* conforms to Tab Handling AC 1 /2 */
    const { getByTestId, getByRole } = renderNavigation(buttonProps);
    const frontButton = getByRole("button", { name: frontButtonLabel });
    const endButton = getByRole("button", { name: endButtonLabel });

    const {
      communityButton,
      communityList,
      storiesButton,
      referenceButton,
      aboutButton,
    } = getMultipleButtonsTestElements(getByRole, getByTestId, TEST_ID);

    await userEvent.tab();
    expect(frontButton).toHaveFocus();
    await userEvent.tab();
    expect(communityButton).toHaveFocus();
    expect(communityList).toHaveClass("srOnly");
    await userEvent.tab();
    expect(storiesButton).toHaveFocus();
    await userEvent.tab();
    expect(referenceButton).toHaveFocus();
    await userEvent.tab();
    expect(aboutButton).toHaveFocus();
    await userEvent.tab();
    expect(endButton).toHaveFocus();
  });

  it("should move through the top row of buttons and links when lists are closed", async () => {
    /* conforms to Tab Handling AC 1 / 3 */
    const { getByTestId, getByRole } = renderNavigation(linkProps);
    const frontButton = getByRole("button", { name: frontButtonLabel });
    const endButton = getByRole("button", { name: endButtonLabel });

    const { homeLink, contactInfoLink } =
      getMultipleLinkTestElements(getByRole);
    const {
      communityButton,
      communityList,
      storiesButton,
      referenceButton,
      aboutButton,
    } = getMultipleButtonsTestElements(getByRole, getByTestId, TEST_ID);

    await userEvent.tab();
    expect(frontButton).toHaveFocus();
    await userEvent.tab();
    expect(homeLink).toHaveFocus();
    await userEvent.tab();
    expect(communityButton).toHaveFocus();
    expect(communityList).toHaveClass("srOnly");
    await userEvent.tab();
    expect(storiesButton).toHaveFocus();
    await userEvent.tab();
    expect(referenceButton).toHaveFocus();
    await userEvent.tab();
    expect(aboutButton).toHaveFocus();
    await userEvent.tab();
    expect(contactInfoLink).toHaveFocus();
    await userEvent.tab();
    expect(endButton).toHaveFocus();
  });

  it("should move to the first child when a list is open", async () => {
    /* conforms to Tab Handling AC 1 */
    const { getByTestId, getByRole } = renderNavigation(buttonProps);
    const frontButton = getByRole("button", { name: frontButtonLabel });
    const {
      communityButton,
      communityList,
      blogLink,
      forumLink,
      storiesButton,
    } = getMultipleButtonsTestElements(getByRole, getByTestId, TEST_ID);

    await userEvent.tab();
    expect(frontButton).toHaveFocus();
    await userEvent.tab();
    expect(communityButton).toHaveFocus();
    expect(communityList).toHaveClass("srOnly");
    await userEvent.keyboard("{Enter}");
    expect(communityList).not.toHaveClass("srOnly");
    await userEvent.tab();
    expect(blogLink).toHaveFocus();
    await userEvent.tab();
    expect(forumLink).toHaveFocus();
    await userEvent.tab();
    expect(storiesButton).toHaveFocus();
  });

  it("should move to siblings when sublists are closed", async () => {
    /* conforms to Tab Handling AC 1 /4 */
    const { getByTestId, getByRole } = renderNavigation(linkProps);
    const frontButton = getByRole("button", { name: frontButtonLabel });
    const {
      communityButton,
      storiesButton,
      storiesList,
      searchButton,
      searchList,
      allStoriesLink,
      allCommentaryLink,
      findNextStoryButton,
      findNextStoryList,
      referenceButton,
      referenceList,
    } = getMultipleButtonsTestElements(getByRole, getByTestId, TEST_ID);
    const { homeLink, contactInfoLink } =
      getMultipleLinkTestElements(getByRole);

    await userEvent.tab();
    expect(frontButton).toHaveFocus();
    await userEvent.tab();
    expect(homeLink).toHaveFocus();
    await userEvent.tab();
    expect(communityButton).toHaveFocus();
    await userEvent.tab();
    expect(storiesButton).toHaveFocus();
    expect(storiesList).toHaveClass("srOnly");
    await userEvent.keyboard("{Enter}");
    expect(storiesList).not.toHaveClass("srOnly");
    await userEvent.tab();
    expect(searchButton).toHaveFocus();
    expect(searchList).toHaveClass("srOnly");
    await userEvent.tab();
    expect(allStoriesLink).toHaveFocus();
    await userEvent.tab();
    expect(allCommentaryLink).toHaveFocus();
    await userEvent.tab();
    expect(findNextStoryButton).toHaveFocus();
    expect(findNextStoryList).toHaveClass("srOnly");
    await userEvent.tab();
    expect(referenceButton).toHaveFocus();
    expect(referenceList).toHaveClass("srOnly");
    await userEvent.tab();
    await userEvent.tab();
    expect(contactInfoLink).toHaveFocus();
  });

  it("should move through sublists and siblings when sublists are open", async () => {
    /* conforms to Tab Handling AC 1 */
    const { getByTestId, getByRole } = renderNavigation(buttonProps);
    const frontButton = getByRole("button", { name: frontButtonLabel });
    const {
      communityButton,
      storiesButton,
      storiesList,
      searchButton,
      searchList,
      basicSearchLink,
      advancedSearchLink,
      allStoriesLink,
      allCommentaryLink,
      findNextStoryButton,
      findNextStoryList,
      byStorytellerLink,
      byEraLink,
      referenceButton,
    } = getMultipleButtonsTestElements(getByRole, getByTestId, TEST_ID);

    await userEvent.tab();
    expect(frontButton).toHaveFocus();
    await userEvent.tab();
    expect(communityButton).toHaveFocus();
    await userEvent.tab();
    expect(storiesButton).toHaveFocus();
    expect(storiesList).toHaveClass("srOnly");
    await userEvent.keyboard("{Enter}");
    expect(storiesList).not.toHaveClass("srOnly");
    await userEvent.tab();
    expect(searchButton).toHaveFocus();
    expect(searchList).toHaveClass("srOnly");
    await userEvent.keyboard("{Enter}");
    expect(searchList).not.toHaveClass("srOnly");
    await userEvent.tab();
    expect(basicSearchLink).toHaveFocus();
    await userEvent.tab();
    expect(advancedSearchLink).toHaveFocus();
    await userEvent.tab();
    expect(allStoriesLink).toHaveFocus();
    await userEvent.tab();
    expect(allCommentaryLink).toHaveFocus();
    await userEvent.tab();
    expect(findNextStoryButton).toHaveFocus();
    expect(findNextStoryList).toHaveClass("srOnly");
    await userEvent.keyboard("{Enter}");
    expect(findNextStoryList).not.toHaveClass("srOnly");
    await userEvent.tab();
    expect(byStorytellerLink).toHaveFocus();
    await userEvent.tab();
    expect(byEraLink).toHaveFocus();
    await userEvent.tab();
    expect(referenceButton).toHaveFocus();
  });
});

describe("Navigation Keyboard Handling Shift + Tab", () => {
  it("should move up the list when shift+Tab is pressed", async () => {
    /* conforms to Tab Handling AC 1 /2 */
    const { getByRole } = renderNavigation(singleListProps);

    const frontButton = getByRole("button", { name: frontButtonLabel });
    const {
      homeLink,
      baseComponentsLink,
      singleListLink,
      horizontalButtonsLink,
      horizontalLinkEndsLink,
      horizontalStyledLink,
      verticalStyledLink,
    } = getSingleListTestElements(getByRole);

    await userEvent.tab();
    await userEvent.tab();
    await userEvent.tab();
    await userEvent.tab();
    await userEvent.tab();
    await userEvent.tab();
    await userEvent.tab();
    await userEvent.tab();

    expect(verticalStyledLink).toHaveFocus();
    await userEvent.tab({ shift: true });
    expect(horizontalStyledLink).toHaveFocus();
    await userEvent.tab({ shift: true });
    expect(horizontalLinkEndsLink).toHaveFocus();
    await userEvent.tab({ shift: true });
    expect(horizontalButtonsLink).toHaveFocus();
    await userEvent.tab({ shift: true });
    expect(singleListLink).toHaveFocus();
    await userEvent.tab({ shift: true });
    expect(baseComponentsLink).toHaveFocus();
    await userEvent.tab({ shift: true });
    expect(homeLink).toHaveFocus();
    await userEvent.tab({ shift: true });
    expect(frontButton).toHaveFocus();
  });

  it("should move up through sublists and focus on Parent when in a sublist", async () => {
    /* conforms to Tab Handling AC 1 */
    const { getByTestId, getByRole } = renderNavigation(buttonProps);
    const frontButton = getByRole("button", { name: frontButtonLabel });
    const { communityButton, communityList, blogLink, forumLink } =
      getMultipleButtonsTestElements(getByRole, getByTestId, TEST_ID);

    await userEvent.tab();
    expect(frontButton).toHaveFocus();
    await userEvent.tab();
    expect(communityButton).toHaveFocus();
    expect(communityList).toHaveClass("srOnly");
    await userEvent.keyboard("{Enter}");
    expect(communityList).not.toHaveClass("srOnly");
    await userEvent.tab();
    expect(blogLink).toHaveFocus();
    await userEvent.tab();
    expect(forumLink).toHaveFocus();
    await userEvent.tab({ shift: true });
    expect(blogLink).toHaveFocus();
    await userEvent.tab({ shift: true });
    expect(communityButton).toHaveFocus();
    await userEvent.tab({ shift: true });
    expect(frontButton).toHaveFocus();
  });

  it("should move up through siblings and sublists when they are open", async () => {
    /* conforms to Tab Handling AC  1 */
    const { getByTestId, getByRole } = renderNavigation(buttonProps);
    const frontButton = getByRole("button", { name: frontButtonLabel });
    const {
      communityButton,
      storiesButton,
      storiesList,
      searchButton,
      searchList,
      basicSearchLink,
      advancedSearchLink,
      allStoriesLink,
      allCommentaryLink,
      findNextStoryButton,
      findNextStoryList,
      byStorytellerLink,
      byEraLink,
    } = getMultipleButtonsTestElements(getByRole, getByTestId, TEST_ID);

    await userEvent.tab();
    expect(frontButton).toHaveFocus();
    await userEvent.tab();
    expect(communityButton).toHaveFocus();
    await userEvent.tab();
    expect(storiesButton).toHaveFocus();
    expect(storiesList).toHaveClass("srOnly");
    await userEvent.keyboard("{Enter}");
    expect(storiesList).not.toHaveClass("srOnly");
    await userEvent.tab();
    expect(searchButton).toHaveFocus();
    expect(searchList).toHaveClass("srOnly");
    await userEvent.keyboard("{Enter}");
    expect(searchList).not.toHaveClass("srOnly");
    await userEvent.tab();
    expect(basicSearchLink).toHaveFocus();
    await userEvent.tab();
    await userEvent.tab();
    await userEvent.tab();
    await userEvent.tab();
    expect(findNextStoryButton).toHaveFocus();
    expect(findNextStoryList).toHaveClass("srOnly");
    await userEvent.keyboard("{Enter}");
    expect(findNextStoryList).not.toHaveClass("srOnly");
    await userEvent.tab();
    expect(byStorytellerLink).toHaveFocus();
    await userEvent.tab();
    expect(byEraLink).toHaveFocus();
    await userEvent.tab({ shift: true });
    expect(byStorytellerLink).toHaveFocus();

    await userEvent.tab({ shift: true });
    expect(findNextStoryButton).toHaveFocus();
    await userEvent.tab({ shift: true });
    expect(allCommentaryLink).toHaveFocus();
    await userEvent.tab({ shift: true });
    expect(allStoriesLink).toHaveFocus();
    await userEvent.tab({ shift: true });
    expect(advancedSearchLink).toHaveFocus();
    await userEvent.tab({ shift: true });
    expect(basicSearchLink).toHaveFocus();

    await userEvent.tab({ shift: true });
    expect(searchButton).toHaveFocus();
    await userEvent.tab({ shift: true });
    expect(storiesButton).toHaveFocus();
  });

  it("should move back through the top row of buttons and links when lists are closed", async () => {
    /* conforms to Tab Handling AC 1 / 2 */
    const { getByTestId, getByRole } = renderNavigation(linkProps);
    const frontButton = getByRole("button", { name: frontButtonLabel });
    const endButton = getByRole("button", { name: endButtonLabel });

    const { homeLink, contactInfoLink } =
      getMultipleLinkTestElements(getByRole);
    const {
      communityButton,
      communityList,
      storiesButton,
      referenceButton,
      aboutButton,
    } = getMultipleButtonsTestElements(getByRole, getByTestId, TEST_ID);

    await userEvent.tab();
    expect(frontButton).toHaveFocus();
    await userEvent.tab();
    expect(homeLink).toHaveFocus();
    await userEvent.tab();
    expect(communityButton).toHaveFocus();
    expect(communityList).toHaveClass("srOnly");
    await userEvent.tab();
    expect(storiesButton).toHaveFocus();
    await userEvent.tab();
    expect(referenceButton).toHaveFocus();
    await userEvent.tab();
    expect(aboutButton).toHaveFocus();
    await userEvent.tab();
    expect(contactInfoLink).toHaveFocus();
    await userEvent.tab();
    expect(endButton).toHaveFocus();
    await userEvent.tab({ shift: true });
    expect(contactInfoLink).toHaveFocus();

    await userEvent.tab({ shift: true });
    expect(aboutButton).toHaveFocus();
    await userEvent.tab({ shift: true });
    expect(referenceButton).toHaveFocus();
    await userEvent.tab({ shift: true });
    expect(storiesButton).toHaveFocus();
    await userEvent.tab({ shift: true });
    expect(communityButton).toHaveFocus();
    await userEvent.tab({ shift: true });
    expect(homeLink).toHaveFocus();
    await userEvent.tab({ shift: true });
    expect(frontButton).toHaveFocus();
  });
});
