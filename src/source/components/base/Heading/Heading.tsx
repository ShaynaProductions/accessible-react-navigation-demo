
import React, { JSX } from "react";
import classNames from "classnames";
import { Heading as RacHeading } from "react-aria-components";

import { returnTrueElementOrUndefined } from "@/source/utilities";
import { HeadingProps } from "./";

export default function Heading({
  children,
  cx,
  headingLevel = 2,
  hidden = false,
  testId,
  variant,
  ...rest
}: HeadingProps): JSX.Element {
  const currentLevel = headingLevel >= 1 && headingLevel <= 6 ? headingLevel : 6;
  const currentVariant = !!variant ? variant : `h${currentLevel}`;
  const headingClass = classNames({ srOnly: hidden }, currentVariant, cx);


  return (
    <RacHeading
      className={headingClass}
      data-testid={returnTrueElementOrUndefined(!!testId, testId)}
      level={currentLevel}
      {...rest}
    >
      {children}
    </RacHeading>
  );
}
