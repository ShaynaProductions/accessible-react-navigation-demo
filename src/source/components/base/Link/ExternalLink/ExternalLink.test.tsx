import React, { act } from "react";
import { axe,  render } from "@/test";
import { ExternalLinkProps } from "../LinkTypes";
import ExternalLink from "./ExternalLink";

const TEST_ID = "ExternalLink";
const label = "Outside Link";

const renderExternalLink = (props: Partial<ExternalLinkProps>) => {
    return render(
        <ExternalLink href="#" testId={TEST_ID} {...props}>
            {label}
        </ExternalLink>,
    );
};

describe("<ExternalLink />", () => {
    it("should be WCAG compliant", async () => {
        const optProps = { testId: undefined, target: undefined };
        const { container } = renderExternalLink(optProps);

        const results = await act(() => axe(container));
        expect(results).toHaveNoViolations();
    });

    it("should not have an href when disabled", () => {
        const optProps = { isDisabled: true };
        const { getByTestId } = renderExternalLink(optProps);

        const link = getByTestId(`${TEST_ID}`);
        expect(link).toBeInTheDocument();

        expect(link).toHaveAttribute("aria-disabled", "true");
        expect(link).not.toHaveAttribute("href");
    });

    it("should have an href when enabled", () => {
        const optProps = {};
        const { getByTestId } = renderExternalLink(optProps);

        const link = getByTestId(`${TEST_ID}`);
        expect(link).toBeInTheDocument();

        expect(link).not.toHaveAttribute("aria-disabled", "true");
        expect(link).toHaveAttribute("href");
    });

    it("should announce it opens in a new window when openInNewTab is true", () => {
        const optProps = { openInNewTab: true };
        const { getByLabelText, getByRole, getByTestId } =
            renderExternalLink(optProps);

        const link = getByTestId(`${TEST_ID}`);
        expect(link).toBeInTheDocument();

        const svg = getByRole("img");
        expect(svg).toBeInTheDocument();

        expect(link).toHaveAttribute("target", "_blank");
        const icon = getByLabelText("opens in a new tab");
        expect(icon).toBeInTheDocument();
    });

    it("should announce it opens in a new tab when openInNewTab is true, even if the icon is not available", () => {
        const optProps = {
            openInNewTab: true,
            suppressNewIcon: true,
        };
        const { queryAllByRole, getByText, getByTestId } =
            renderExternalLink(optProps);

        const link = getByTestId(`${TEST_ID}`);
        expect(link).toBeInTheDocument();

        expect(link).toHaveAttribute("target", "_blank");

        const svg = queryAllByRole("img");
        expect(svg).toHaveLength(0);

        const wording = getByText("opens in a new tab");
        expect(wording).toBeInTheDocument();
    });
});