import { axe, render } from "@/test";
import { NewWindowIcon } from "@/ui/svg";
import { IconProps } from "./IconTypes";
import Icon from "./Icon";

const renderIcon = (optProps: Omit<IconProps, "IconComponent">) => {
  return render(<Icon IconComponent={NewWindowIcon} {...optProps} />);
};

describe("Icon", () => {
  it("should be WCAG compliant", async () => {
    /* Conforms to Icon AC 1 */
    const { container, getByRole } = renderIcon({ label: "New Window" });
    expect(getByRole("graphics-symbol")).toBeInTheDocument();

    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });

  it("should render with aria-hidden when isSilent is true", () => {
    /* Conforms to Icon AC 2 */
    const { getByRole } = renderIcon({ isSilent: true });
    const svgImage = getByRole("graphics-symbol", { hidden: true });
    expect(svgImage).toBeInTheDocument();
  });

  it("should not render when label is not passed in", () => {
    /* Conforms to Icon AC 3 */
    const logSpy = jest.spyOn(console, "error");
    const { queryByRole } = renderIcon({});
    const svgImage = queryByRole("graphics-symbol");
    expect(svgImage).not.toBeInTheDocument();
    expect(logSpy).toHaveBeenCalledWith(
      "Dev Error: (Icon) - WCAG 1.1.1: Label must be provided when isSilent is not set.",
    );
  });
  it("should not render when both isSilent and label are passed in", () => {
    /* Conforms to Icon AC 3 */
    const logSpy = jest.spyOn(console, "error");
    const { queryByRole } = renderIcon({ isSilent: true, label: "Silent" });
    const svgImage = queryByRole("graphics-symbol");
    expect(svgImage).not.toBeInTheDocument();
    expect(logSpy).toHaveBeenCalledWith(
      "Dev Error: (Icon) - WCAG 1.1.1 Label may not be defined when isSilent is set to true.",
    );
  });
});
