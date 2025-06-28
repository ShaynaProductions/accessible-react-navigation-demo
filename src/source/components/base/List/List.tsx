import { FocusEventHandler, JSX } from "react";

import { returnTrueElementOrUndefined } from "@/source/utilities";
import { ListProps } from "./ListTypes";
import "./list.css";

export default function List({
  children,
  cx,
  onFocus,
  ordered = false,
  orientation = "vertical",
  ref,
  testId,
  ...rest
}: ListProps): JSX.Element {

  const commonProps = {
    "data-testid": testId,
    "data-orientation": orientation,
    className: cx,
    ref: returnTrueElementOrUndefined(!!ref, ref),
  };
  return (
    <>
      {ordered ? (
        <ol
          {...commonProps}
          onFocus={
            onFocus as unknown as FocusEventHandler<
              HTMLOListElement | undefined
            >
          }
          {...rest}
        >
          {children}
        </ol>
      ) : (
        <ul
          {...commonProps}
          onFocus={
            onFocus as unknown as FocusEventHandler<
              HTMLUListElement | undefined
            >
          }
          {...rest}
        >
          {children}
        </ul>
      )}
    </>
  );
}
