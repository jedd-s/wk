import { isEasingGenerator, isEasingList, defaults } from "@motionone/utils";
import { getEasingFunction } from "./utils/easing";
import { interpolate as createInterpolate } from "./utils/interpolate";
export class Animation {
    constructor(output, keyframes = [0, 1], { easing = defaults.easing, duration = defaults.duration, delay = defaults.delay, endDelay = defaults.endDelay, repeat = defaults.repeat, offset, direction = "normal", } = {}) {
        this.startTime = null;
        this.rate = 1;
        this.t = 0;
        this.cancelTimestamp = null;
        this.playState = "idle";
        this.finished = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
        if (isEasingGenerator(easing)) {
            const custom = easing.createAnimation(keyframes, () => "0", true);
            easing = custom.easing;
            if (custom.keyframes !== undefined)
                keyframes = custom.keyframes;
            if (custom.duration !== undefined)
                duration = custom.duration;
        }
        const totalDuration = duration * (repeat + 1);
        const interpolate = createInterpolate(keyframes, offset, isEasingList(easing)
            ? easing.map(getEasingFunction)
            : getEasingFunction(easing));
        this.tick = (timestamp) => {
            var _a;
            // TODO: Temporary fix for OptionsResolver typing
            delay = delay;
            if (this.pauseTime)
                timestamp = this.pauseTime;
            let t = (timestamp - this.startTime) * this.rate;
            this.t = t;
            // Convert to seconds
            t /= 1000;
            // Rebase on delay
            t = Math.max(t - delay, 0);
            /**
             * If this animation has finished, set the current time
             * to the total duration.
             */
            if (this.playState === "finished")
                t = totalDuration;
            /**
             * Get the current progress (0-1) of the animation. If t is >
             * than duration we'll get values like 2.5 (midway through the
             * third iteration)
             */
            const progress = t / duration;
            // TODO progress += iterationStart
            /**
             * Get the current iteration (0 indexed). For instance the floor of
             * 2.5 is 2.
             */
            let currentIteration = Math.floor(progress);
            /**
             * Get the current progress of the iteration by taking the remainder
             * so 2.5 is 0.5 through iteration 2
             */
            let iterationProgress = progress % 1.0;
            if (!iterationProgress && progress >= 1) {
                iterationProgress = 1;
            }
            /**
             * If iteration progress is 1 we count that as the end
             * of the previous iteration.
             */
            iterationProgress === 1 && currentIteration--;
            /**
             * Reverse progress if we're not running in "normal" direction
             */
            const iterationIsOdd = currentIteration % 2;
            if (direction === "reverse" ||
                (direction === "alternate" && iterationIsOdd) ||
                (direction === "alternate-reverse" && !iterationIsOdd)) {
                iterationProgress = 1 - iterationProgress;
            }
            const latest = interpolate(t >= totalDuration ? 1 : Math.min(iterationProgress, 1));
            output(latest);
            const isAnimationFinished = this.playState === "finished" || t >= totalDuration + endDelay;
            if (isAnimationFinished) {
                this.playState = "finished";
                (_a = this.resolve) === null || _a === void 0 ? void 0 : _a.call(this, latest);
            }
            else if (this.playState !== "idle") {
                this.frameRequestId = requestAnimationFrame(this.tick);
            }
        };
        this.play();
    }
    play() {
        var _a;
        const now = performance.now();
        this.playState = "running";
        if (this.pauseTime) {
            this.startTime = now - (this.pauseTime - ((_a = this.startTime) !== null && _a !== void 0 ? _a : 0));
        }
        else if (!this.startTime) {
            this.startTime = now;
        }
        this.cancelTimestamp = this.startTime;
        this.pauseTime = undefined;
        requestAnimationFrame(this.tick);
    }
    pause() {
        this.playState = "paused";
        this.pauseTime = performance.now();
    }
    finish() {
        this.playState = "finished";
        this.tick(0);
    }
    stop() {
        var _a;
        this.playState = "idle";
        if (this.frameRequestId !== undefined) {
            cancelAnimationFrame(this.frameRequestId);
        }
        (_a = this.reject) === null || _a === void 0 ? void 0 : _a.call(this, false);
    }
    cancel() {
        this.stop();
        this.tick(this.cancelTimestamp);
    }
    reverse() {
        this.rate *= -1;
    }
    commitStyles() { }
    get currentTime() {
        return this.t;
    }
    set currentTime(t) {
        if (this.pauseTime || this.rate === 0) {
            this.pauseTime = t;
        }
        else {
            this.startTime = performance.now() - t / this.rate;
        }
    }
    get playbackRate() {
        return this.rate;
    }
    set playbackRate(rate) {
        this.rate = rate;
    }
}
//# sourceMappingURL=Animation.js.map