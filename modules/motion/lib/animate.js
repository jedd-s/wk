import { animate as animateDom, wrapAnimationWithControls, } from "@motionone/dom";
import { Animation } from "@motionone/animation";
export function animateProgress(target, options) {
    return wrapAnimationWithControls([
        () => {
            const animation = new Animation(target, [0, 1], options);
            animation.finished.catch(() => { });
            return animation;
        },
    ], options === null || options === void 0 ? void 0 : options.duration);
}
export function animate(target, keyframesOrOptions, options) {
    const animationFunction = typeof target === "function" ? animateProgress : animateDom;
    return animationFunction(target, keyframesOrOptions, options);
}
//# sourceMappingURL=animate.js.map