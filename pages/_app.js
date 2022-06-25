// import 'runtime/01_a'

import WkApp from '../app/WkApp/WkApp.server'

// import Color from 'UserInterface/Models/Color'

// function test
// const blue = new Color(Color.Format.RGBA, [0, 0, 255, 1], Color.Gamut.SRGB)
// console.log({ blue, x: blue._toHEXAlphaString() })

// console.log({ __SERVER__: __SERVER__, __CLIENT__: __CLIENT__ })

// function App(props) {
//     return <WkApp {...props} />
// }

if (__CLIENT__) {
    window.ui = {
        uicolumns: document.querySelectorAll('.ui-columns'),
        columns: document.querySelectorAll('.column'),
        navigations: document.querySelectorAll('.column.navigation'),
        contents: document.querySelectorAll('.column.content'),
        bottomsheets: document.querySelectorAll('.column.bottomsheet'),
    }
}

export default WkApp
