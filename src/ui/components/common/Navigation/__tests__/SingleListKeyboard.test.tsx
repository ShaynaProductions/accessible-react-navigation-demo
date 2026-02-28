import * as fs from "node:fs";
import { render, userEvent } from "@/test";
import { Navigation, type NavigationProps } from "@/ui/components";
import {
  getMultipleButtonsTestElements,
  getSingleListTestElements,
  transformNavigation,
} from "../utilities";

const singleListJSONObj = fs.readFileSync(
  "src/ui/__static__/single-list.json",
  "utf8",
);

const multipleListButtonsJSONObj = fs.readFileSync(
  "src/ui/__static__/multiple-lists-buttons.json",
  "utf8",
);

const TEST_ID = "Navigation";
const singleListObj = JSON.parse(singleListJSONObj);
const buttonListObj = JSON.parse(multipleListButtonsJSONObj);

const renderNavigation = (navObj, optProps: Partial<NavigationProps>) => {
  const navigation = transformNavigation(navObj, TEST_ID);

  return render(
    <Navigation id="nav-id" testId={TEST_ID} label="test" {...optProps}>
      {navigation}
    </Navigation>,
  );
};

describe("Navigation through single list of links", () => {
  const reqProps = {
    id: "main-menu",
    label: "Single List Links",
  };
  it("should take user to the first item in the list when Home Key is pressed", async () => {
    /* conforms to Single List Keyboard AC 1 */

    const optProps = {
      ...reqProps,
    };

    const { getByRole } = renderNavigation(singleListObj, optProps);
    const { homeLink, singleListLink } = getSingleListTestElements(getByRole);

    await userEvent.tab();
    expect(homeLink).toHaveFocus();
    await userEvent.tab();
    await userEvent.tab();
    expect(singleListLink).toHaveFocus();
    await userEvent.keyboard("{Home}");
    expect(homeLink).toHaveFocus();
  });

  it("should take user to the last item in the list when End Key is pressed", async () => {
    /* conforms to Single List Keyboard AC 2 */

    const optProps = {
      ...reqProps,
    };

    const { getByRole } = renderNavigation(singleListObj, optProps);
    const { homeLink, verticalStyledLink } =
      getSingleListTestElements(getByRole);

    await userEvent.tab();
    expect(homeLink).toHaveFocus();
    await userEvent.keyboard("{End}");
    expect(verticalStyledLink).toHaveFocus();
  });

  it("should take user to the previous item in the list when arrow-left Key is pressed and then to the last list item when arrow-left is pressed on the first item ", async () => {
    /* conforms to Single List Keyboard AC 3/4 */

    const optProps = {
      ...reqProps,
    };

    const { getByRole } = renderNavigation(singleListObj, optProps);
    const { homeLink, baseComponentsLink, singleListLink, verticalStyledLink } =
      getSingleListTestElements(getByRole);

    await userEvent.tab();
    expect(homeLink).toHaveFocus();
    await userEvent.tab();
    await userEvent.tab();
    expect(singleListLink).toHaveFocus();
    await userEvent.keyboard("{ArrowLeft}");
    expect(baseComponentsLink).toHaveFocus();
    await userEvent.keyboard("{ArrowLeft}");
    expect(homeLink).toHaveFocus();
    await userEvent.keyboard("{ArrowLeft}");
    expect(verticalStyledLink).toHaveFocus();
  });

  it("should take user to the next item in the list when arrow-right Key is pressed and then to the first item when arrow-right is pressed on the last item", async () => {
    /* conforms to Single List Keyboard AC 5/6 */

    const optProps = {
      ...reqProps,
    };

    const { getByRole } = renderNavigation(singleListObj, optProps);
    const {
      homeLink,
      singleListLink,
      horizontalButtonsLink,
      verticalStyledLink,
    } = getSingleListTestElements(getByRole);

    await userEvent.tab();
    expect(homeLink).toHaveFocus();
    await userEvent.tab();
    await userEvent.tab();
    expect(singleListLink).toHaveFocus();
    await userEvent.keyboard("{ArrowRight}");
    expect(horizontalButtonsLink).toHaveFocus();
    await userEvent.keyboard("{ArrowRight}");
    await userEvent.keyboard("{ArrowRight}");
    await userEvent.keyboard("{ArrowRight}");
    expect(verticalStyledLink).toHaveFocus();
    await userEvent.keyboard("{ArrowRight}");
    expect(homeLink).toHaveFocus();
  });
});

describe("Navigation through single list of buttons", () => {
  const reqProps = {
    id: "main-menu",
    label: "Single List Buttons",
  };

  it("should take user to the first item in the list when Home Key is pressed", async () => {
    /* conforms to Single List Keyboard AC 1 */

    const optProps = {
      ...reqProps,
    };

    const { getByRole, getByTestId } = renderNavigation(
      buttonListObj,
      optProps,
    );
    const { communityButton, communityList, referenceButton } = getMultipleButtonsTestElements(
      getByRole,
      getByTestId,
      TEST_ID,
    );

    await userEvent.tab();
    expect(communityButton).toHaveFocus();
    await userEvent.keyboard("{ArrowRight}");
    await userEvent.keyboard("{ArrowRight}");
    expect(referenceButton).toHaveFocus();
    await userEvent.keyboard("{Home}");
    expect(communityButton).toHaveFocus();
    expect(communityList).toHaveClass("srOnly");
    await userEvent.keyboard("{Enter}");
    expect(communityList).not.toHaveClass("srOnly");
    await userEvent.keyboard("{Enter}");
    expect(communityList).toHaveClass("srOnly");
  });

  it("should take user to the last item in the list when End Key is pressed", async () => {
    /* conforms to Single List Keyboard AC 2 */

    const optProps = {
      ...reqProps,
    };

    const { getByRole, getByTestId } = renderNavigation(
      buttonListObj,
      optProps,
    );
    const { communityButton, aboutButton } = getMultipleButtonsTestElements(
      getByRole,
      getByTestId,
      TEST_ID,
    );

    await userEvent.tab();
    expect(communityButton).toHaveFocus();
    await userEvent.keyboard("{End}");
    expect(aboutButton).toHaveFocus();
  });

  it("should take user to the previous item in the list when arrow-left Key is pressed and then to the last list item when arrow-left is pressed on the first item ", async () => {
    /* conforms to Single List Keyboard AC 3/4 */

    const optProps = {
      ...reqProps,
    };

    const { getByRole, getByTestId } = renderNavigation(
      buttonListObj,
      optProps,
    );
    const { communityButton, storiesButton, referenceButton, aboutButton } =
      getMultipleButtonsTestElements(getByRole, getByTestId, TEST_ID);
    await userEvent.tab();
    expect(communityButton).toHaveFocus();
    await userEvent.keyboard("{ArrowRight}");
    expect(storiesButton).toHaveFocus();
    await userEvent.keyboard("{ArrowRight}");
    expect(referenceButton).toHaveFocus();
    await userEvent.keyboard("{ArrowLeft}");
    await userEvent.keyboard("{ArrowLeft}");
    expect(communityButton).toHaveFocus();
    await userEvent.keyboard("{ArrowLeft}");
    expect(aboutButton).toHaveFocus();
  });

  it("should take user to the next item in the list when arrow-right Key is pressed and then to the first item when arrow-right is pressed on the last item", async () => {
    /* conforms to Single List Keyboard AC 5/6 */

    const optProps = {
      ...reqProps,
    };

    const { getByRole, getByTestId } = renderNavigation(
      buttonListObj,
      optProps,
    );
    const { communityButton, storiesButton, referenceButton, aboutButton } =
      getMultipleButtonsTestElements(getByRole, getByTestId, TEST_ID);

    await userEvent.tab();
    expect(communityButton).toHaveFocus();
    await userEvent.keyboard("{ArrowRight}");
    expect(storiesButton).toHaveFocus();
    await userEvent.keyboard("{ArrowRight}");
    expect(referenceButton).toHaveFocus();
    await userEvent.keyboard("{ArrowRight}");
    expect(aboutButton).toHaveFocus();
    await userEvent.keyboard("{ArrowRight}");
    expect(communityButton).toHaveFocus();
  });
});
