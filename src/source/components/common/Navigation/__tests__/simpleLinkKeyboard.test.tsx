import { render, userEvent } from "@/test";
import fs from "fs";
import {
  Box,
  Button,
  Navigation,
  NavigationProps,
  transformNavigation,
} from "@/source/components";

const jsonObj = fs.readFileSync(
  "public/__static__/simpleStructure.json",
  "utf8",
);
const nav = JSON.parse(jsonObj);

const TEST_ID = "navigation";
const endButtonLabel = "Focusable End";
const frontButtonLabel = "Focusable Front";

const renderNavigation = ({ children, label, ...rest }: NavigationProps) => {
  return render(
    <Box cx="simple">
      <Button id="front" testId={`${TEST_ID}-front`}>
        {frontButtonLabel}
      </Button>
      <Navigation label={label} testId={TEST_ID} {...rest}>
        {children}
      </Navigation>
      <Button id="button-end" testId={`${TEST_ID}-end`}>
        {endButtonLabel}
      </Button>
    </Box>,
  );
};

describe("Simple Links Navigation", () => {
  const reqProps = {
    children: transformNavigation(nav.navigation),
    id: "main-menu",
    label: "Simple Link List",
  };
  it("should move through the list Arrow Up and Arrow Down.", async () => {
    const { getByRole } = renderNavigation(reqProps);
    const frontButton = getByRole("button", { name: frontButtonLabel });
    const aboutLink = getByRole("link", { name: "About" });
    const readLink = getByRole("link", { name: "Read" });
    const blogLink = getByRole("link", { name: "Musings" });

    await userEvent.tab();
    expect(frontButton).toHaveFocus();
    await userEvent.tab();
    expect(frontButton).not.toHaveFocus();
    expect(aboutLink).toHaveFocus();
    await userEvent.tab();
    expect(readLink).toHaveFocus();

    await userEvent.keyboard("{Home}");
    expect(aboutLink).toHaveFocus();
    await userEvent.keyboard("{End}");
    expect(blogLink).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    expect(aboutLink).toHaveFocus();
    await userEvent.keyboard("{ArrowRight}");
    expect(readLink).toHaveFocus();
    await userEvent.keyboard("{ArrowLeft}");
    expect(aboutLink).toHaveFocus();
    await userEvent.keyboard("{ArrowUp}");
    expect(blogLink).toHaveFocus();
  });
  it("should move through the list using Tab and end up outside the component.", async () => {
    const { getByRole } = renderNavigation(reqProps);
    const frontButton = getByRole("button", { name: frontButtonLabel });
    const endButton = getByRole("button", { name: endButtonLabel });
    const aboutLink = getByRole("link", { name: "About" });
    const readLink = getByRole("link", { name: "Read" });
    const blogLink = getByRole("link", { name: "Musings" });

    await userEvent.tab();
    expect(frontButton).toHaveFocus();
    await userEvent.tab();
    expect(frontButton).not.toHaveFocus();
    expect(aboutLink).toHaveFocus();
    await userEvent.tab();
    expect(readLink).toHaveFocus();
    await userEvent.tab();
    expect(blogLink).toHaveFocus();
    await userEvent.tab();
    expect(endButton).toHaveFocus();
  });

  it("should move through the list using Tab and Shift Tab and exit back to the front button.", async () => {
    const { getByRole } = renderNavigation(reqProps);
    const frontButton = getByRole("button", { name: frontButtonLabel });
    const aboutLink = getByRole("link", { name: "About" });
    const readLink = getByRole("link", { name: "Read" });
    const blogLink = getByRole("link", { name: "Musings" });

    await userEvent.tab();
    expect(frontButton).toHaveFocus();
    await userEvent.tab();
    expect(frontButton).not.toHaveFocus();
    expect(aboutLink).toHaveFocus();
    await userEvent.tab();
    expect(readLink).toHaveFocus();
    await userEvent.tab();
    expect(blogLink).toHaveFocus();
    await userEvent.tab({ shift: true });
    expect(readLink).toHaveFocus();
    await userEvent.tab({ shift: true });
    expect(aboutLink).toHaveFocus();
    await userEvent.tab({ shift: true });
  });
});
