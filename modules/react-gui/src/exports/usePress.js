/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type { CallbackRef } from '#types/react';
import type { TouchActionValue } from '#types/styles';

import {
  addEventListener,
  getInputModality,
  removeEventListener
} from '#exports/core';
import { checkTargetContainsSelection } from '#internals/checkTargetContainsSelection';
import { useCallback, useRef } from 'react';
import { useKeyboard } from '#exports/useKeyboard';
import { useMergeRefs } from '#exports/useMergeRefs';
import { useElementCallback } from '#exports/useElementCallback';
import { useResponder } from '#exports/useResponder';

export type PressProps = $ReadOnly<{|
  delayLongPress?: ?number,
  disabled?: ?boolean,
  onLongPress?: ?(e: any) => void,
  onPress?: ?(e: any) => void,
  onPressCancel?: ?(e: any) => void,
  onPressChange?: ?(isPressed: boolean) => void,
  onPressEnd?: (e: any) => void,
  onPressStart?: (e: any) => void,
  touchAction?: TouchActionValue
|}>;

export type PressState = {
  active: boolean,
  initialX: ?number,
  initialY: ?number,
  isLongPress: boolean,
  longPressTimeout: ?TimeoutID
};

const emptyObject = {};
const MOVE_THRESHOLD_PX = 10;
const DEFAULT_LONG_PRESS_DELAY_MS = 500;
const captureOptions = { capture: true };

function getTouchFromResponderEvent(event: any) {
  const { changedTouches, touches } = event.nativeEvent;
  if (touches != null && touches.length > 0) {
    return touches[0];
  }
  if (changedTouches != null && changedTouches.length > 0) {
    return changedTouches[0];
  }
  return event.nativeEvent;
}

function isKeyActivator(key) {
  return key === 'Enter' || isKeySpacebar(key);
}

function isKeySpacebar(key) {
  return key === ' ' || key === 'Spacebar';
}

function isTargetDisabled(target: any) {
  return target.disabled || target.getAttribute('aria-disabled') === 'true';
}

function isTargetNativelyInteractive(target) {
  const { href, tagName } = target;
  return (
    (tagName === 'A' && href != null) ||
    tagName === 'BUTTON' ||
    tagName === 'INPUT' ||
    tagName === 'SELECT' ||
    tagName === 'TEXTAREA'
  );
}

function shouldSpacebarActivate(event) {
  const { currentTarget } = event;
  const role = (currentTarget: any).getAttribute('role');
  const spacebarActivates =
    role === 'button' ||
    role === 'checkbox' ||
    role === 'menuitem' ||
    role === 'menuitemcheckbox' ||
    role === 'menuitemradio' ||
    role === 'radio' ||
    role === 'switch';
  return spacebarActivates;
}

function useClick(listener) {
  const elementCallback = useCallback(
    (node) => {
      addEventListener(node, 'click', listener);
      return () => removeEventListener(node, 'click', listener);
    },
    [listener]
  );
  return useElementCallback(elementCallback);
}

function useContextMenu(listener) {
  const elementCallback = useCallback(
    (node) => {
      addEventListener(node, 'contextmenu', listener);
      return () => removeEventListener(node, 'contextmenu', listener);
    },
    [listener]
  );
  return useElementCallback(elementCallback);
}

export function usePress(props: PressProps): CallbackRef {
  const {
    delayLongPress,
    disabled,
    onLongPress,
    onPress,
    onPressCancel,
    onPressChange,
    onPressEnd,
    onPressStart,
    touchAction
  } = props || emptyObject;

  const longPressDelay = delayLongPress || DEFAULT_LONG_PRESS_DELAY_MS;

  const stateRef = useRef<PressState>({
    active: false,
    initialX: null,
    initialY: null,
    isLongPress: false,
    longPressTimeout: null
  });

  const clickRef = useClick((e) => {
    const state = stateRef.current;
    const target = e.currentTarget;
    if (isTargetDisabled(target)) {
      e.stopPropagation();
    } else if (!disabled) {
      e.stopPropagation();
      const deltaX = state.initialX != null ? state.initialX - e.pageX : 0;
      const deltaY = state.initialY != null ? state.initialY - e.pageY : 0;
      // The browser will select text beneath a pointer when it performs a rapid double-tap.
      // We only want to cancel press if the user moves the pointer to select text.
      const hasSelection = checkTargetContainsSelection(target);
      const didSelectText =
        Math.hypot(deltaX, deltaY) > MOVE_THRESHOLD_PX && hasSelection;
      // Click triggers onPress if there is no active longpress, and no text
      // selection occured during the press. Otherwise, it is cancelled.
      if (state.isLongPress || didSelectText) {
        e.preventDefault();
      } else if (onPress != null && e.altKey === false) {
        onPress(e);
      }
    }
  });

  const contextMenuRef = useContextMenu((e) => {
    const target = e.currentTarget;
    if (
      isTargetDisabled(target) ||
      (!disabled && onLongPress != null && getInputModality() === 'touch')
    ) {
      // Context menu is cancelled for touch pointers if onLongPress is defined.
      // Context menu is cancelled if the element or hook is disabled
      e.stopPropagation();
      e.preventDefault();
    }
  });

  /**
   * Pointers
   */

  const responderRef = useResponder({
    onStartShouldSetResponder(e) {
      const target = e.currentTarget;
      return !disabled && !isTargetDisabled(target);
    },
    onResponderGrant(e) {
      const state = stateRef.current;
      const touch = getTouchFromResponderEvent(e);
      state.active = true;
      state.isLongPress = false;
      state.initialX = touch.pageX;
      state.initialY = touch.pageY;
      if (onPressStart != null) {
        onPressStart(e);
      }
      if (onPressChange != null) {
        onPressChange(true);
      }
      if (onLongPress != null) {
        state.longPressTimeout = setTimeout(() => {
          if (state.active === true) {
            state.isLongPress = true;
            onLongPress();
          }
        }, longPressDelay);
      }
    },
    onResponderMove(e) {
      const state = stateRef.current;
      const touch = getTouchFromResponderEvent(e);
      const deltaX = state.initialX != null ? state.initialX - touch.pageX : 0;
      const deltaY = state.initialY != null ? state.initialY - touch.pageY : 0;
      // If the pointer moves more than the threshold, cancel longpress
      if (
        onLongPress != null &&
        Math.hypot(deltaX, deltaY) > MOVE_THRESHOLD_PX
      ) {
        clearTimeout(state.longPressTimeout);
        state.longPressTimeout = null;
      }
    },
    onResponderRelease(e) {
      const state = stateRef.current;
      if (onPressChange != null) {
        onPressChange(false);
      }
      if (onPressEnd != null) {
        onPressEnd(e);
      }
      clearTimeout(state.longPressTimeout);
      state.active = false;
      state.longPressTimeout = null;
    },
    onResponderTerminate(e) {
      const state = stateRef.current;
      if (onPressChange != null) {
        onPressChange(false);
      }
      if (onPressCancel != null) {
        onPressCancel(e);
      }
      clearTimeout(state.longPressTimeout);
      state.active = false;
      state.isLongPress = false;
      state.longPressTimeout = null;
    },
    onResponderTerminationRequest(e) {
      if (
        onLongPress != null &&
        (e.nativeEvent: any).type === 'contextmenu' &&
        getInputModality() === 'touch'
      ) {
        return false;
      }
      return true;
    },
    touchAction
  });

  /**
   * Keyboard
   */

  const keyboardRef = useKeyboard({
    disabled,
    onKeyDown(e) {
      const { key, target } = e;
      const state = stateRef.current;
      if (isTargetDisabled(e.currentTarget) && !isKeySpacebar(key)) {
        e.stopPropagation();
      } else if (isKeyActivator(key)) {
        // Stop the spacebar potentially scrolling the window
        if (isKeySpacebar(key)) {
          if (shouldSpacebarActivate(e)) {
            e.preventDefault();
          } else {
            return;
          }
        }
        e.stopPropagation();
        if (state.active !== true) {
          if (onPressStart != null) {
            onPressStart(e);
          }
          if (onPressChange != null) {
            onPressChange(true);
          }
          state.active = true;

          // The 'keyup' listener is attached to the document to account for situations where
          // focus is moved during 'keydown', resulting in 'keyup' not occuring on the target.
          // In that case, we want to clear the pressed state on 'keyup' without triggering 'onPress'.
          // Use the capture phase on the off-chance that the 'keyup' target prevents propagation.
          const listener = (e) => {
            const { key } = e;
            if (target != null && state.active && isKeyActivator(key)) {
              if (onPressChange != null) {
                onPressChange(false);
              }
              if (onPressEnd != null) {
                onPressEnd(e);
              }
              if (e.target === target) {
                // Only stop propagation if the key is being handled by the original target
                e.stopPropagation();
                if (onPress != null && !isTargetNativelyInteractive(e.target)) {
                  onPress(e);
                }
              }
              state.active = false;
            }
            removeEventListener(document, 'keyup', listener, captureOptions);
          };

          addEventListener(document, 'keyup', listener, captureOptions);
        }
      }
    }
  });

  return useMergeRefs(responderRef, clickRef, contextMenuRef, keyboardRef);
}
