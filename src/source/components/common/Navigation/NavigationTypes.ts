import { ReactNode } from "react";
import { BaseProps } from "@/source/types";
import { ListProps } from "@/source/components/base";

export interface NavigationProps extends BaseProps {
  children: ReactNode;
  label: string;
}

export interface NavigationListProps extends BaseProps, ListProps {}

export interface NavigationItemProps extends BaseProps {
  href: string;
  label: string;
  menu?: NavigationItemProps[];
}
