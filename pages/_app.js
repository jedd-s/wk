// import 'runtime/01_a'

// import ScrollBehvior from 'resources/02_scroll-behavior'
import WkApp from '../app/WkApp/WkApp.server'

// function WkApp({ Component, pageProps, router }) {
//     return <Component {...pageProps} router={router} />
// }

if (__CLIENT__) {
    window.ui = {
        uicolumns: document.querySelectorAll('.ui-columns'),
        columns: document.querySelectorAll('.column'),
        navigations: document.querySelectorAll('.column.navigation'),
        contents: document.querySelectorAll('.column.content'),
        bottomsheets: document.querySelectorAll('.column.bottomsheet'),
    }

    let scrollElements = document.querySelectorAll('.scrollview')

    // function handle() {
    //     // ScrollBehvior.observeScrolling(
    //     // scrollElements
    //     //     function handleScrolling(a, b) {
    //     //         console.log('Scrolled', [a, b])
    //     //     },
    //     // )
    //     ScrollBehvior.waitForScrollEnd(scrollElements).then((ended) => {
    //         console.log('ScrollEnded', ended)
    //     })
    // }

    // scrollElements.forEach((element) => {
    //     element.addEventListener('scroll', handle, { once: true })
    // })
}

export default WkApp
