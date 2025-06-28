import { ButtonProps as RacButtonProps } from "react-aria-components";
import { BaseProps } from "@/source/types";

export interface ButtonProps extends BaseProps, RacButtonProps {
  isPressed?: boolean;
  ref?: React.RefObject<HTMLButtonElement | null>;
}