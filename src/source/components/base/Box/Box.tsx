import React, { JSX } from "react";
import classNames from "classnames";
import { BoxProps } from "./BoxTypes";

export default function Box({
  children,
  cx,
  inline,
  isHidden,
  testId,
  ...rest
}: BoxProps): JSX.Element {
  const boxClass = classNames({ srOnly: isHidden }, cx);

  const boxComponent = !!inline ? "span" : "div";
  const Component = ({...rest}: React.HTMLAttributes<HTMLDivElement | HTMLSpanElement>) =>
    React.createElement(boxComponent, rest, children);

  return (
    <Component
      className={boxClass}
      data-testid={testId}
      {...rest}
    >
      {children}
    </Component>
  );
}
