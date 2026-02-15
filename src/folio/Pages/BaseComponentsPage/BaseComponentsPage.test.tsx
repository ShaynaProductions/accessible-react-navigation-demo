import React, { act } from "react";
import { axe, render, userEvent } from "@/test";
import { BaseComponentsPage } from "./BaseComponentsPage";

const renderBaseComponentsView = (optProps) => {
  return render(<BaseComponentsPage {...optProps} />);
};

describe("<BaseComponentsPage />", () => {
  it("passes auto-wcag", async () => {
    const { container } = renderBaseComponentsView({});
    const results = await act(() => axe(container));
    expect(results).toHaveNoViolations();
  });
  it("opens the Button section when the button is clicked", async () => {
    const { getByRole, queryByRole, queryAllByRole } = renderBaseComponentsView(
      {},
    );
    const headingTitle = "Button Component";
    const button = getByRole("button", { name: "Display Button Information" });
    const heading = queryByRole("heading", { name: headingTitle });
    expect(button).toBeInTheDocument();
    expect(heading).not.toBeInTheDocument();
    await userEvent.click(button);
    const headingShown = queryAllByRole("heading", {
      name: headingTitle,
    });
    expect(headingShown).toHaveLength(1);
  });

  it("opens the text section when the button is clicked", async () => {
    const { getByRole, queryByRole, queryAllByRole } = renderBaseComponentsView(
      {},
    );
    const headingTitle = "Text Component";

    const button = getByRole("button", { name: "Display Text Information" });
    const heading = queryByRole("heading", { name: headingTitle });
    expect(button).toBeInTheDocument();
    expect(heading).not.toBeInTheDocument();
    await userEvent.click(button);
    const headingShown = queryAllByRole("heading", {
      name: headingTitle,
    });
    expect(headingShown).toHaveLength(1);
  });

  it("opens the headings section when the button is clicked", async () => {
    const { getByRole, queryByRole, queryAllByRole } = renderBaseComponentsView(
      {},
    );
    const headingTitle = "Heading Component";
    const button = getByRole("button", { name: "Display Heading Information" });
    const heading = queryByRole("heading", { name: headingTitle });
    expect(button).toBeInTheDocument();
    expect(heading).not.toBeInTheDocument();
    await userEvent.click(button);
    const headingShown = queryAllByRole("heading", {
      name: headingTitle,
    });
    expect(headingShown).toHaveLength(1);
  });

  it("opens the link section when the button is clicked", async () => {
    const { getByRole, queryByRole, queryAllByRole } = renderBaseComponentsView(
      {},
    );
    const headingTitle = "Link Component";
    const button = getByRole("button", { name: "Display Link Information" });
    const heading = queryByRole("heading", { name: headingTitle });
    expect(button).toBeInTheDocument();
    expect(heading).not.toBeInTheDocument();
    await userEvent.click(button);
    const headingShown = queryAllByRole("heading", {
      name: headingTitle,
    });
    expect(headingShown).toHaveLength(1);
  });

  it("opens the list section when the button is clicked", async () => {
    const { getByRole, queryByRole, queryAllByRole } = renderBaseComponentsView(
      {},
    );
    const headingTitle = "List and ListItem Components";
    const button = getByRole("button", { name: "Display List Information" });
    const heading = queryByRole("heading", { name: headingTitle });
    expect(button).toBeInTheDocument();
    expect(heading).not.toBeInTheDocument();
    await userEvent.click(button);
    const headingShown = queryAllByRole("heading", {
      name: headingTitle,
    });
    expect(headingShown).toHaveLength(1);
  });
});
