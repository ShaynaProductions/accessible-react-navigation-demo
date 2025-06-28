import { axe, render } from "@/test";
import { HeadingProps } from "./HeadingTypes";
import Heading from "./Heading";

const TEST_ID = "Heading";

const renderHeading = (optProps: HeadingProps, children?: string) => {

 return render(
    <Heading testId={TEST_ID} {...optProps}>
      {children || "Heading"}
    </Heading>,
  );
};

describe("<Heading />", () => {
  it("should be WCAG compliant", async () => {
    const optProps = {
      level: 1,
    };
    const { container } = renderHeading(optProps, "Hello World");

    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });

  it("should return the correct heading for the level", () => {
    const headingText = "Hello World";

    const optProps = {
      headingLevel: 1,
    };
    const { getByRole } = renderHeading(optProps, headingText);

    const heading = getByRole("heading", { level: 1 });

    expect(heading).toHaveTextContent(headingText);
  });

  it("should return an h6 if heading isn't h1-h6", () => {
    const headingText = "Hello World";

    const optProps = {
      headingLevel: 7,
    };
    const { getByRole } = renderHeading(optProps, headingText);

    const text = getByRole("heading", { level: 6 });

    expect(text).toBeInTheDocument();
  });
  it("should render as an h2 when no headinglevel is passed", () => {
    const optProps = {  };
    const { getByRole } = renderHeading(optProps);

    const component = getByRole("heading", { level: 2 });

    expect(component).toBeInTheDocument();
  });
  it("should render as an h3 when a headingLevel 3 is passed", () => {
    const optProps = {};
    const { getByRole } = renderHeading(optProps);

    const component = getByRole("heading", { level: 2 });

    expect(component).toBeInTheDocument();
  });
  it("should display with an h3 class when a variant is passed", () => {
    const { container, getByRole } = renderHeading({
      headingLevel: 2,
      variant: "h3",
    });

    const component = getByRole("heading", { level: 2 });

    expect(component).toBeInTheDocument();

    expect(container.getElementsByClassName("h3")).toHaveLength(1);
  });
});
