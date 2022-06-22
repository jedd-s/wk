// import Color, {UIColor} from 'Color'

export const Color = {
    background: 'rgba(0,0,0,0)',
    separator: 'rgba(100,100,100,.4)',
}
export const SIZE = {
    MIN_WIDTH_SIDEBAR: 270,
    MIN_WIDTH_MASTER: 290,
    MIN_WIDTH_DETAIL: 300,
}
const cssProperties = {
    safeAreaTop: '--safe-area-top',
    safeAreaRight: '--safe-area-right',
    safeAreaBottom: '--safe-area-bottom',
    safeAreaLeft: '--safe-area-left',
    pixelRatio: '--dpr',
}
const fmt = {
    cssVar(value) {
        if (!value) return ''
        return `var(${value})`
    },
    cssVarFallback(value) {
        if (!value) return ''
        return ',' + value
    },
}

export const Constants = {
    cssReset: /** css */ `
* {
    
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;
    user-select: none !important;
    -webkit-user-select: none !important;
    -webkit-user-drag: none !important;
    -webkit-touch-callout: none !important;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0) !important;
    pointer-events: none;
    touch-action: none;
}

:root {
    color-scheme: only dark !important;
    color: rgba(200, 205, 220, 1);
    background: rgba(0, 0, 0, 0);
    background-color: rgba(0, 0, 0, 0);
    font-family: system-ui;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
   
}
html,
body {
    margin: 0px;
    padding: 0px;
    background-color: rgba(0, 0, 0, 0);
}
#__next {
    display: contents;
}

#__next {
    display: contents !important;
    
}

:root {
    --column-1-hidden: 0;
    --column-2-hidden: 0;
}
.ui-columns {
    --column-h: calc(100vh + 2px);
    --column-w: calc(100vw + 2px);
    --shift: 20vw;
    --unshift: 0vw;
    --active: 1;
    --totalshift: calc((var(--active) - 1) * var(--shift));
    --column-x-1: max(calc(var(--shift) * -1), calc((var(--column-w) * 0) - var(--totalshift)));
    --column-w-1: var(--column-w);
    --column-x-2: max(calc(var(--shift) * -1), calc((var(--column-w) * 1) - (var(--totalshift) * 5)));
    --column-w-2: var(--column-w);
    --column-x-3: max(calc(var(--shift) * -1), calc((var(--column-w) * 2) - (var(--totalshift) * 5)));
    --column-w-3: var(--column-w);
    --column-y-1:0px;
    --column-z-1:0px;
    --column-y-2:0px;
    --column-z-2:0px;
    --column-y-3:0px;
    --column-z-3:0px;
    --column-h-1: var(--column-h);
    --column-h-2: var(--column-h);
    --column-h-3: var(--column-h);
}

@media (min-width: calc(280px + 300px + 300px)) {
    .ui-columns {
        --column-x-1: calc((var(--column-w-1) * -1) * var(--column-1-hidden));
        --column-w-1: 280px;
        --column-x-2: max(0px, calc(var(--column-x-1) + var(--column-w-1)));
        --column-w-2: 300px;
        --column-x-3: max(0px, calc((var(--column-x-1) + var(--column-w-1)) + (min(var(--column-x-2), 0px) + var(--column-w-2))) + ((calc(var(--column-w-2) * -1) * var(--column-2-hidden))));
        --column-w-3: calc(var(--column-w) - var(--column-x-3));
    }
}



.column {

  height: var(--column-h-1);
  max-height: var(--column-h-1);
  width: var(--column-w-1);
  max-width: var(--column-w-1);
  transform: translate3d(var(--column-x-1), var(--column-y-1), var(--column-z-1));
  position: fixed;
  top: -1px;
  left: -1px;
  display: flex !important;
    flex-direction: column;
    align-items: stretch;
    --tint: 10,10,10;
    background-color: rgba(var(--tint),1);
    border-left: 0px solid rgba(var(--tint),0);
    border-top: 0px solid rgba(var(--tint),0);
    border-bottom:05px solid rgba(var(--tint),0);
    border-right: 0px solid rgba(var(--tint),0);
    box-sizing: border-box;
    transition: transform 650ms cubic-bezier(0.19, 1, 0.22, 1);
    transform-origin: 0% 100%;
}
.column:nth-of-type(1) {
    width: var(--column-w-1);
    max-width: var(--column-w-1);
    transform: translate3d(var(--column-x-1), var(--column-y-1), var(--column-z-1));
}
.column:nth-of-type(2) {
    width: var(--column-w-2);
    max-width: var(--column-w-2);
    transform: translate3d(var(--column-x-2), var(--column-y-2), var(--column-z-2));
}
.column:nth-of-type(3) {
    width: var(--column-w-3);
    max-width: var(--column-w-3);
    transform: translate3d(var(--column-x-3), var(--column-y-3), var(--column-z-3));
}

.column.navigation {
  --column-h: calc(env(safe-area-inset-top) + 60px);
  --column-h-1: calc(env(safe-area-inset-top) + 60px);
  --column-h-2: calc(env(safe-area-inset-top) + 60px);
  --column-h-3: calc(env(safe-area-inset-top) + 60px);
  z-index: 1000;
  background-color: rgba(0,0,200,0);
}
.column.bottomsheet {
  --y-detent: 0;
  z-index: 3000;
  --y-bottom: var(--column-h);
  --y-top: 10px;
  --column-y-1: calc(var(--y-bottom) - ((var(--column-h) * var(--y-detent)) - 0px));
  --column-y-2: calc(var(--y-bottom) - ((var(--column-h) * var(--y-detent)) - 0px));
  --column-y-3: calc(var(--y-bottom) - ((var(--column-h) * var(--y-detent)) - 0px));
  background-color: rgba(40,40,40,.8);
}
.column.bottomsheet::after {
  z-index: 2000;
  content: " ";
  --column-z-1: calc(1 * var(--y-detent));
  --column-z-2: calc(1 * var(--y-detent));
  --column-z-3: calc(1 * var(--y-detent));
  background-color: rgba(40,40,40,calc(.7 * var(--y-detent)));
  pointer-events:all;
  touch-action:none;
  position:fixed;
  top:0px;
  left:0px;
  width:100%;
  height:100%;
}
/* .column.bottomsheet > .scrollview {
  position:relative;
  top: calc(env(safe-area-inset-top) + 32px);
} */

.scrollview {
    overflow-x: hidden !important;
    overflow-y: auto !important;
    pointer-events: all;
    flex-direction: column;
    align-items: stretch;
    touch-action: pan-y;
}

.scrollview > * {
    pointer-events: none;
}
  
.column {
    /* contain: size; */
}

    `,

    isDev: process.env.NODE_ENV != 'production',
    canUseWindow: typeof window != 'undefined',
    canUseDocument: typeof document != 'undefined',
    enableResponderSystem: false,
    enableScrollLock: false,
    enableFastClick: false,
    viewportMeta:
        'width=device-width,initial-scale=1,maximum-scale=1,user-scalable=0,viewport-fit=cover',
    enableCSSReset: true,
    enableCSSFixedRoot: false,
    cssProperties,
    props: {
        html: {
            // lang: 'en',
            // 'data-pointerevents': 'box-only',
            'data-pointerevents': 'box-only',
            'data-touchaction': 'none',
            'data-scrollbar': 'none',
            // 'data-overflow': 'clip',
            style: {
                // '--resizing': '0',
                // '--hydrated': '1',
                // '--topoffset': '-44px',
                // '--topinset': 'calc((var(--topoffset) * -1) - 0.51px)',
                // '--htmlheight': 'calc(100vh + var(--topinset))',
                // position: 'fixed',
                // display: 'block',
                // contain: 'layout',
                // overflow: 'hidden',
                // height: 'var(--htmlheight)',
                // minHeight: 'var(--htmlheight)',
                // top: 'var(--topoffset)',
                // left: '0px',
                // minWidth: '100vw',
                // width: '100vw',
                // transition: 'opacity 750ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                // opacity: 'var(--hydrated)',
                // maxWidth: 'none !important',
                // maxHeight: 'none !important',
                // zIndex: '2147483647 !important',

                /* */
                '--resizing': ' 0',
                '--hydrated': ' 1',
                '--topoffset': ' -44px',
                '--topinset': ' calc((var(--topoffset) * -1) - .51px)',
                '--htmlheight': ' calc(100vh + var(--topinset))',
                position: 'relative',
                display: 'block',
                overflow: 'hidden',
                height: 'var(--htmlheight)',
                minHeight: 'var(--htmlheight)',
                top: 'var(--topoffset)',
                left: '0px',
                minWidth: '100vw',
                width: '100vw',
                maxWidth: 'none !important',
                transition: 'opacity 750ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                opacity: 'var(--hydrated)',
                maxHeight: 'none !important',
                zIndex: '2147483647 !important',
                /* */
                // '--topoffset': '0px',
                // contain: 'size',

                // display: 'contents !important',
                // fontWeight: '300',
            },
        },
        body: {
            'data-pointerevents': 'none',
            // 'data-pointerevents': 'box-only',
            // 'data-touchaction': 'none',
            style: {
                // visibility: 'hidden',
                // height: '100vh',
                display: 'contents !important',
            },
        },
    },
    styles: {
        fixed: {
            display: 'flex',
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
        },
        flex: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
        },
        composite: {
            transform: `translateZ(0px)`,
        },
    },
    /**
     *
     * @template T
     * @param {cssProperties[T]} varName
     * @param {boolean} fallback
     * @returns string
     */
    cssVar(varName, fallback) {
        return fmt.cssVar(cssProperties[varName] + fmt.cssVarFallback(fallback))
    },
}
