import { CSSProperties } from "react";
import { AiOutlineExport } from "react-icons/ai";
import classNames from "classnames";
import { SvgProps } from "@/source/types";
import { returnTrueElementOrUndefined } from "@/source/utilities";

import "../icon.css";

export const NewWindowIcon = ({
  cx,
  label,
  size,
  testId,
}: Partial<SvgProps>) => {
  return (
    <>
      <AiOutlineExport
        className={classNames("svg-icon", cx)}
        data-testid={returnTrueElementOrUndefined(!!testId, testId)}
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
