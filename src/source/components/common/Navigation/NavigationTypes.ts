import React from "react";
import { BaseProps } from "@/source/types";
import { ListProps } from "@/source/components/base";

export type FocusableElement = HTMLAnchorElement | HTMLButtonElement;

export interface NavigationProps extends BaseProps {
  children: React.ReactNode;
  label: string;
  orientation?: "horizontal" | "vertical";
  parentEl?: HTMLButtonElement | null;
}

export interface NavigationListProps extends BaseProps, ListProps {
  isOpen: boolean;
  parentRef?: React.RefObject<HTMLButtonElement | null>;
}

export interface NavigationItemProps extends BaseProps {
  href: string;
  label: string;
  menu?: NavigationItemProps[];
}

export interface SubNavigationProps extends Omit<NavigationItemProps, "href"> {
  children: React.ReactNode;
}

export interface NavigationWrapperProps extends Omit<BaseProps, "testid"> {
  children: React.ReactNode;
  label: string;
  parentEl?: HTMLButtonElement | null;
}
