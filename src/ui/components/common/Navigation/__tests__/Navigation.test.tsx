import * as fs from "node:fs";
import { act, axe, render, userEvent } from "@/test";
import { Navigation, type NavigationProps } from "@/ui/components";
import { transformNavigation } from "@/ui/components/common/Navigation/utilities";

const TEST_ID = "Navigation";

jest.mock("next/navigation", () => ({
  usePathname: () => "/#about-the-site",
}));

const renderNavigation = (
  filename: string,
  optProps: Partial<NavigationProps>,
) => {
  const jsonObj = fs.readFileSync(`src/ui/__static__/${filename}.json`, "utf8");

  const navObject = JSON.parse(jsonObj);
  const navigation = transformNavigation(navObject, TEST_ID);

  return render(
    <Navigation id="nav-id" testId={TEST_ID} label="test" {...optProps}>
      {navigation}
    </Navigation>,
  );
};

describe("<Navigation />", () => {
  it("should render singleList and verify auto-wcag compliancy", async () => {
    /* conforms to Structure/Transformation AC 2/3/8/13 */
    const { container } = await act(() =>
      renderNavigation("single-list", { orientation: "vertical" }),
    );
    const results = await act(() => axe(container));
    expect(results).toHaveNoViolations();
  });

  it("should render multiple lists with Buttons and verify auto-wcag compliancy", async () => {
    /* conforms to Structure/Transformation AC 2/3/8/13(list items) */
    const { container } = await act(() =>
      renderNavigation("multiple-lists-buttons", {}),
    );
    const results = await act(() => axe(container));
    expect(results).toHaveNoViolations();
  });

  it("should render multiple lists with Link ends and verify auto-wcag compliancy", async () => {
    /* conforms to Structure/Transformation AC 2/3/8/13 */
    const { container } = await act(() =>
      renderNavigation("multiple-lists-link-ends", {}),
    );
    const results = await act(() => axe(container));
    expect(results).toHaveNoViolations();
  });

  it("should be contained in a navigation landmark region", () => {
    /* conforms to Structure/Transformation AC 1   */
    const { getByRole, getByTestId } = renderNavigation(
      "multiple-lists-buttons",
      {},
    );
    const nav = getByRole("navigation", { name: "test" });
    const communityList = getByTestId(`${TEST_ID}-community-menu-list`);
    const blogLink = getByRole("link", { name: "Musings navigation" });
    expect(nav).toBeInTheDocument();
    expect(communityList).toBeInTheDocument();
    expect(communityList).toHaveRole("list");
    expect(blogLink).toBeInTheDocument();
    expect(communityList).toContainElement(blogLink);
    expect(nav).toContainElement(communityList);
  });

  it("should be displayed as horizontal", () => {
    /* conforms to Structure/Transformation AC 5/6 */
    const { queryAllByRole } = renderNavigation("multiple-lists-buttons", {});
    const navLists = queryAllByRole("list");
    expect(navLists[0]).toHaveAttribute("data-orientation", "horizontal");
    expect(navLists[0]).not.toHaveClass("srOnly");
  });

  it("should be displayed as vertical", () => {
    /* conforms to Structure/Transformation AC 7 */
    const { queryAllByRole } = renderNavigation("multiple-lists-buttons", {
      orientation: "vertical",
    });
    const navLists = queryAllByRole("list");
    expect(navLists[0]).toHaveAttribute("data-orientation", "vertical");
    expect(navLists[0]).not.toHaveClass("srOnly");
  });

  it("should associate a button with a sublist and indicate if the sublist is open or closed", () => {
    /* conforms to Structure/Transformation AC 4 (association) / 12 */
    const { getByRole, getByTestId } = renderNavigation(
      "multiple-lists-buttons",
      {},
    );
    const communityButton = getByRole("button", {
      name: "Community subnavigation",
    });
    const communityList = getByTestId(`${TEST_ID}-community-menu-list`);
    const blogLink = getByRole("link", { name: "Musings navigation" });
    expect(communityButton).toHaveAttribute("aria-controls", "community-menu");
    expect(communityList).toHaveAttribute("id", "community-menu");
    expect(communityList).toContainElement(blogLink);
    expect(communityList).toHaveClass("srOnly");
    expect(blogLink).toBeInTheDocument();
  });

  it("should handle an OnClick event", async () => {
    /* conforms to Structure/Transformation AC 8 (open/close indications in DOM) / 10 / 11  */
    const { getByTestId, getByRole } = renderNavigation(
      "multiple-lists-link-ends",
      {},
    );
    const aboutButton = getByRole("button", { name: "About subnavigation" });
    const aboutList = getByTestId(`${TEST_ID}-about-menu-list`);

    expect(aboutButton).toBeInTheDocument();
    expect(aboutList).toBeInTheDocument();
    expect(aboutButton).not.toHaveAttribute("aria-expanded", "true");
    expect(aboutList).toHaveClass("srOnly");
    await userEvent.click(aboutButton);
    expect(aboutButton).toHaveAttribute("aria-expanded", "true");
    expect(aboutList).not.toHaveClass("srOnly");
  });

  it("should display the expanded state visually", () => {
    /* conforms to Structure/Transformation AC 4 */
    const { getByRole } = renderNavigation("multiple-lists-buttons", {});
    const communityButton = getByRole("button", {
      name: "Community subnavigation",
    });
    expect(communityButton.innerHTML).toContain("svg-icon");
  });

  it("should return an aria-current when the href matches the current url", () => {
    /* conforms to Structure/Transformation AC 9 */
    const { getByRole } = renderNavigation("multiple-lists-link-ends", {});
    const currentLink = getByRole("link", {
      name: "About the Site navigation",
    });
    expect(currentLink).toBeInTheDocument();
    expect(currentLink).toHaveAttribute("aria-current", "page");
  });
});
