// import {UIColor} from 'Color'
// import RootStyleSheet from 'components/RootStyleSheet'
// import {Constants} from 'Constants'
// import {portals} from 'lib/portals'
// import {app} from 'lib/ssr-window'
import { Head, Html, Main, NextScript } from 'next/document'
import React from 'react'
import { R } from 'UserInterface/Rules'
import { Constants } from '../UserInterface/Constants'

function DocumentHead() {
    return (
        <Head>
            <link rel="manifest" href="/manifest.json" />
            <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
            {/* <link
        rel='preload'
        href='/fonts/sfsymbols3.woff2'
        as='font'
        type='font/woff2'
        crossOrigin='anonymous'
      /> */}
            {/* <meta name="theme-color" content={'rgb(8,8,8)'} /> */}

            <meta name="applicable-device" content="pc,mobile" />
            <meta name="mobile-web-app-capable" content="yes" />
            <meta name="apple-touch-fullscreen" content="yes" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-title" content="Movies" />
            {/* <meta name="apple-mobile-web-app-status-bar-style" content="" /> */}
            <meta
                name="apple-mobile-web-app-status-bar-style"
                content="black-translucent"
            />

            <link
                rel="icon"
                type="image/png"
                sizes="48x48"
                href="/pwa/favicon-48x48.png"
            />
            <link
                rel="mask-icon"
                color="#000000"
                href="/pwa/safari-pinned-tab.svg"
            />
            <link
                rel="apple-touch-icon"
                sizes="180x180"
                href="/pwa/apple-touch-icon.png"
            />
            <link
                href="/pwa/apple-splash-1125x2436.png"
                media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)"
                rel="apple-touch-startup-image"
            />
            <link
                href="/pwa/apple-splash-750x1334.png"
                media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)"
                rel="apple-touch-startup-image"
            />
            <link
                href="/pwa/apple-splash-1242x2208.png"
                media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3)"
                rel="apple-touch-startup-image"
            />
            <link
                href="/pwa/apple-splash-1242x2688.png"
                media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)"
                rel="apple-touch-startup-image"
            />
            <link
                href="/pwa/apple-splash-640x1136.png"
                media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)"
                rel="apple-touch-startup-image"
            />
            <link
                href="/pwa/apple-splash-1536x2048.png"
                media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)"
                rel="apple-touch-startup-image"
            />
            <link
                href="/pwa/apple-splash-1668x2226.png"
                media="(device-width: 834px) and (device-height: 1113px) and (-webkit-device-pixel-ratio: 2)"
                rel="apple-touch-startup-image"
            />
            <link
                href="/pwa/apple-splash-2048x2732.png"
                media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)"
                rel="apple-touch-startup-image"
            />
            <style
                id={'root-sheet'}
                dangerouslySetInnerHTML={{
                    __html: Constants.cssReset,
                }}
            ></style>
        </Head>
    )
}

const elements = ['react-modal']

const script = (
    <script
        // defer
        //async
        // let h = document.createElement('html')
        // let b = document.createElement('body')
        // h.append(b)
        dangerouslySetInnerHTML={{
            __html: `
                

let enabled

function isEnabled() {
    if (enabled === undefined) {
        if (typeof window != 'undefined') {
            let elem = document.createElement('div')
            elem.style.setProperty('width', '4.5px')
            document.body.appendChild(elem)
            let bounds = elem.getBoundingClientRect()
            enabled = bounds.width != Math.floor(bounds.width)
            document.body.removeChild(elem)
        }
    }
    return enabled
}

function layoutUnit(f) {
    return isEnabled() ? Math.floor(f * 64) / 64 : Math.floor(f) // as in LayoutUnit(f).toFloat()
}

function ceiledLayoutUnit(f) {
    return isEnabled() ? Math.ceil(f * 64) / 64 : Math.ceil(f) // see ceiledLayoutUnit(), LayoutUnit.h
}




                let hasVisualViewport = typeof window?.visualViewport != 'undefined';
                let rootView = document.documentElement
                let reactViewport = document.getElementById('react-viewport');
          
                

                rootView?.style.setProperty('--dpx', layoutUnit(.35) + 'px');

                    async function updateProperties() {
                        
                        let h = document.documentElement.clientHeight;
                        let innerh = hasVisualViewport ? visualViewport.height : window.innerHeight;
                        let w = document.documentElement.clientWidth;
                        let innerw = hasVisualViewport ? visualViewport.width : window.innerWidth;


                        if (reactViewport == null) {
                            reactViewport = document.getElementById('react-viewport');
                        }

                        rootView?.style.setProperty('--h', h + 'px');
                        rootView?.style.setProperty('--innerh', innerh + 'px');
                        rootView?.style.setProperty('--w', w + 'px');
                        rootView?.style.setProperty('--innerw', innerw + 'px');
                        reactViewport?.setAttribute('width', innerw)
                        reactViewport?.setAttribute('height', innerh)

                    }
                    let updateTimeoutID


                    function debouncedUpdateProperties() {
                        /* clearTimeout(updateTimeoutID)
                        updateTimeoutID = setTimeout(updateProperties, 166) 
                        cancelAnimationFrame(updateTimeoutID)
                        updateTimeoutID = requestAnimationFrame(updateProperties)
                        */
                       updateProperties()
                    }

                    updateProperties()

                    if (typeof hasVisualViewport != 'undefined') {
                        window.visualViewport.addEventListener('resize', updateProperties, true);
                    } else {
                        window.addEventListener('resize', updateProperties, true);
                    }


                    let timeoutID;
                    window.addEventListener('orientationchange', e => {
                        clearTimeout(timeoutID)
                        timeoutID = setTimeout(updateProperties, 250);
                    }, false);
                    
                    `,
        }}
    ></script>
)

// const Body = (props) => jsx('body', props)

const Content = () => {
    return (
        <body {...Constants.props.body}>
            <meta name="viewport" content={Constants.viewportMeta} />
            <canvas id="react-viewport" style={{ display: 'none' }}></canvas>
            <react-modal
                id="react-modal"
                data-pointerevents="none"
            ></react-modal>
            <react-widget
                id="react-widget"
                data-pointerevents="none"
            ></react-widget>
            <Main />
            <gui-devtools id="devtools" />
            {/* {script} */}
            <NextScript />
            <noscript>{`This page requires you to have the Javascript enabled.`}</noscript>
        </body>
    )
}

export default function Document() {
    // <UiMain>
    // </UiMain>

    // console.log('Document', appState)
    // const p = portals.get('react-modal') || null

    // const Nex
    const result = (
        <Html
            {...Constants.props.html}
            className={`${R.PointerEventsNone} ${R.TouchNone} ${R.ScrollbarNone}`}
        >
            <DocumentHead />
            <Content />
        </Html>
    )

    return result
}
/* 
<html style="min-height: 150vh; font-family: system-ui; min-width: 100vw; margin: 0px; padding: 0px; touch-action: none; background: transparent; pointer-events: none; overflow: hidden; color-scheme: only dark; color: red; position: relative;">
<body style="height: 100%; margin: 0px; padding: 0px; background: transparent;">
<html style="min-height: 150vh; font-family: system-ui; min-width: 100vw; margin: 0px; padding: 0px; touch-action: none; background: transparent; pointer-events: none; overflow: hidden; color-scheme: only dark; color: red; position: relative;"><head>

<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=0,viewport-fit=cover"><meta name="theme-color" content="rgba(8,8,8,1)">




<style type="text/css">section {
padding: 4px;
}
p {
margin: 0px 0px 20px 0px;
}

* {box-sizing:border-box}

</style><style type="text/css"></style></head><body style="height: 100%; margin: 0px; padding: 0px; background: transparent;">







<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=0,viewport-fit=cover"><meta name="theme-color" content="rgba(8,8,8,1)">




<style type="text/css">
section {
padding: 4px;
}
p {
margin: 0px 0px 20px 0px;
}
</style><style type="text/css"></style>
<section style=" margin: 0px; position: fixed; top: 0; left: 0; min-width: 100vw; touch-action: pan-y; pointer-events: auto !important; overflow-y: scroll; left: 0; padding: 4px 20px; height: max(100%, 100vh);"><div><h1>Title Here</h1></div>
<div><p>
A paragraph is block of text with words. A paragraph is block of text with words. A paragraph is block of text with words. A paragraph is block of text with words.
</p></div><div><p>
A paragraph is block of text with words. A paragraph is block of text with words. A paragraph is block of text with words. A paragraph is block of text with words.
</p></div>
<div><p>
A paragraph is block of text with words. A paragraph is block of text with words. A paragraph is block of text with words. A paragraph is block of text with words.
</p></div>
<div><p>
A paragraph is block of text with words. A paragraph is block of text with words. A paragraph is block of text with words. A paragraph is block of text with words.
</p></div>
<div><p>
A paragraph is block of text with words. A paragraph is block of text with words. A paragraph is block of text with words. A paragraph is block of text with words.
</p></div>
<div><p>
A paragraph is block of text with words. A paragraph is block of text with words. A paragraph is block of text with words. A paragraph is block of text with words.
</p></div>
<div><p>
A paragraph is block of text with words. A paragraph is block of text with words. A paragraph is block of text with words. A paragraph is block of text with words.
</p></div>
<div><p>
A paragraph is block of text with words. A paragraph is block of text with words. A paragraph is block of text with words. A paragraph is block of text with words.
</p></div>

</section><meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=0,viewport-fit=cover"></body></html>
</body>
</html>
*/
