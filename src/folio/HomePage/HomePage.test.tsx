import React, { act } from "react";
import { axe, render } from "@/test";
import { HomePage } from "./HomePage";

const renderHomeComponent = () => {
  return render(<HomePage />);
};

describe("<HomePage Page />", () => {
  it("passes auto-wcag", async () => {
    const { container } = renderHomeComponent();
    const results = await act(() => axe(container));
    expect(results).toHaveNoViolations();
  });
});
