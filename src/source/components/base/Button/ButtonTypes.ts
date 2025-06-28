import { ButtonProps as RacButtonProps } from "react-aria-components";
import { BaseInterface } from "@/source/types";

export interface ButtonProps extends BaseInterface, RacButtonProps {
  isPressed?: boolean;
  ref?: React.RefObject<HTMLButtonElement | null>;
}