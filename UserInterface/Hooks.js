import React from 'react'

const isWindow = typeof window != 'undefined'

const useLayoutEffect = isWindow ? React.useLayoutEffect : React.useEffect
const useInsertionEffect = isWindow ? React.useInsertionEffect : React.useEffect

export { useLayoutEffect, useInsertionEffect }
