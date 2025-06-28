import React, { JSX } from "react";
import classNames from "classnames";
import { Text as RacText } from "react-aria-components";

import { returnTrueElementOrUndefined } from "@/source/utilities";
import { TextProps } from "./TextTypes";

export default function Text({
  children,
  cx,
  inline,
  hidden,
  testId,
  ...rest
}: TextProps): JSX.Element {
  const textClass = classNames(
    { srOnly: returnTrueElementOrUndefined(!!hidden) },
    cx,
  );

  const elementType = !!inline ? "span" : "p";

  return (
    <RacText
      elementType={elementType}
      className={textClass}
      data-testid={returnTrueElementOrUndefined(!!testId, testId)}
      {...rest}
    >
      {children}
    </RacText>
  );
}
