import React from "react";
import { ButtonProps as RACButtonProps } from "react-aria-components";
import { BaseProps } from "@/ui/types";

export interface ButtonProps extends BaseProps, Omit<RACButtonProps, "style"> {
  ref?: React.RefObject<HTMLButtonElement | null>;
}
