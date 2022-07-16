import React from 'react'

// console.log()
// const AppContext =
//     typeof window != 'undefined'
//         ? React.createContext(null)
//         : React.createServerContext(null)

// React.Serv
import { RouterContext } from 'next/dist/shared/lib/router-context'

export const useApp = () => React.useContext(RouterContext)

export function AppProvider({ value, children }) {
    return children
    // return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
