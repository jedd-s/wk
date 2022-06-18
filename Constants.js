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
  cssReset: `
  * {
    margin:0px;
    padding:0px;
    box-sizing:border-box;
  }
  :root {
    color-scheme: only dark !important;
    color:rgba(200,205,220,1);
    background: rgba(0,0,0,0);
    background-color: rgba(0,0,0,0);
    font-family:system-ui;
    -webkit-font-smoothing:antialiased;
    text-rendering:optimizeLegibility;
  }
  html,body {
    margin:0px;
    padding:0px;
      background-color: rgba(0,0,0,0);
  }
  #__next {
    display:contents;
  }
  
  #__next {
    display:flex !important;
    --content-h: calc(100vh + 1px);
    --content-w: calc(100vw + 1px);
    height: var(--content-h);
    max-height: var(--content-h);
    width: var(--content-w);
    max-width: var(--content-w);
    position:fixed;
    top: -.5px;
    left: -.5px;
    overflow-x:hidden !important;
    overflow-y:auto !important;
    flex-direction:column;
    align-items:stretch;
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
        '--resizing': '0',
        '--hydrated': '1',
        // '--timing': '0ms',
        // '--ease': `cubic-bezier(0.42, 0.43, 0.32, 0.98)`,
        // '--innerh': '0px',
        // '--innerw': '0px',
        // '--h': '0px',
        // '--w': '0px',
        // '--insettop': '0px',
        // '--insetleft': '16px',
        // '--insetright': '16px',
        // '--col-width-1': `${SIZE.MIN_WIDTH_SIDEBAR}px`,
        // '--col-width-2': `${SIZE.MIN_WIDTH_MASTER}px`,
        // '--col-width-3': `calc(100vw  - var(--col-left-3))`,

        // // '--col-left-1': `0vw`,
        // // '--col-left-2': 'calc(var(--col-left-1) + var(--col-width-1))',
        // // '--col-left-3':
        // //     'max(calc(var(--col-left-2) + var(--col-width-2)),calc(var(--col-left-1) + var(--col-width-1)))',
        // '--col-left-1': `0vw`,
        // '--col-left-2': 'calc(var(--col-left-1) + var(--col-width-1))',
        // '--col-left-3':
        //   'max(calc(var(--col-left-2) + var(--col-width-2)),calc(var(--col-left-1) + var(--col-width-1)))',
        // // '--col-left-1': `0vw`,
        // // '--col-left-2': '0vw',
        // // '--col-left-3': '0vw',
        // '--col-border': `0.5px solid ${Color.separator}`,
        // '--transform': `translate3d(0vw,0px,0px)`,
        // '--col-x-1': `calc(-0vw)`,
        // '--col-x-2': `calc(-0vw)`,
        // '--col-x-3': `calc(-0vw)`,
        // '--transition': `left var(--timing) var(--ease),transform var(--timing) var(--ease)`,
        // '--sidebar-z': `2`,
        position: 'relative',
        display: 'block',
        overflow: 'hidden',
        height: '100vh',
        minHeight: '100vh',
        top: '0px',
        left: '0px',
        minWidth: '100vw',
        width: '100vw',
        maxWidth: 'none !important',
        transition: 'opacity 750ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        opacity: 'var(--hydrated)',
        maxHeight: 'none !important',
        zIndex: '2147483647 !important',
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
