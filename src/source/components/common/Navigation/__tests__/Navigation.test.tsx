import { act, axe, render, userEvent } from "@/test";
import Navigation from "../components/Navigation";
import { NavigationProps } from "../NavigationTypes";
import fs from "fs";
import { transformNavigation } from "@/source/components";

const TEST_ID = "Navigation";

const renderNavigation = (
  filename: string,
  optProps: Partial<NavigationProps>,
) => {
  const jsonObj = fs.readFileSync(`public/__static__/${filename}.json`, "utf8");

  const navObject = JSON.parse(jsonObj);
  const navigation = transformNavigation(navObject.navigation, TEST_ID);

  return render(
    <Navigation testId={TEST_ID} label="test" {...optProps}>
      {navigation}
    </Navigation>,
  );
};

describe("<Navigation WCAG />", () => {
  it("Simple Sub Navigation should be WCAG compliant", async () => {
    const optProps = {};
    const { container } = await act(() =>
      renderNavigation("simpleStructure", optProps),
    );

    const results = await act(() => axe(container));

    expect(results).toHaveNoViolations();
  });
  it("Simple Sub Navigation should be WCAG compliant", async () => {
    const optProps = {};
    const { container } = await act(() =>
      renderNavigation("SimpleStructureWithSubNav", optProps),
    );

    const results = await act(() => axe(container));

    expect(results).toHaveNoViolations();
  });

  it("should handle an OnClick", async () => {
    const optProps = {};
    const { getByTestId, getByLabelText } = await act(() =>
      renderNavigation("SimpleStructureWithSubNav", optProps),
    );
    const readButton = getByLabelText("Read sub menu");
    const readList = getByTestId(`${TEST_ID}-read-menu-read-menu-list`);

    expect(readButton).toBeInTheDocument();
    expect(readList).toBeInTheDocument();
    expect(readButton).not.toHaveClass("expanded");
    await userEvent.click(readButton);
    expect(readButton).toHaveClass("expanded");
  });
});
