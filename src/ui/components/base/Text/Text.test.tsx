import { render, axe } from "@/test";
import Text from "./Text";
import { TextProps } from "@/ui/components/base";

const TEST_ID = "Text";

const renderText = (optProps: TextProps) => {
  return render(
    <Text testId={TEST_ID} {...optProps}>
      Hello World
    </Text>,
  );
};

describe("<Text />", () => {
  it("should be WCAG compliant as a Phrase control", async () => {
    /* Conforms to Text AC 1 */
    const optProps = { isInline: true };
    const { container } = renderText(optProps);

    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });

  it("should be WCAG compliant as a Flow control", async () => {
    /* Conforms to Text AC 1 */
    const optProps = {};
    const { container } = renderText(optProps);

    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });

  it("should load as inline", () => {
    /* Conforms to Text AC 1 */
    const optProps = { isInline: true };
    const { getByTestId } = renderText(optProps);

    expect(getByTestId(TEST_ID)).toBeInTheDocument();
  });

  it("should be visually hidden when isHidden is true", () => {
    /* Conforms to Text AC 2 */
    const optProps = { isHidden: true };
    const { container } = renderText(optProps);

    expect(container.getElementsByClassName("srOnly")).toHaveLength(1);
  });
});
