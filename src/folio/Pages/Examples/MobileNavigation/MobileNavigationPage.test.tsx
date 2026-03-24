import React, { act } from "react";
import fs from "fs";
import { axe, render } from "@/test";
import { MobileNavigationPage } from "./MobileNavigationPage";

const jsonObj = fs.readFileSync(
  "src/ui/__static__/multiple-lists-buttons.json",
  "utf8",
);
const nav = JSON.parse(jsonObj);
const title = "Mobile Menu Demo";
const description = "description goes here";

const renderView = () => {
  return render(
    <MobileNavigationPage
      navigation={nav}
      title={title}
      description={description}
    />,
  );
};

describe("MobileNavigationView", () => {
  it("passes auto-wcag", async () => {
    const { container } = renderView();
    const results = await act(() => axe(container));
    expect(results).toHaveNoViolations();
  });
});
