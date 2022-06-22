import { CurvedArrow, rounded, RoundedExample } from 'app/WTF/Curve'
import { enterFullscreen } from 'app/WTF/EnterFullscreen'
import React, { useEffect, useRef } from 'react'

// import { hash } from 'app/WTF/hash'

const style = JSON.stringify({ position: 'absolute' })
const style2 = JSON.stringify({ position: 'absolute', top: 0, left: 0 })

const useLayoutEffect =
    typeof window != 'undefined' ? React.useLayoutEffect : React.useEffect

function Button({ onPress, children }) {
    const ref = useRef(null)
    useLayoutEffect(() => {
        const target = ref.current
        const handle = (e) => {
            e.preventDefault()
            if (onPress) onPress(e)
        }
        if (typeof window != 'undefined') {
            target.addEventListener('click', handle)
        }
        return () => {
            target.removeEventListener('click', handle)
        }
    })

    return (
        <div
            ref={ref}
            style={{
                pointerEvents: 'auto',

                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                overflow: 'hidden',
                touchAction: 'inherit',
                height: '44px',
                maxHeight: '44px',
                // transform: 'translate3d(0px,0px,0px)',
            }}
        >
            <div
                style={{
                    borderRadius: 10,
                    backgroundColor: `rgba(0, 97, 194,.8)`,
                    position: 'absolute',
                    zIndex: -1,
                    top: 0,
                    left: 0,
                    width: '100%',
                    pointerEvents: 'none',
                    height: '100%',
                }}
            ></div>
            <div
                style={{
                    paddingLeft: 18,
                    paddingRight: 18,
                    pointerEvents: 'none',
                    fontSize: 15,
                    // lineHeight: 0,
                    lineHeight: '0px',
                    zIndex: 1,
                    color: 'rgba(255,255,255,1)',
                }}
            >
                {children}
            </div>
        </div>
    )
}

export default function WkSettings(props) {
    return (
        <>
            <div
                style={{
                    zIndex: -1,
                    display: 'flex',
                    flex: 1,
                    alignItems: 'stretch',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                }}
            >
                {/* <RoundedExample /> */}
                <Button
                    onPress={() =>
                        enterFullscreen(() => {
                            console.log('Entered Fullscreen', arguments)
                        })
                    }
                >
                    EnterFullscreen
                </Button>

                {/* {hashes.map((h, i) => (
                <div key={i}>{h}</div>
            ))} */}

                <div style={{ flex: 1 }}></div>
            </div>
        </>
    )
}
