import React from "react";
import { BaseProps, Orientation } from "@/ui/types";

export type ListItemRoles = "listitem" | "menuitem" | "treeitem";
export type ListRoles = "list" | "menu" | "tree";

/**
 * Used for both Ordered and unordered lists
 */
export interface ListProps extends BaseProps {
  /**
   * The children of the component.
   */
  children?: React.ReactNode;

  /**
   * default (false) when true, produces an <ol> instead of a <ul>
   */
  isOrdered?: boolean;

  /**
   * "horizontal" | "vertical" (default)
   */
  orientation?: Orientation;

  /**
   *     "list" (default) | "menu" | "tree"
   */
  role?: ListRoles;
}

export interface ListItemProps extends BaseProps {
  /**
   * The children of the component.
   */
  children: React.ReactNode;

  /**
   * Unique key for each item
   */
  key?: string;

  /**
   * "listItem" (default)  | "menuitem" | "treeitem"
   */
  role?: ListItemRoles;
}
