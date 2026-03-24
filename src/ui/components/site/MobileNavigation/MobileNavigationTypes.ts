import { BaseProps } from "@/ui/types";

export interface MobileNavigationProps extends BaseProps {
  /**
   * The children of the component.
   */
  children: React.ReactNode;
  /**
   * Navigation Name
   */
  label: string;
  /*
   * data attribute name (defaults to "skip" for data-skip */
  skipName?: string;
}
