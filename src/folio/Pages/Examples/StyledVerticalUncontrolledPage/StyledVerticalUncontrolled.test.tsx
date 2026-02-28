import React, { act } from "react";
import fs from "fs";
import { axe, render } from "@/test";
import { StyledVerticalUncontrolledPage } from "./StyledVerticalUncontrolledPage";

const jsonObj = fs.readFileSync(
  "src/ui/__static__/multiple-lists-link-ends.json",
  "utf8",
);
const data = {
  navigationArray: JSON.parse(jsonObj),
};

const renderPage = () => {
  return render(<StyledVerticalUncontrolledPage data={data} />);
};

describe("StyledVerticalUncontrolledPage", () => {
  it("renders and passes automatic wcag", async () => {
    const { container } = renderPage();
    const results = await act(() => axe(container));
    expect(results).toHaveNoViolations();
  });
});
