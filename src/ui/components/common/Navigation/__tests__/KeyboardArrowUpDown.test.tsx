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

describe("Navigation Keyboard Handling Down Arrow", () => {
  it("should move down the list when arrow-down is pressed", async () => {
    /* conforms to Up/Down Keyboard AC 1 */
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

    await userEvent.tab();
    await userEvent.tab();
    expect(homeLink).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    expect(baseComponentsLink).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    expect(singleListLink).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    expect(horizontalButtonsLink).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    expect(horizontalLinkEndsLink).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    expect(horizontalStyledLink).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    expect(verticalStyledLink).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    expect(verticalStyledLink).toHaveFocus();
  });
  it("should move down through the top row of buttons when lists are closed", async () => {
    /* conforms to Up/Down Keyboard AC 1 */
    const { getByTestId, getByRole } = renderNavigation(buttonProps);
    const frontButton = getByRole("button", { name: frontButtonLabel });
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
    await userEvent.keyboard("{ArrowDown}");
    expect(storiesButton).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    expect(referenceButton).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    expect(aboutButton).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    expect(aboutButton).toHaveFocus();
  });

  it("should move through the top row of buttons and links when lists are closed", async () => {
    const { getByTestId, getByRole } = renderNavigation(linkProps);
    const frontButton = getByRole("button", { name: frontButtonLabel });
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
    await userEvent.keyboard("{ArrowDown}");
    expect(communityButton).toHaveFocus();
    expect(communityList).toHaveClass("srOnly");
    await userEvent.keyboard("{ArrowDown}");
    expect(storiesButton).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    expect(referenceButton).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    expect(aboutButton).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    expect(contactInfoLink).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    expect(contactInfoLink).toHaveFocus();
  });

  it("should move to the first child when a list is open", async () => {
    /* conforms to Up/Down Keyboard AC  2 / 3 */
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
    await userEvent.keyboard("{ArrowDown}");
    expect(blogLink).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    expect(forumLink).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    expect(communityButton).toHaveFocus();
  });

  it("should move to siblings when sublists are closed", async () => {
    /* conforms to Up/Down Keyboard AC 5 */
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
    } = getMultipleButtonsTestElements(getByRole, getByTestId, TEST_ID);
    const { homeLink, contactInfoLink } =
      getMultipleLinkTestElements(getByRole);

    await userEvent.tab();
    expect(frontButton).toHaveFocus();
    await userEvent.tab();
    expect(homeLink).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    expect(communityButton).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    expect(storiesButton).toHaveFocus();
    expect(storiesList).toHaveClass("srOnly");
    await userEvent.keyboard("{Enter}");
    expect(storiesList).not.toHaveClass("srOnly");
    await userEvent.keyboard("{ArrowDown}");
    expect(searchButton).toHaveFocus();
    expect(searchList).toHaveClass("srOnly");
    await userEvent.keyboard("{ArrowDown}");
    expect(allStoriesLink).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    expect(allCommentaryLink).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    expect(findNextStoryButton).toHaveFocus();
    expect(findNextStoryList).toHaveClass("srOnly");
    await userEvent.keyboard("{ArrowDown}");
    expect(storiesButton).toHaveFocus();
    await userEvent.keyboard("{Enter}");
    expect(storiesList).toHaveClass("srOnly");
    await userEvent.keyboard("{ArrowDown}");
    await userEvent.keyboard("{ArrowDown}");
    await userEvent.keyboard("{ArrowDown}");
    expect(contactInfoLink).toHaveFocus();
  });

  it("should move through sublists and siblings when sublists are open", async () => {
    /* conforms to Up/Down Keyboard AC 3 / 5/ 6 / 7 */
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
    await userEvent.keyboard("{ArrowDown}");
    expect(storiesButton).toHaveFocus();
    expect(storiesList).toHaveClass("srOnly");
    await userEvent.keyboard("{Enter}");
    expect(storiesList).not.toHaveClass("srOnly");
    await userEvent.keyboard("{ArrowDown}");
    expect(searchButton).toHaveFocus();
    expect(searchList).toHaveClass("srOnly");
    await userEvent.keyboard("{Enter}");
    expect(searchList).not.toHaveClass("srOnly");
    await userEvent.keyboard("{ArrowDown}");
    expect(basicSearchLink).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    expect(advancedSearchLink).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    expect(allStoriesLink).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    expect(allCommentaryLink).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    expect(findNextStoryButton).toHaveFocus();
    expect(findNextStoryList).toHaveClass("srOnly");
    await userEvent.keyboard("{Enter}");
    expect(findNextStoryList).not.toHaveClass("srOnly");
    await userEvent.keyboard("{ArrowDown}");
    expect(byStorytellerLink).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    expect(byEraLink).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    expect(storiesButton).toHaveFocus();
  });
});

describe("Navigation Keyboard Handling Up Arrow", () => {
  it("should move up the list when arrow-up is pressed", async () => {
    /* conforms to Up/Down Keyboard AC  */
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

    await userEvent.tab();
    await userEvent.tab();
    await userEvent.tab();
    await userEvent.tab();
    await userEvent.tab();
    await userEvent.tab();
    await userEvent.tab();
    await userEvent.tab();

    expect(verticalStyledLink).toHaveFocus();
    await userEvent.keyboard("{ArrowUp}");
    expect(horizontalStyledLink).toHaveFocus();
    await userEvent.keyboard("{ArrowUp}");
    expect(horizontalLinkEndsLink).toHaveFocus();
    await userEvent.keyboard("{ArrowUp}");
    expect(horizontalButtonsLink).toHaveFocus();
    await userEvent.keyboard("{ArrowUp}");
    expect(singleListLink).toHaveFocus();
    await userEvent.keyboard("{ArrowUp}");
    expect(baseComponentsLink).toHaveFocus();
    await userEvent.keyboard("{ArrowUp}");
    expect(homeLink).toHaveFocus();
    await userEvent.keyboard("{ArrowUp}");
    expect(homeLink).toHaveFocus();
  });

  it("should move up through sublists and focus on Parent when in a sublist", async () => {
    /* conforms to Up/Down Keyboard AC 8  */
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
    await userEvent.keyboard("{ArrowDown}");
    expect(blogLink).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    expect(forumLink).toHaveFocus();
    await userEvent.keyboard("{ArrowUp}");
    expect(blogLink).toHaveFocus();
    await userEvent.keyboard("{ArrowUp}");
    expect(communityButton).toHaveFocus();
  });

  it("should move up through siblings and sublists when they are open", async () => {
    /* conforms to Up/Down Keyboard AC  10 */
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
    await userEvent.keyboard("{ArrowDown}");
    expect(storiesButton).toHaveFocus();
    expect(storiesList).toHaveClass("srOnly");
    await userEvent.keyboard("{Enter}");
    expect(storiesList).not.toHaveClass("srOnly");
    await userEvent.keyboard("{ArrowDown}");
    expect(searchButton).toHaveFocus();
    expect(searchList).toHaveClass("srOnly");
    await userEvent.keyboard("{Enter}");
    expect(searchList).not.toHaveClass("srOnly");
    await userEvent.keyboard("{ArrowDown}");
    expect(basicSearchLink).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    await userEvent.keyboard("{ArrowDown}");
    await userEvent.keyboard("{ArrowDown}");
    await userEvent.keyboard("{ArrowDown}");
    expect(findNextStoryButton).toHaveFocus();
    expect(findNextStoryList).toHaveClass("srOnly");
    await userEvent.keyboard("{Enter}");
    expect(findNextStoryList).not.toHaveClass("srOnly");
    await userEvent.keyboard("{ArrowDown}");
    expect(byStorytellerLink).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    expect(byEraLink).toHaveFocus();
    await userEvent.keyboard("{ArrowUp}");
    expect(byStorytellerLink).toHaveFocus();

    await userEvent.keyboard("{ArrowUp}");
    expect(findNextStoryButton).toHaveFocus();
    await userEvent.keyboard("{ArrowUp}");
    expect(allCommentaryLink).toHaveFocus();
    await userEvent.keyboard("{ArrowUp}");
    expect(allStoriesLink).toHaveFocus();
    await userEvent.keyboard("{ArrowUp}");
    expect(advancedSearchLink).toHaveFocus();
    await userEvent.keyboard("{ArrowUp}");
    expect(basicSearchLink).toHaveFocus();

    await userEvent.keyboard("{ArrowUp}");
    expect(searchButton).toHaveFocus();
    await userEvent.keyboard("{ArrowUp}");
    expect(storiesButton).toHaveFocus();
  });

  it("should move back through the top row of buttons and links when lists are closed", async () => {
    /* conforms to Up/Down Keyboard AC 9 */
    const { getByTestId, getByRole } = renderNavigation(linkProps);
    const frontButton = getByRole("button", { name: frontButtonLabel });
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
    await userEvent.keyboard("{ArrowDown}");
    expect(communityButton).toHaveFocus();
    expect(communityList).toHaveClass("srOnly");
    await userEvent.keyboard("{ArrowDown}");
    expect(storiesButton).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    expect(referenceButton).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    expect(aboutButton).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    expect(contactInfoLink).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    expect(contactInfoLink).toHaveFocus();
    await userEvent.keyboard("{ArrowUp}");
    expect(aboutButton).toHaveFocus();
    await userEvent.keyboard("{ArrowUp}");
    expect(referenceButton).toHaveFocus();
    await userEvent.keyboard("{ArrowUp}");
    expect(storiesButton).toHaveFocus();
    await userEvent.keyboard("{ArrowUp}");
    expect(communityButton).toHaveFocus();
    await userEvent.keyboard("{ArrowUp}");
    expect(homeLink).toHaveFocus();
    await userEvent.keyboard("{ArrowUp}");
    expect(homeLink).toHaveFocus();
  });
});
