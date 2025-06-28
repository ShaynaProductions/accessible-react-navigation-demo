"use client";
import {  JSX, Ref,  useRef } from "react";
import { Link as RacLink } from "react-aria-components";
import { sanitizeUrl } from "@braintree/sanitize-url";

import { Text } from "@/source/components";
import { NewWindowIcon } from "@/source/icons";
import { mergeRefs } from "@/source/utilities";

import { ExternalLinkProps } from "../LinkTypes";

import "../link.css";

export default function ExternalLink({
  children,
  cx,
  href,
  isDisabled,
  openInNewTab,
  ref,
  suppressNewIcon,
  target,
  testId,
  ...rest
}: ExternalLinkProps): JSX.Element {
  const currentRef = useRef<HTMLAnchorElement>(null);
  const combinedRef = mergeRefs(currentRef as Ref<HTMLAnchorElement>, ref);

  const safeHref = !isDisabled ? sanitizeUrl(href) : undefined;

  const anchorTarget = !!openInNewTab ? target || "_blank" : "_self";
  const isTargetSpecific =
    anchorTarget !== "_blank" && anchorTarget !== "_self";
  const willOpenInNewTab = !!openInNewTab || isTargetSpecific;

  const newTab =
    willOpenInNewTab && !suppressNewIcon ? (
      <NewWindowIcon cx="new-window" label="opens in a new tab" />
    ) :
      (
      <Text inline={true} hidden={true}>
        opens in a new tab
      </Text>
    );


  const racProps = {
    ...rest,
    className: cx,
    "data-testid": testId,

    href: safeHref,
    isDisabled,
    openInNewTab: openInNewTab,
    ref: combinedRef,
    target: anchorTarget,
  };

  return (
    <RacLink {...racProps}>
      {children}
      {willOpenInNewTab && newTab}
    </RacLink>
  );
}
