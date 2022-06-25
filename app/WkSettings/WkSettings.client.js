import { CurvedArrow, rounded, RoundedExample } from 'app/WTF/Curve'
import { enterFullscreen } from 'app/WTF/EnterFullscreen'

import React, { useEffect, useRef } from 'react'

// import { hash } from 'app/WTF/hash'

const style = JSON.stringify({ position: 'absolute' })
const style2 = JSON.stringify({ position: 'absolute', top: 0, left: 0 })

const useLayoutEffect =
    typeof window != 'undefined' ? React.useLayoutEffect : React.useEffect

function Button({ onPress, children, id }) {
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
            id={id}
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

/**
 *
 *
 * @param {HTMLElement} node
 * @returns {ScrollPositions}
 */
// function findParent(node) {
//     const scrollablePositions = []
//     const rootScrollable = document.documentElement
//     let parentNode = node.parentElement

//     while (parentNode != null && parentNode !== rootScrollable) {
//         if (
//             // $FlowFixMe: flow is wrong
//             parentNode.offsetHeight < parentNode.scrollHeight ||
//             // $FlowFixMe: flow is wrong
//             parentNode.offsetWidth < parentNode.scrollWidth
//         ) {
//             scrollablePositions.push([
//                 parentNode,
//                 parentNode.scrollTop,
//                 parentNode.scrollLeft,
//             ])
//         }
//         parentNode = parentNode.parentElement
//     }

//     return scrollablePositions
// }

function PresentButtons() {
    /**
     * @param {Event} event
     */
    const handle = (event) => {
        if (__CLIENT__) {
            window.ui.bottomsheets.forEach((sheet, i) => {
                if (window.ui.contents?.item(i).contains(event.target)) {
                    window.ui.bottomsheets
                        .item(i)
                        .style.setProperty(
                            '--y-detent',
                            `var(--y-${event.target.id})`,
                        )
                } else if (
                    window.ui.bottomsheets.item(i).contains(event.target)
                ) {
                    window.ui.bottomsheets
                        .item(i)
                        .style.setProperty(
                            '--y-detent',
                            `var(--y-${event.target.id})`,
                        )
                }
            })
        }
    }
    return [
        { id: 'detent-top', detent: 1 },
        { id: 'detent-mid', detent: 0.5 },
        { id: 'detent-bottom', detent: 0 },
    ].map(({ id, detent }, i) => {
        return (
            <Button key={id} id={id} onPress={handle}>
                {id} {detent}
            </Button>
        )
    })
}

function ChangeActive() {
    return [
        { id: '1', title: 'One' },
        { id: '2', title: 'Two' },
        { id: '3', title: 'Three' },
    ].map(({ id, title }, i) => {
        return (
            <Button
                key={id}
                id={id}
                onPress={() =>
                    document.documentElement.style.setProperty(
                        '--active',
                        `${id}`,
                    )
                }
            >
                {title}
            </Button>
        )
    })
}

const useLayoutEffect2 = __CLIENT__ ? React.useLayoutEffect : React.useEffect

function Controls() {
    const ref = useRef(null)
    const outerRef = useRef(null)
    const fakeRef = useRef(null)
    // useLayoutEffect2(() => {
    //     if (ref.current) {
    //         outerRef.current.addEventListener('click', () => {
    //             fakeRef.current.focus()
    //             // setTimeout(() => {
    //             const box = ref.current.getBoundingClientRect()

    //             document.querySelectorAll('.scrollview').forEach((column) => {
    //                 const currentTop = box.top - column.scrollTop

    //                 if (column.contains(ref.current)) {
    //                     ref.current.style.transform = 'translateY(-9999px)'

    //                     column.scrollTop = currentTop
    //                     ref.current.style.transform = ''
    //                     ref.current.focus()
    //                 }
    //             })
    //             // }, 2000)
    //         })
    //         window.visualViewport.addEventListener('resize', () => {
    //             if (
    //                 window.visualViewport.height <
    //                 document.documentElement.clientHeight - 100
    //             ) {
    //                 document.documentElement.addEventListener(
    //                     'touchstart',
    //                     (e) => {
    //                         document.activeElement.blur()
    //                     },
    //                     { once: true, capture: true, passive: false },
    //                 )
    //             }
    //         })
    //     }
    // }, [])
    return (
        <>
            <div
                ref={outerRef}
                style={{
                    padding: 10,
                    // pointerEvents: 'none',
                    minHeight: 100,
                    width: '100%',
                }}
                className="PointerEventsBoxOnly"
            >
                <input
                    ref={fakeRef}
                    // tabIndex="1"
                    className="PointerEventsAuto"
                    // type="text"
                    style={{
                        // transform: `translateY(-9999px)`,

                        position: 'fixed',
                        top: '-999999px',
                        minHeight: '44px',
                        display: 'flex',
                        width: '100%',
                        zIndex: 9999,
                        borderRadius: '8px',
                        borderWidth: '0.5px',
                        backgroundColor: `rgba(100,100,100,.1)`,
                        borderColor: `rgba(100,100,100,.1)`,
                        fontSize: '16px',
                        color: '#fff',
                        lineHeight: '40px',
                    }}
                />
                <input
                    ref={ref}
                    // tabIndex="1"
                    className="PointerEventsAuto"
                    // type="text"
                    style={{
                        minHeight: '44px',
                        display: 'flex',
                        width: '100%',
                        zIndex: 9999,
                        borderRadius: '8px',
                        borderWidth: '0.5px',
                        backgroundColor: `rgba(100,100,100,.1)`,
                        borderColor: `rgba(100,100,100,.1)`,
                        fontSize: '16px',
                        color: '#fff',
                        lineHeight: '40px',
                    }}
                />
            </div>
        </>
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
                    width: '100%',
                    alignItems: 'stretch',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                }}
            >
                {/* <RoundedExample /> */}
                {/* <Controls /> */}
                <ChangeActive />

                <PresentButtons />

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
