import React from 'react'

const store = {
    1: '0',
    2: '0',
}

let prev = '0'

function WkNavItem({ columnToggle = '1' }) {
    return (
        <div
            style={{
                width: 44,
                height: 44,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(0,0,0,.2)',
                pointerEvents: 'all',
            }}
            onClick={() => {
                let item = columnToggle
                const el = document.documentElement
                let next = store[item] == '0' ? '1' : '0'
                el.style.setProperty(`--column-${item}-hidden`, next)
                store[item] = next
            }}
        >
            S
        </div>
    )
}

export default WkNavItem
