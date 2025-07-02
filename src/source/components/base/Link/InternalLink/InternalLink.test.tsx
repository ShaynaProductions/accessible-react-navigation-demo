import React, { act } from "react";
import { axe, fireEvent, render } from "@/test";
import { InternalLinkProps } from "../LinkTypes";
import InternalLink from "./InternalLink";

const TEST_ID = "LinkFacade";
const label = "Internal InternalLink";

const renderLink = (props: Partial<InternalLinkProps>) => {
  return render(
    <InternalLink href="#" testId={TEST_ID} {...props}>
      {label}
    </InternalLink>,
  );
};

describe("<InternalLink />", () => {
  it("should be WCAG compliant", async () => {
    const optProps = { testId: undefined };
    const { container } = await act(() => renderLink(optProps));

    const results = await act(() => axe(container));

    expect(results).toHaveNoViolations();
  });

  it("should not have an href when disabled", () => {
    const optProps = { isDisabled: true };
    const { getByTestId } = renderLink(optProps);

    const link = getByTestId(`${TEST_ID}-client`);
    expect(link).toBeInTheDocument();

    expect(link).toHaveAttribute("aria-disabled", "true");
    expect(link).toHaveAttribute("href", "");
  });

  it("should have an href when enabled", () => {
    const optProps = {};
    const { getByTestId } = renderLink(optProps);

    const link = getByTestId(`${TEST_ID}-client`);
    expect(link).toBeInTheDocument();

    expect(link).not.toHaveAttribute("aria-disabled", "true");
    expect(link).toHaveAttribute("href");
  });

  it("should not have a data-focused attribute when isFocused is false", () => {
    const optProps = { isFocused: false };

    const { getByTestId } = renderLink(optProps);

    const link = getByTestId(`${TEST_ID}-client`);
    expect(link).toBeInTheDocument();
    expect(link).not.toHaveAttribute("data-focused", "true");
  });

  it("should have a data-focused attribute when isLinkFocused is true", () => {
    const optProps = { isFocused: true };

    const { getByTestId } = renderLink(optProps);

    const link = getByTestId(`${TEST_ID}-client`);
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("data-focused", "true");
  });

  it("should not have a data-hovered attribute when isHovered is false", () => {
    const optProps = { isHovered: false };

    const { getByTestId } = renderLink(optProps);

    const link = getByTestId(`${TEST_ID}-client`);
    expect(link).toBeInTheDocument();
    expect(link).not.toHaveAttribute("data-hovered", "true");
  });

  it("should have a data-hovered attribute when isLinkFocused is true", () => {
    const optProps = { isHovered: true };

    const { getByTestId } = renderLink(optProps);

    const link = getByTestId(`${TEST_ID}-client`);
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("data-hovered", "true");
  });

  it("should handle an onFocusEvent when onFocus is triggered", async () => {
    const handleOnFocus = jest.fn();

    const optProps = { onFocus: handleOnFocus };
    const { getByTestId } = renderLink(optProps);

    const link = getByTestId(`${TEST_ID}-client`);
    expect(link).toBeInTheDocument();

    fireEvent.focus(link);

    await act(() => {
      expect(handleOnFocus).toHaveBeenCalled();
    });
  });
  it("should handle an onBlurEvent when onBlur is triggered", async () => {
    const handleOnBlur = jest.fn();
    const handleOnFocus = jest.fn();

    const optProps = {
      onFocus: handleOnFocus,
      onBlur: handleOnBlur,
    };
    const { getByTestId } = renderLink(optProps);

    const link = getByTestId(`${TEST_ID}-client`);
    expect(link).toBeInTheDocument();
    fireEvent.focus(link);
    expect(handleOnFocus).toHaveBeenCalled();

    fireEvent.blur(link);

    expect(handleOnBlur).toHaveBeenCalled();
  });

  it("should handle onHoverEvents when onMouseEnter is triggered", async () => {
    const handleOnHover = jest.fn();
    const handleOnHoverOut = jest.fn();

    const optProps = {
      onHover: handleOnHover,
      onHoverOut: handleOnHoverOut,
    };
    const { getByTestId } = renderLink(optProps);

    const link = getByTestId(`${TEST_ID}-client`);
    expect(link).toBeInTheDocument();

    fireEvent.mouseEnter(link);

    await act(() => {
      expect(handleOnHover).toHaveBeenCalled();
    });

    fireEvent.mouseLeave(link);
    await act(() => {
      expect(handleOnHoverOut).toHaveBeenCalled();
    });
  });
});
