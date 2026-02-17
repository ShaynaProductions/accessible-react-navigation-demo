import React, { act } from "react";
import { axe,  render } from "@/test";
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
    /* Conforms to Link AC 1/2/3 */
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

  it("should sanitize a url which passes javascript", () => {
    /* conforms to Link AC 5 */
    const href = "javascript:alert(document.domain)";
    const optProps = { testId: undefined, href: href };
    const {  getByRole } = renderLink(optProps);
    const link = getByRole("link", {name: label});
    expect(link).not.toHaveAttribute("href", href);
    expect(link).toHaveAttribute("href", "about:blank");
  })
});
