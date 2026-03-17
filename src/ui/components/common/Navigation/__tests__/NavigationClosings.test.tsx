import { render, userEvent } from "@/test";
import fs from "fs";
import { Box, Button, Navigation, transformNavigation } from "@/ui/components";
import {
  getCommonTestElements,
  getMultipleButtonsTestElements,
  getMultipleLinkTestElements,
} from "../utilities/renderedTestItems";

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

const renderNavigation = ({ label, children, ...rest }) => {
  return render(
    <Box cx="simple">
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

describe("Navigation Closings ", () => {
  it("should move down through the top row of buttons when lists are closed and back to last button", async () => {
    const { getByTestId, getByRole } = renderNavigation(buttonProps);
    const { frontButton, endButton } = getCommonTestElements(
      getByRole,
      frontButtonLabel,
      endButtonLabel,
    );

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
    await userEvent.tab({ shift: true });
    expect(aboutButton).toHaveFocus();
  });

  it("should close any open child lists when a parent is closed", async () => {
    /* conforms to Closing and Exit AC 1 */
    const { getByTestId, getByRole } = renderNavigation(buttonProps);

    const {
      storiesButton,
      storiesList,
      searchButton,
      searchList,
      findNextStoryButton,
      findNextStoryList,
    } = getMultipleButtonsTestElements(getByRole, getByTestId, TEST_ID);

    expect(storiesList).toHaveClass("srOnly");
    expect(searchList).toHaveClass("srOnly");
    expect(findNextStoryList).toHaveClass("srOnly");

    await userEvent.click(storiesButton, {});
    expect(storiesList).not.toHaveClass("srOnly");
    await userEvent.click(searchButton);
    expect(searchList).not.toHaveClass("srOnly");
    await userEvent.click(findNextStoryButton);
    expect(findNextStoryList).not.toHaveClass("srOnly");
    await userEvent.click(storiesButton);
    expect(storiesList).toHaveClass("srOnly");
    expect(searchList).toHaveClass("srOnly");
    expect(findNextStoryList).toHaveClass("srOnly");
  });

  it("should close any open siblings when focus is on a top row element", async () => {
    /* conforms to Closing and Exit AC 3 */
    const { getByTestId, getByRole } = renderNavigation(linkProps);
    const { frontButton } = getCommonTestElements(
      getByRole,
      frontButtonLabel,
      endButtonLabel,
    );
    const { communityButton, communityList, storiesButton, storiesList } =
      getMultipleButtonsTestElements(getByRole, getByTestId, TEST_ID);

    const { homeLink } = getMultipleLinkTestElements(getByRole);
    await userEvent.tab();
    expect(frontButton).toHaveFocus();
    await userEvent.tab();
    expect(homeLink).toHaveFocus();
    await userEvent.tab();
    expect(communityButton).toHaveFocus();
    await userEvent.keyboard("{Enter}");
    expect(communityList).not.toHaveClass("srOnly");
    await userEvent.tab({ shift: true });
    expect(homeLink).toHaveFocus();
    await userEvent.pointer({ target: storiesButton, keys: "[MouseLeft]" });
    expect(communityList).toHaveClass("srOnly");
    expect(storiesList).not.toHaveClass("srOnly");
    await userEvent.pointer({ target: communityButton, keys: "[MouseLeft]" });
    expect(communityList).not.toHaveClass("srOnly");
    await userEvent.keyboard("{ArrowLeft}");
    expect(homeLink).toHaveFocus();
    expect(communityList).toHaveClass("srOnly");
  });

  it("should close open sublists when Escape is Pressed on a link in the list", async () => {
    /* conforms to Closing and Exit AC 2 */
    const { getByTestId, getByRole } = renderNavigation(buttonProps);
    const { frontButton } = getCommonTestElements(
      getByRole,
      frontButtonLabel,
      endButtonLabel,
    );
    const {
      communityButton,
      storiesButton,
      storiesList,
      searchButton,
      searchList,
      basicSearchLink,
      advancedSearchLink,
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
    await userEvent.keyboard("{Escape}");
    expect(storiesButton).toHaveFocus();
    expect(storiesList).toHaveClass("srOnly");
    expect(searchList).toHaveClass("srOnly");
  });

  it("should close open sublists when Escape is Pressed in a vertical list", async () => {
    /* conforms to Closing and Exit AC 2 */
    const optProps = { ...buttonProps, orientation: "vertical" };
    const { getByTestId, getByRole } = renderNavigation({ ...optProps });
    const { frontButton } = getCommonTestElements(
      getByRole,
      frontButtonLabel,
      endButtonLabel,
    );
    const {
      communityButton,
      storiesButton,
      storiesList,
      searchButton,
      searchList,
      basicSearchLink,
      advancedSearchLink,
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
    await userEvent.keyboard("{Escape}");
    expect(storiesButton).toHaveFocus();
    expect(storiesList).toHaveClass("srOnly");
    expect(searchList).toHaveClass("srOnly");
  });

  it("should close component when a pointer/click event is made outside of the component.", async () => {
    /* conforms to Closing and Exit AC 5 */
    const { getByTestId, getByRole } = renderNavigation(linkProps);
    const { communityButton, communityList } = getMultipleButtonsTestElements(
      getByRole,
      getByTestId,
      TEST_ID,
    );
    await userEvent.pointer({ target: communityButton, keys: "[MouseLeft]" });
    expect(communityButton).toHaveFocus();
    expect(communityList).not.toHaveClass("srOnly");
    await userEvent.pointer({ target: document.body, keys: "[MouseLeft]" });
    expect(communityList).toHaveClass("srOnly");
  });
  it("a top level link or the last link in the component should close open sublists when leaving the component", async () => {
    /* conforms to Closings/Entering/Exits AC 4 / 6 */
    const { getByRole, getByTestId } = renderNavigation(buttonProps);
    const { frontButton, endButton } = getCommonTestElements(
      getByRole,
      frontButtonLabel,
      endButtonLabel,
    );
    const {
      communityButton,
      aboutButton,
      aboutList,
      aboutSiteLink,
      contactLink,
      privacyLink,
      accessibleLink,
      donateLink,
    } = getMultipleButtonsTestElements(getByRole, getByTestId, TEST_ID);

    expect(aboutList).toHaveClass("srOnly");
    await userEvent.tab();
    expect(frontButton).toHaveFocus();
    await userEvent.tab();
    expect(communityButton).toHaveFocus();
    await userEvent.tab();
    await userEvent.tab();
    await userEvent.tab();
    expect(aboutButton).toHaveFocus();
    await userEvent.keyboard("{Enter}");
    expect(aboutList).not.toHaveClass("srOnly");
    await userEvent.tab();
    expect(aboutSiteLink).toHaveFocus();
    await userEvent.tab();
    expect(contactLink).toHaveFocus();
    await userEvent.tab();
    expect(privacyLink).toHaveFocus();
    await userEvent.tab();
    expect(accessibleLink).toHaveFocus();
    await userEvent.tab();
    expect(donateLink).toHaveFocus();
    await userEvent.tab();
    expect(endButton).toHaveFocus();
    await userEvent.tab({ shift: true });
    expect(aboutButton).toHaveFocus();
    expect(aboutList).toHaveClass("srOnly");
  });
});
