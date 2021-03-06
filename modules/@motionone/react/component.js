import { __rest } from "tslib";
import * as React from "react";
import { createElement, forwardRef, useContext, useEffect, useMemo, useRef, } from "react";
import { createMotionState, createStyles } from "@motionone/dom";
import { MotionContext } from "./context";
import { useEvents } from "./utils/events";
export function createMotionComponent(Component) {
    function Motion(_a, externalRef) {
        var { initial, animate, press, hover, inView, variants, style, transition, onMotionStart, onMotionComplete, onHoverStart, onHoverEnd, onPressStart, onPressEnd, onViewEnter, onViewLeave } = _a, props = __rest(_a, ["initial", "animate", "press", "hover", "inView", "variants", "style", "transition", "onMotionStart", "onMotionComplete", "onHoverStart", "onHoverEnd", "onPressStart", "onPressEnd", "onViewEnter", "onViewLeave"]);
        const options = {
            initial,
            animate,
            press,
            hover,
            inView,
            variants,
            transition,
        };
        const state = createMotionState(options, useContext(MotionContext));
        const initialStyle = useMemo(() => createStyles(state.getTarget()), []);
        const ref = externalRef || useRef(null);
        useEffect(() => state.mount(ref.current), []);
        useEffect(() => state.update(options));
        useEvents(ref, {
            onMotionStart,
            onMotionComplete,
            onHoverStart,
            onHoverEnd,
            onPressStart,
            onPressEnd,
            onViewEnter,
            onViewLeave,
        });
        const element = createElement(Component, Object.assign(Object.assign({}, props), { ref, style: Object.assign(Object.assign({}, style), initialStyle) }));
        return (React.createElement(MotionContext.Provider, { value: state }, element));
    }
    return forwardRef(Motion);
}
//# sourceMappingURL=component.js.map