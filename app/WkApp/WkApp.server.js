import { Suspense } from 'react'
// import { AppProvider } from './context'
import WkDevTool from './WkDevTool.client'

function WkApp(props) {
    const { Component, pageProps, router } = props
    // console.log(router)
    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <Component {...pageProps} router={router} />
            </Suspense>
            {/* <WkDevTool /> */}
        </>
    )
}

if (__SERVER__) {
    WkApp.getInitialProps = async (args) => {
        // console.log(args)

        return {}
    }
}

export default WkApp
