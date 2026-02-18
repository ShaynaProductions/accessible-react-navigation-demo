import React, { AriaRole, JSX } from "react";
import classNames from "classnames";
import { BoxProps } from "./BoxTypes";

export default function Box(props: BoxProps): JSX.Element | undefined {
  const { children, cx, inline, isHidden, label, role, testId, ...rest } =
    props;

  let proceed = true;
  if (
    (!inline &&
      /* istanbul ignore next */
      process.env.NODE_ENV === "test") || process.env.NODE_ENV === "development"
  ) {
    const ariaLabelledby = props["aria-labelledby"];
    const ariaLabel = props["aria-label"];
    const ariaRole = props["aria-role"];
    const excludedRoles: AriaRole[] = ["presentation", "none"];

    // If the role or aria role doesn't exist or has no meaning, then no aria can be passed.
    if (!role && !ariaRole) {
      const ariaFound = Object.fromEntries(
        Object.entries(props).filter(([key]) => key.startsWith("aria-")),
      );
      if (Object.keys(ariaFound).length > 0) {
        console.error(
          "Dev Error: (Box) - Aria attributes may not be passed when no role is defined.",
        );
        proceed = false;
      }
    } else if (!label && !ariaLabel && !ariaLabelledby) {
      /* istanbul ignore else */
      if(!excludedRoles.includes(role as AriaRole) && !excludedRoles.includes(ariaRole as AriaRole) )
      console.error(
        "Dev Error: (Box) - Must pass label, aria-label or aria-labelledby when a role is set.",
      );
      proceed = false;
    }

    // check for singular label
    if (role && ((label && ariaLabel) || (label && ariaLabelledby) || (ariaLabel && ariaLabelledby))) {
      console.error(
        "Dev Error: (Box) - Only one of  label, aria-label or aria-labelledby may be passed when a role is set.",
      );
      proceed = false;
    }


  }



  const componentProps = {
    ...rest,
    className: classNames({ srOnly: isHidden }, cx),
    "data-testid": testId,
    }
  const divProps ={
    "aria-label": label || props["aria-label"],
    "aria-labelledby": props["aria-labelledby"],
    role,
  };
  if (proceed) {
    return inline ? (
      <>
        <span {...componentProps}>{children}</span>
      </>
    ) : (
      <>
        <div {...componentProps} {...divProps}>{children}</div>
      </>
    );
  }
}
