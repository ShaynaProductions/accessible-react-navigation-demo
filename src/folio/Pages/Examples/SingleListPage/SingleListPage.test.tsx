import React, { act } from "react";
import fs from "fs";
import { axe, render } from "@/test";
import { SingleListPage } from "./SingleListPage";

const jsonObj = fs.readFileSync("src/ui/__static__/single-list.json", "utf8");
const data = {
  navigationArray: JSON.parse(jsonObj),
};

const renderPage = () => {
  return render(<SingleListPage data={data} />);
};

describe("SingleListPage", () => {
  it("renders and passes automatic wcag", async () => {
    const { container } = renderPage();
    const results = await act(() => axe(container));
    expect(results).toHaveNoViolations();
  });
});
