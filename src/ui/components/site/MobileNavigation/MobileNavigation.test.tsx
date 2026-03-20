import fs from "fs";
import { render, userEvent } from "@/test";
import { Button, MobileNavigation, transformNavigation } from "@/ui/components";
import {
  getCommonTestElements,
  getMultipleButtonsTestElements,
} from "@/ui/components/common/Navigation/utilities";
import { getByTestId } from "@testing-library/dom";

const multipleButtonsJSONObj = fs.readFileSync(
  "src/ui/__static__/multiple-lists-buttons.json",
  "utf8",
);

const multipleLinksJSONObj = fs.readFileSync(
  "src/ui/__static__/multiple-lists-link-ends.json",
  "utf8",
);

const multipleButtons = JSON.parse(multipleButtonsJSONObj);
const multipleLinkEnds = JSON.parse(multipleLinksJSONObj);

const TEST_ID = "navigation";
const endButtonLabel = "Focusable End";
const frontButtonLabel = "Focusable Front";
const buttonChildren = transformNavigation(multipleButtons, TEST_ID);
const linkChildren = transformNavigation(multipleLinkEnds, TEST_ID);

const renderMobileNavigation = (navigation) => {
  const id = "test-menu";
  const label = "Menu";
  return render(
    <>
      <Button id="front" testId={TEST_ID && `${TEST_ID}-front`}>
        {frontButtonLabel}
      </Button>
      <MobileNavigation cx="" id={id} label={label}>
        {navigation}
      </MobileNavigation>
      <Button id="button-end" testId={TEST_ID && `${TEST_ID}-end`}>
        {endButtonLabel}
      </Button>
    </>,
  );
};

describe("MobileNavigation", () => {
  /* Set Focus */
  it("should set focus onto the top button when it the menu is opened.", async () => {
    /* conforms to Controlled Component AC 1 */
    const { getAllByRole, getByRole, getByTestId } =
      renderMobileNavigation(buttonChildren);
    const { communityButton } = getMultipleButtonsTestElements(
      getByRole,
      getByTestId,
      TEST_ID,
    );
    const menuButton = getByRole("button", { name: "Navigation Menu" });
    const navElement = getByRole("navigation");
    const ulArray = getAllByRole("list");
    const topList = ulArray[0];

    expect(menuButton).toBeInTheDocument();
    expect(navElement).toBeInTheDocument();
    expect(topList).toHaveAttribute("id", "mobile-menu");
    expect(topList).toHaveClass("srOnly");
    await userEvent.pointer({ target: menuButton, keys: "[MouseLeft]" });
    expect(topList).not.toHaveClass("srOnly");
    expect(communityButton).toHaveFocus();
  });

  it("should set focus on the mobile menu button when Escape is pressed in the navigation list", async () => {
    /* conforms to Controlled Component AC 2 */
    const { getAllByRole, getByRole, getByTestId } =
      renderMobileNavigation(buttonChildren);
    const { communityButton } = getMultipleButtonsTestElements(
      getByRole,
      getByTestId,
      TEST_ID,
    );
    const menuButton = getByRole("button", { name: "Navigation Menu" });
    const navElement = getByRole("navigation");
    const ulArray = getAllByRole("list");
    const topList = ulArray[0];

    expect(menuButton).toBeInTheDocument();
    expect(navElement).toBeInTheDocument();
    expect(topList).toHaveAttribute("id", "mobile-menu");
    expect(topList).toHaveClass("srOnly");
    await userEvent.pointer({ target: menuButton, keys: "[MouseLeft]" });
    expect(topList).not.toHaveClass("srOnly");
    expect(communityButton).toHaveFocus();
    await userEvent.keyboard("{Escape}");
    expect(menuButton).toHaveFocus();
  });

  it("should move to end button when navigation is closed and tab is executed on menu button", async () => {
    /* conforms to Controlled Component AC 3 */
    const { getByRole } = renderMobileNavigation(buttonChildren);

    const { endButton } = getCommonTestElements(
      getByRole,
      frontButtonLabel,
      endButtonLabel,
    );

    const menuButton = getByRole("button", { name: "Navigation Menu" });
    await userEvent.tab();
    await userEvent.tab();
    expect(menuButton).toHaveFocus();
    await userEvent.tab();
    expect(endButton).toHaveFocus();
    await userEvent.tab({ shift: true });
    expect(menuButton).toHaveFocus();
  });

  it("should move to the next outside element when Tab is executed on the menu", async () => {
    /* conforms to Controlled Component AC 3 */
    const { getByRole } = renderMobileNavigation(linkChildren);

    const { endButton } = getCommonTestElements(
      getByRole,
      frontButtonLabel,
      endButtonLabel,
    );
    const menuButton = getByRole("button", { name: "Navigation Menu" });
    await userEvent.tab();
    await userEvent.tab();
    expect(menuButton).toHaveFocus();
    await userEvent.tab();
    expect(endButton).toHaveFocus();
    await userEvent.tab({ shift: true });
    expect(menuButton).toHaveFocus();
  });

  it("should move to front button when navigation is closed and tab is executed on first focused element outside the component", async () => {
    /* conforms to Controlled Component AC 4 */
    const { getByRole } = renderMobileNavigation(buttonChildren);

    const { endButton } = getCommonTestElements(
      getByRole,
      frontButtonLabel,
      endButtonLabel,
    );
    const menuButton = getByRole("button", { name: "Navigation Menu" });
    await userEvent.tab();
    await userEvent.tab();
    await userEvent.tab();
    expect(endButton).toHaveFocus();
    await userEvent.tab({ shift: true });
    expect(menuButton).toHaveFocus();
  });

  it("should close sublists when focus moves out of the component", async () => {
    const { getByRole, getByTestId } = renderMobileNavigation(buttonChildren);

    const { endButton } = getCommonTestElements(
      getByRole,
      frontButtonLabel,
      endButtonLabel,
    );

    const { communityButton, aboutButton, aboutList, donateLink } =
      getMultipleButtonsTestElements(getByRole, getByTestId, TEST_ID);
    const menuButton = getByRole("button", { name: "Navigation Menu" });
    await userEvent.tab();
    await userEvent.tab();
    expect(menuButton).toHaveFocus();
    await userEvent.keyboard("{Enter}");
    expect(communityButton).toHaveFocus();
    await userEvent.tab();
    await userEvent.tab();
    await userEvent.tab();
    expect(aboutButton).toHaveFocus();

    await userEvent.keyboard("{Enter}");
    expect(aboutList).not.toHaveClass("srOnly");
    await userEvent.tab();
    await userEvent.tab();
    await userEvent.tab();
    await userEvent.tab();
    await userEvent.tab();
    expect(donateLink).toHaveFocus();
    await userEvent.tab();
    expect(endButton).toHaveFocus();
    expect(aboutList).toHaveClass("srOnly");
  });

  /* Vertical Layout Changes */

  it("should move to parent's next sibling when button is closed and its the last in the list.", async () => {
    /* conforms to Vertical Alignment AC 1 */
    const { getByRole, getByTestId } = renderMobileNavigation(buttonChildren);
    const {
      communityButton,
      storiesButton,
      searchButton,
      allStoriesLink,
      findNextStoryButton,
      referenceButton,
    } = getMultipleButtonsTestElements(getByRole, getByTestId, TEST_ID);
    const menuButton = getByRole("button", { name: "Navigation Menu" });
    await userEvent.tab();
    await userEvent.tab();
    expect(menuButton).toHaveFocus();
    await userEvent.keyboard("{Enter}");
    expect(communityButton).toHaveFocus();
    await userEvent.keyboard("{arrowDown}");
    expect(storiesButton).toHaveFocus();
    await userEvent.keyboard("{Enter}");
    await userEvent.keyboard("{arrowDown}");
    expect(searchButton).toHaveFocus();
    await userEvent.keyboard("{arrowDown}");
    expect(allStoriesLink).toHaveFocus();
    await userEvent.keyboard("{arrowDown}");
    await userEvent.keyboard("{arrowDown}");
    expect(findNextStoryButton).toHaveFocus();
    await userEvent.keyboard("{arrowDown}");
    expect(referenceButton).toHaveFocus();
  });

  it("should move to parent's next sibling when link is the last in it's list.", async () => {
    /* conforms to Vertical Alignment AC 2 */
    const { getByRole, getByTestId } = renderMobileNavigation(buttonChildren);
    const { communityButton, forumLink, blogLink, storiesButton } =
      getMultipleButtonsTestElements(getByRole, getByTestId, TEST_ID);
    const menuButton = getByRole("button", { name: "Navigation Menu" });
    await userEvent.pointer({ target: menuButton, keys: "[MouseLeft]" });
    expect(communityButton).toHaveFocus();
    await userEvent.keyboard("{Enter}");
    await userEvent.keyboard("{arrowDown}");
    expect(blogLink).toHaveFocus();
    await userEvent.keyboard("{arrowDown}");
    expect(forumLink).toHaveFocus();
    await userEvent.keyboard("{arrowDown}");
    expect(storiesButton).toHaveFocus();
  });

  it("should not move when button is closed and its last child is last in the component", async () => {
    /* conforms to Vertical Alignment AC 3 */
    const { getByRole, getByTestId } = renderMobileNavigation(buttonChildren);
    const { communityButton, storiesButton, referenceButton, aboutButton } =
      getMultipleButtonsTestElements(getByRole, getByTestId, TEST_ID);
    const menuButton = getByRole("button", { name: "Navigation Menu" });
    await userEvent.pointer({ target: menuButton, keys: "[MouseLeft]" });
    expect(communityButton).toHaveFocus();
    await userEvent.keyboard("{arrowDown}");
    expect(storiesButton).toHaveFocus();
    await userEvent.keyboard("{arrowDown}");
    expect(referenceButton).toHaveFocus();
    await userEvent.keyboard("{arrowDown}");
    expect(aboutButton).toHaveFocus();
    await userEvent.keyboard("{arrowDown}");
    expect(aboutButton).toHaveFocus();
  });

  it("should move to parent's next sibling except when link is last in component.", async () => {
    /* conforms to Vertical Alignment AC 4 */
    const { getByRole, getByTestId } = renderMobileNavigation(buttonChildren);
    const {
      communityButton,
      storiesButton,
      referenceButton,
      aboutButton,
      aboutSiteLink,
      donateLink,
    } = getMultipleButtonsTestElements(getByRole, getByTestId, TEST_ID);
    const menuButton = getByRole("button", { name: "Navigation Menu" });
    await userEvent.pointer({ target: menuButton, keys: "[MouseLeft]" });
    expect(communityButton).toHaveFocus();
    await userEvent.keyboard("{arrowDown}");
    expect(storiesButton).toHaveFocus();
    await userEvent.keyboard("{arrowDown}");
    expect(referenceButton).toHaveFocus();
    await userEvent.keyboard("{arrowDown}");
    expect(aboutButton).toHaveFocus();
    await userEvent.keyboard("{arrowDown}");
    expect(aboutButton).toHaveFocus();
    await userEvent.keyboard("{Enter}");
    await userEvent.keyboard("{arrowDown}");
    expect(aboutSiteLink).toHaveFocus();
    await userEvent.keyboard("{arrowDown}");
    await userEvent.keyboard("{arrowDown}");
    await userEvent.keyboard("{arrowDown}");
    await userEvent.keyboard("{arrowDown}");
    expect(donateLink).toHaveFocus();
    await userEvent.keyboard("{arrowDown}");
    expect(donateLink).toHaveFocus();
  });

  it("should move up the list when all are closed", async () => {
    /* conforms to Vertical Alignment AC 5 */
    const { getByRole, getByTestId } = renderMobileNavigation(buttonChildren);
    const { communityButton, storiesButton, referenceButton, aboutButton } =
      getMultipleButtonsTestElements(getByRole, getByTestId, TEST_ID);
    const menuButton = getByRole("button", { name: "Navigation Menu" });
    await userEvent.pointer({ target: menuButton, keys: "[MouseLeft]" });
    expect(communityButton).toHaveFocus();
    await userEvent.keyboard("{arrowDown}");
    expect(storiesButton).toHaveFocus();
    await userEvent.keyboard("{arrowDown}");
    expect(referenceButton).toHaveFocus();
    await userEvent.keyboard("{arrowDown}");
    expect(aboutButton).toHaveFocus();
    await userEvent.keyboard("{arrowUp}");
    expect(referenceButton).toHaveFocus();
    await userEvent.keyboard("{arrowUp}");
    expect(storiesButton).toHaveFocus();
    await userEvent.keyboard("{arrowUp}");
    expect(communityButton).toHaveFocus();
  });

  it("should move up the list and into the last element when prev sibling sublist is open and the last visual element is a button", async () => {
    /* conforms to Vertical Alignment AC 6 */
    const { getByRole, getByTestId } = renderMobileNavigation(buttonChildren);
    const {
      communityButton,
      storiesButton,
      searchButton,
      allCommentaryLink,
      findNextStoryButton,
      referenceButton,
    } = getMultipleButtonsTestElements(getByRole, getByTestId, TEST_ID);
    const menuButton = getByRole("button", { name: "Navigation Menu" });
    await userEvent.pointer({ target: menuButton, keys: "[MouseLeft]" });
    expect(communityButton).toHaveFocus();
    await userEvent.keyboard("{arrowDown}");
    expect(storiesButton).toHaveFocus();
    await userEvent.keyboard("{Enter}");
    await userEvent.keyboard("{arrowDown}");
    expect(searchButton).toHaveFocus();
    await userEvent.keyboard("{arrowDown}");
    await userEvent.keyboard("{arrowDown}");
    expect(allCommentaryLink).toHaveFocus();
    await userEvent.keyboard("{arrowDown}");
    expect(findNextStoryButton).toHaveFocus();
    await userEvent.keyboard("{arrowDown}");
    expect(referenceButton).toHaveFocus();
    await userEvent.keyboard("{arrowUp}");
    expect(findNextStoryButton).toHaveFocus();
  });

  it("should move up the list and into the last element when prev sibling sublist is open", async () => {
    /* conforms to Vertical Alignment AC 5 /7 */
    const { getByRole, getByTestId } = renderMobileNavigation(buttonChildren);
    const {
      communityButton,
      storiesButton,
      searchButton,
      basicSearchLink,
      advancedSearchLink,
      allStoriesLink,
      allCommentaryLink,
      findNextStoryButton,
      byEraLink,
      referenceButton,
    } = getMultipleButtonsTestElements(getByRole, getByTestId, TEST_ID);
    const menuButton = getByRole("button", { name: "Navigation Menu" });
    await userEvent.pointer({ target: menuButton, keys: "[MouseLeft]" });
    expect(communityButton).toHaveFocus();
    await userEvent.keyboard("{arrowDown}");
    expect(storiesButton).toHaveFocus();
    await userEvent.keyboard("{Enter}");
    await userEvent.keyboard("{arrowDown}");
    expect(searchButton).toHaveFocus();
    await userEvent.keyboard("{arrowDown}");
    await userEvent.keyboard("{arrowDown}");
    expect(allCommentaryLink).toHaveFocus();
    await userEvent.keyboard("{arrowDown}");
    expect(findNextStoryButton).toHaveFocus();
    await userEvent.keyboard("{Enter}");
    await userEvent.keyboard("{arrowDown}");
    await userEvent.keyboard("{arrowDown}");
    expect(byEraLink).toHaveFocus();
    await userEvent.keyboard("{arrowDown}");
    expect(referenceButton).toHaveFocus();
    await userEvent.keyboard("{arrowUp}");
    expect(byEraLink).toHaveFocus();
    await userEvent.keyboard("{arrowUp}");
    await userEvent.keyboard("{arrowUp}");
    expect(findNextStoryButton).toHaveFocus();
    await userEvent.keyboard("{arrowUp}");
    await userEvent.keyboard("{arrowUp}");
    expect(allStoriesLink).toHaveFocus();
    await userEvent.keyboard("{arrowUp}");
    expect(searchButton).toHaveFocus();
    await userEvent.keyboard("{Enter}");
    await userEvent.keyboard("{arrowDown}");
    expect(basicSearchLink).toHaveFocus();
    await userEvent.keyboard("{arrowDown}");
    expect(advancedSearchLink).toHaveFocus();
    await userEvent.keyboard("{arrowDown}");
    expect(allStoriesLink).toHaveFocus();
    await userEvent.keyboard("{arrowUp}");
    expect(advancedSearchLink).toHaveFocus();
    await userEvent.keyboard("{arrowUp}");
    await userEvent.keyboard("{arrowUp}");
    expect(searchButton).toHaveFocus();
    await userEvent.keyboard("{arrowUp}");
    expect(storiesButton).toHaveFocus();
    await userEvent.keyboard("{arrowUp}");
    expect(communityButton).toHaveFocus();
    await userEvent.keyboard("{arrowUp}");
    expect(communityButton).toHaveFocus();
  });
});
