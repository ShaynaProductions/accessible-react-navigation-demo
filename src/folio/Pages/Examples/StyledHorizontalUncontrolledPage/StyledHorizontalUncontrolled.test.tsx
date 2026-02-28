import React, { act } from "react";
import fs from "fs";
import { axe, render } from "@/test";
import { StyledHorizontalUncontrolledPage } from "./StyledHorizontalUncontrolledPage";

const jsonObj = fs.readFileSync(
  "src/ui/__static__/multiple-lists-link-ends.json",
  "utf8",
);
const data = {
  navigationArray: JSON.parse(jsonObj),
};

const renderPage = () => {
  return render(<StyledHorizontalUncontrolledPage data={data} />);
};

describe("MultipleListLinkEndsPage", () => {
  it("renders and passes automatic wcag", async () => {
    const { container } = renderPage();
    const results = await act(() => axe(container));
    expect(results).toHaveNoViolations();
  });
});
