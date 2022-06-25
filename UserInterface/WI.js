const WI = {}
if (typeof window != 'undefined') {
    window.WI = WI
} else {
    // eslint-disable-next-line no-undef
    globalThis.WI = WI
}
export default WI
