"use client";

import React, { type  JSX, RefObject, useCallback, useEffect, useRef } from "react";
import { Button as RacButton, type PressEvent } from "react-aria-components";

import { mergeRefs, returnTrueElementOrUndefined, safeEventHandlerCall } from "@/source/utilities";

import { ButtonProps } from "./";

import "./button.css";

export default function Button({
  children,
  cx,
  isDisabled,
  onPress,
  ref,
  testId,
  ...rest
}: ButtonProps): JSX.Element {
  const buttonRef: RefObject<HTMLButtonElement | null> =
    useRef<HTMLButtonElement>(null);

  const handlePress = useCallback((e: PressEvent): void  => {
    /* istanbul ignore else */
    if (!isDisabled){
      safeEventHandlerCall(onPress, e)
    }
  },[isDisabled, onPress]);

  const combinedRef = mergeRefs(ref, buttonRef);

  useEffect(() => {
    if (isDisabled) {
      buttonRef.current?.setAttribute("aria-disabled", "true");
    } else {
      buttonRef.current?.removeAttribute("aria-disabled");
    }
  }, [buttonRef, isDisabled, ref]);

  return (
    <RacButton
      {...rest}
      className={cx}
      data-testid={returnTrueElementOrUndefined(!!testId, testId)}
      isDisabled={isDisabled}
      onPress={handlePress}
      ref={combinedRef}
    >
      {children}
    </RacButton>
  );
}
