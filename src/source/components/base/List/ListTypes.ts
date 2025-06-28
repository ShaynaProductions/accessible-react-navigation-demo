import React from "react";
import { BaseInterface, Orientation } from "@/source/types";

export interface ListProps extends BaseInterface {
  children?: React.ReactNode;
  /**
   * Used for both Ordered and unordered lists
   *
   * @param e: FocusEventHandler<HTMLOListElement | HTMLUListElement | undefined>
   */
  onFocus?: (
    e: React.FocusEventHandler<HTMLOListElement | HTMLUListElement | undefined>,
  ) => void;
  /**
   *
   * @param e: React.KeyboardEvent
   */
  onKeyDown?: (e: React.KeyboardEvent) => void;
  /**
   * default (false) when true, produces an <ol> instead of a <ul>
   */
  ordered?: boolean;

  /**
   * horizontal | vertical
   */
  orientation?: Orientation;
  /**
   *  Ref<HTMLUListElement|HTMLOListElement | null>
   */
  ref?: React.Ref<HTMLUListElement | HTMLOListElement | null>;
  role?: string;
}

export type ListItemRoles = "listitem" | "menuitem" | "treeitem";

export interface ListItemProps extends BaseInterface {
  /**
   * The children of the component.
   */
  children?: React.ReactNode;
  /**
   * Unique key for each item
   */
  key?: string;
  /**
   *
   * @param e: React.KeyboardEvent
   */
  onKeyDown?: (e: React.KeyboardEvent) => void;
  /**
   * RefObject<HTMLLIElement | null>
   */
  ref?: React.RefObject<HTMLLIElement | null>;
  /**
   * "listItem" (default)  | "menuitem" | "treeitem"
   */
  role?: ListItemRoles;
}
