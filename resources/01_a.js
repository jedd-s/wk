/* eslint-disable no-undef */
;((window) => {
    window._rootView = {
        fetch: window.fetch,
        // WindowPrototype: window.__proto__,
    }

    console.log(window._rootView)
})(typeof window != 'undefined' ? window : globalThis)
