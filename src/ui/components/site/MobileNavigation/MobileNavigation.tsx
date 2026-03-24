"use client";
import { CSSProperties, JSX, useRef, useState } from "react";
import { Box, Button, Navigation, type IconProps, Icon } from "@/ui/components";
import { MenuIcon } from "@/ui/svg";
import { Orientation } from "@/ui/types";
import {
  OutsideEventListener,
  getFocusableElementFromDOM,
  Keys,
  returnTrueElementOrUndefined,
} from "@/ui/utilities";
import { MobileNavigationProps } from "@/ui/components/site/MobileNavigation/MobileNavigationTypes";
import { ControllingElementType } from "@/ui/components/common/Navigation/utilities";

export function MobileNavigation({
  children,
  cx,
  label,
  skipName = "skip",
  ...rest
}: MobileNavigationProps): JSX.Element {
  const [open, setOpen] = useState<boolean>(false);
  const buttonRef = useRef<ControllingElementType>(null);
  const closeNavigation = () => {
    setOpen(false);
  };

  const handleFocus = () => {
    /* istanbul ignore else */
    if (open) {
      closeNavigation();
    }
  };

  const handleKeyDown = (e) => {
    switch (e.key) {
      case Keys.TAB:
        /* istanbul ignore else */
        if (!open) {
          const nextEl = getFocusableElementFromDOM(buttonRef.current, "next");
          nextEl.setAttribute(`data-${skipName}`, "true");
        }
        break;
    }
  };

  const handlePress = () => {
    /* istanbul ignore else */
    if (!open) {
      const nextEl = getFocusableElementFromDOM(buttonRef.current, "next");
      nextEl.focus({ preventScroll: true });
    }
    setOpen(!open);
  };

  const buttonProps = {
    "aria-expanded": open,
    "aria-controls": "mobile-menu",
    "aria-label": "Navigation Menu",
    id: "mobile",
    isOpen: open,
    onFocus: handleFocus,
    onKeyDown: handleKeyDown,
    onPress: handlePress,
    ref: buttonRef,
    style: { "--component-item-size": 24 } as CSSProperties,
  };

  const iconProps: IconProps = {
    IconComponent: MenuIcon,
    isSilent: true,
  };

  const outsideEventProps = {
    onOutsideEvent: returnTrueElementOrUndefined(open, closeNavigation),
  };

  const navigationProps = {
    ...rest,
    cx: cx,
    controllingRef: buttonRef,
    id: "mobile-menu",
    isOpen: open,
    label: label,
    orientation: "vertical" as Orientation,
    skipName: skipName,
  };
  return (
    <OutsideEventListener {...outsideEventProps}>
      <Box cx="mobile-navigation">
        <Button {...buttonProps}>
          <Icon {...iconProps} />
        </Button>
        <Navigation {...navigationProps}>{children}</Navigation>
      </Box>
    </OutsideEventListener>
  );
}
