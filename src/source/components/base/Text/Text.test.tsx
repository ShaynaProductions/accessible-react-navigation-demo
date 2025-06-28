import { render, axe } from "@/test";
import Text from "./Text";
import { TextProps } from "./TextTypes";

const TEST_ID = "Text";

const renderText = (optProps: TextProps) => {
  return render(<Text {...optProps}></Text>);
};

describe("<Text />", () => {
  it("should be WCAG compliant as a Phrase control", async () => {
    const optProps = { inline: true, testId: TEST_ID };
    const { container } = renderText(optProps);

    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });

  it("should be WCAG compliant as a Flow control", async () => {
    const optProps = {};
    const { container } = renderText(optProps);

    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
  it("should load as inline", () => {
    const optProps = { inline: true, testId: TEST_ID };
    const { getByTestId } = renderText(optProps);

    expect(getByTestId(TEST_ID)).toBeInTheDocument();
  });

  it("should be visually hidden when hidden is true", () => {
    const optProps = { hidden: true, testId: TEST_ID };
    const { container } = renderText(optProps);

    expect(container.getElementsByClassName("srOnly")).toHaveLength(1);
  });
});
