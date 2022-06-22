import WkApp from '../app/WkApp/WkApp.server'

if (typeof window != 'undefined') {
    window._cols = {
        roots: document.querySelectorAll('.ui-columns'),
        navs: document.querySelectorAll('.column.navigation'),
        contents: document.querySelectorAll('.column.content'),
        bottomsheets: document.querySelectorAll('.column.bottomsheet'),
    }
}
export default WkApp
