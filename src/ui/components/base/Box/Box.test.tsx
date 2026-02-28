import { act } from "react";
import { axe, render } from "@/test";
import Box from "./Box";
import { BoxProps } from "./BoxTypes";

const TEST_ID = "Box";

const renderBox = (optProps: BoxProps) => {
  return render(<Box testId={TEST_ID} {...optProps}></Box>);
};

describe("<Box />", () => {
  it("should be WCAG compliant", async () => {
    const optProps = {};
    const { container } = await act(() => renderBox(optProps));

    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });

  it("should be WCAG compliant when loaded with a role and label",  async () => {
    const optProps = {role: "note", label: "note"};
    const { container } = renderBox(optProps);
    const results = await axe(container);

    expect(results).toHaveNoViolations();

  })

  it("should load as inline", () => {
    const optProps = { inline: true, testId: TEST_ID };
    const { getByTestId } = renderBox(optProps);
    const component =getByTestId(TEST_ID);
    
    expect(component).toBeInTheDocument();

  });

  it("should be visually hidden when isHidden is true", () => {
    const optProps = { isHidden: true, testId: TEST_ID };
    const { container } = renderBox(optProps);

    expect(container.getElementsByClassName("srOnly")).toHaveLength(1);
  });

  it("should not render when aria attributes are passed in with no role", () => {
    const logSpy = jest.spyOn(console, "error");
    const optProps ={"aria-label": "I should not be here"};

    const { queryByTestId } = renderBox(optProps)  ;
    const component =queryByTestId(TEST_ID);
    expect(component).not.toBeInTheDocument();
    expect(logSpy).toHaveBeenCalledWith("Dev Error: (Box) - Aria attributes may not be passed when no role is defined.");
  }) ;

  it("should not render when a role is defined, but label is not passed through", () => {
    const logSpy = jest.spyOn(console, "error");
    const optProps ={role: "note"};

    const { queryByTestId } = renderBox(optProps)  ;
    const component =queryByTestId(TEST_ID);
    expect(component).not.toBeInTheDocument();
    expect(logSpy).toHaveBeenCalledWith("Dev Error: (Box) - Must pass label, aria-label or aria-labelledby when a role is set.");
  })

  it("should not render when a role is defined, and multiple labels are passed through", () => {
    const logSpy = jest.spyOn(console, "error");
    const optProps ={role: "note", "label": "I should not be here", "aria-label": "Neigher should I"};

    const { queryByTestId } = renderBox(optProps)  ;
    const component =queryByTestId(TEST_ID);
    expect(component).not.toBeInTheDocument();
    expect(logSpy).toHaveBeenCalledWith("Dev Error: (Box) - Only one of  label, aria-label or aria-labelledby may be passed when a role is set.");
  })

  it("should render when a role and label are defined", () => {
     const optProps ={role: "note", label:"note"};

    const { getByRole } = renderBox(optProps)  ;
    const component =getByRole("note");
    expect(component).toBeInTheDocument();
    expect(component).toHaveAttribute("aria-label","note");
    });

  it("should render when a role and aria-label are defined", () => {
    const optProps ={role: "note", "aria-label":"note"};

    const { getByRole } = renderBox(optProps)  ;
    const component =getByRole("note");
    expect(component).toBeInTheDocument();
    expect(component).toHaveAttribute("aria-label","note");
  });

  it ("should render when a role and aria-labelledby are defined", () => {
    const optProps ={role: "note", "aria-labelledby":"note"};

    const { getByRole } = renderBox(optProps)  ;
    const component =getByRole("note");
    expect(component).toBeInTheDocument();
    expect(component).toHaveAttribute("aria-labelledby","note");
  })

});
