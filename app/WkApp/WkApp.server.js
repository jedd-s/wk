import { Suspense } from 'react'
import WkDevTool from './WkDevTool.client'

function WkApp(props) {
  const { Component, pageProps, router } = props

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Component {...pageProps} router={router} />
      </Suspense>
      <WkDevTool />
    </>
  )
}

if (typeof window != 'undefined') {
} else {
  WkApp.getInitialProps = async (...args) => {
    return {}
  }
}

export default WkApp
