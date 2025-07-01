import { CSSProperties } from "react";
import { HiChevronRight } from "react-icons/hi2";
import classNames from "classnames";
import { SvgProps } from "@/source/types";
import { returnTrueElementOrUndefined } from "@/source/utilities";

import "../icon.css";

export const ChevronRightIcon = ({
  cx,
  label,
  size,
  testId,
}: Partial<SvgProps>) => {
  return (
    <>
      <HiChevronRight
        className={classNames("svg-icon", cx)}
        data-testid={testId}
        aria-label={returnTrueElementOrUndefined(!!label, label)}
        aria-hidden={returnTrueElementOrUndefined(!label)}
        role="img"
        style={returnTrueElementOrUndefined(!!size, {
          "--component-item-size": size,
        } as CSSProperties)}
      />
    </>
  );
};
