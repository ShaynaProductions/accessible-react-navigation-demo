import React, { act } from "react";
import { axe, render, userEvent, waitFor } from "@/test";

import Button from "./Button";
import { ButtonProps } from "./";

const TEST_ID = "Button";

const renderButton = (optProps: ButtonProps) => {
  return render(
    <Button testId={TEST_ID} {...optProps}>
      Tap Me
    </Button>,
  );
};

describe("<Button />", () => {
    it("loads", () => {
      const optProps = {};
      const { getByText } = renderButton(optProps);

      const button = getByText("Tap Me");
      expect(button).toBeInTheDocument();
    });

    it("should pass auto-wcag", async () => {
      const optProps = {};
      const { container } = renderButton(optProps);

      const results = await act(() => axe(container));
      expect(results).toHaveNoViolations();
    });

    it("should pass auto-wcag when disabled", async () => {
      const optProps =  { isDisabled: true };
      const { container } = renderButton(optProps);

      const results = await act(() => axe(container));
      expect(results).toHaveNoViolations();
    });

    it("handles a press event", async () => {
      const handlePress = jest.fn();
      const optProps = { onPress: handlePress };
      const { getByRole } = renderButton(optProps);

      const button = getByRole("button");
      expect(button).toBeInTheDocument();

      await userEvent.click(button);

      await waitFor(() => expect(handlePress).toHaveBeenCalled());
    });

    it("does not handle a press event when disabled", async () => {
      const handlePress = jest.fn();
      const optProps = { onPress: handlePress, isDisabled: true };
      const { getByRole, rerender } = renderButton(optProps);

      const button = getByRole("button");
      expect(button).toBeInTheDocument();

      await userEvent.click(button);

      await waitFor(() => expect(handlePress).not.toHaveBeenCalled());

      rerender(<Button isDisabled={false}>Click Me</Button>);
    });
});
