import { JSX } from "react";

import { returnTrueElementOrUndefined } from "@/source/utilities";

import { ListItemProps } from "./ListTypes";

export default function ListItem({
  children,
  cx,
  role,
  testId,
  ...rest
}: ListItemProps): JSX.Element {
  return (
    <>
      <li
        className={cx}
        data-testid={returnTrueElementOrUndefined(!!testId, testId)}
        role={role || "listitem"}
        {...rest}
      >
        {children}
      </li>
    </>
  );
}
