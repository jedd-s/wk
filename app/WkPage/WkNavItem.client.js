import React, { useRef } from 'react'

const store = {
    1: '0',
    2: '0',
}

let prev = '0'

function addEvent(node, type, handle, options) {
    node?.addEventListener(type, handle, options)
    return () => {
        node?.removeEventListener(type, handle, options)
    }
}
const useLayoutEffect = __SERVER__ ? React.useEffect : React.useLayoutEffect

function WkNavItem({ columnToggle = '1', children }) {
    const ref = useRef(null)

    useLayoutEffect(() => {
        if (!ref.current) return
        const remove = addEvent(ref.current, 'click', (event) => {
            event.preventDefault()
            if (columnToggle) {
                let item = columnToggle
                //   const el =
                let next = store[item] == '0' ? '1' : '0'
                document.documentElement.style.setProperty(
                    `--column-${item}-hidden`,
                    next,
                )
                store[item] = next
            }
        })
        return () => {
            remove()
        }
    })
    return (
        <div
            ref={ref}
            style={{
                minWidth: 44,
                maxWidth: 44,
                minHeight: 44,
                maxHeight: 44,
                cursor: 'pointer',
                flex: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                // alignSelf: 'stretch',
                backgroundColor: 'rgba(0,0,0,.2)',
                pointerEvents: 'all',
            }}
        >
            {children}
        </div>
    )
}

export default WkNavItem
