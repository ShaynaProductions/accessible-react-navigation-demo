import React, { act } from "react";
import { axe, fireEvent, render } from "@/test";
import { LinkProps } from "./LinkTypes";
import { Link } from "./Link";

const TEST_ID = "LinkFacade";
const label = "Internal Link";

const renderLink = (props: Partial<LinkProps>) => {
  const href = props.href || "";
  return render(
    <Link href={href} testId={TEST_ID} {...props}>
      {label}
    </Link>,
  );
};

describe("<Link />", () => {
  it("should be WCAG compliant and be a link with an href", async () => {
    /* Conforms to Link AC 2/3 */
    const href = "https://www.test.com/";
    const optProps = { testId: undefined, href: href };
    const { container, getByRole } = await act(() => renderLink(optProps));

    const results = await act(() => axe(container));
    const link = getByRole("link", { name: label });
    expect(link).toHaveAttribute("href", href);

    expect(results).toHaveNoViolations();
  });

  it(" should have an href when one is passed in", () => {
    /* Conforms to Link AC 1 */
    const optProps = { href: "testing/" };
    const { getByRole } = renderLink(optProps);

    const link = getByRole("link");
    expect(link).toBeInTheDocument();

    expect(link).not.toHaveAttribute("aria-disabled", "true");
    expect(link).toHaveAttribute("href");
  });

  it("should announce it opens in a new window when a target is set", () => {
    /* Conforms to Link AC 4 */
    const optProps = { href: "test", target: "glossary" };
    const { getByRole } = renderLink(optProps);

    const link = getByRole("link");
    expect(link).toBeInTheDocument();
    expect(link).toHaveTextContent("opens in a new tab");
  });

  it("should announce it opens in a new window when openInNewTab is true", () => {
    /* Conforms to Link AC 4 */
    const optProps = { openInNewTab: true };
    const { getByLabelText, getByRole, getByTestId } = renderLink(optProps);

    const link = getByTestId(`${TEST_ID}`);
    expect(link).toBeInTheDocument();

    const svg = getByRole("graphics-symbol");
    expect(svg).toBeInTheDocument();

    expect(link).toHaveAttribute("target", "_blank");
    const icon = getByLabelText("opens in a new tab");
    expect(icon).toBeInTheDocument();
  });

  it("should announce it opens in a new tab when openInNewTab is true, even if the icon is not available", () => {
    /* Conforms to Link AC 4 */
    const optProps = {
      openInNewTab: true,
      suppressNewIcon: true,
    };
    const { queryAllByRole, getByText, getByTestId } = renderLink(optProps);

    const link = getByTestId(`${TEST_ID}`);
    expect(link).toBeInTheDocument();

    expect(link).toHaveAttribute("target", "_blank");

    const svg = queryAllByRole("img");
    expect(svg).toHaveLength(0);

    const wording = getByText("opens in a new tab");
    expect(wording).toBeInTheDocument();
  });

  it("should handle an onFocusEvent when onFocus is triggered", () => {
    /* Conforms to Link AC 5 */
    const handleOnFocus = jest.fn();

    const optProps = { onFocus: handleOnFocus };
    const { getByTestId } = renderLink(optProps);

    const link = getByTestId(TEST_ID);
    expect(link).toBeInTheDocument();

    fireEvent.focus(link);

    expect(handleOnFocus).toHaveBeenCalled();
  });
  it("should handle an onBlurEvent when onBlur is triggered", async () => {
    /* Conforms to Link AC 5 */
    const handleOnBlur = jest.fn();
    const handleOnFocus = jest.fn();

    const optProps = {
      onFocus: handleOnFocus,
      onBlur: handleOnBlur,
    };
    const { getByTestId } = renderLink(optProps);

    const link = getByTestId(TEST_ID);
    expect(link).toBeInTheDocument();
    fireEvent.focus(link);
    expect(handleOnFocus).toHaveBeenCalled();

    fireEvent.blur(link);

    expect(handleOnBlur).toHaveBeenCalled();
  });

  it("should handle onHoverEvents when onMouseEnter is triggered", async () => {
    /* Conforms to Link AC 5 */
    const handleMouseEnter = jest.fn();
    const handleMouseLeave = jest.fn();

    const optProps = {
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
    };
    const { getByTestId } = renderLink(optProps);

    const link = getByTestId(TEST_ID);
    expect(link).toBeInTheDocument();

    fireEvent.mouseEnter(link);

    await act(() => {
      expect(handleMouseEnter).toHaveBeenCalled();
    });

    fireEvent.mouseLeave(link);
    await act(() => {
      expect(handleMouseLeave).toHaveBeenCalled();
    });
  });

  it("should not have a data-hovered attribute when isHovered is false", () => {
    /* Conforms to Link AC 6 */
    const optProps = { isHovered: false };

    const { getByTestId } = renderLink(optProps);

    const link = getByTestId(TEST_ID);
    expect(link).toBeInTheDocument();
    expect(link).not.toHaveAttribute("data-hovered");
  });

  it("should have a data-hovered attribute when isHovered is true", () => {
    /* Conforms to Link AC 6 */
    const optProps = { isHovered: true };

    const { getByTestId } = renderLink(optProps);

    const link = getByTestId(TEST_ID);
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("data-hovered", "true");
  });

  it("should not have a data-focused attribute when isFocused is false", () => {
    /* Conforms to Link AC 7 */
    const optProps = { isFocused: false };

    const { getByTestId } = renderLink(optProps);

    const link = getByTestId(TEST_ID);
    expect(link).toBeInTheDocument();
    expect(link).not.toHaveAttribute("data-focused");
  });

  it("should have a data-focused attribute when isFocused is true", () => {
    /* Conforms to Link AC 7 */
    const optProps = { isFocused: true };

    const { getByTestId } = renderLink(optProps);

    const link = getByTestId(TEST_ID);
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("data-focused", "true");
  });
});
