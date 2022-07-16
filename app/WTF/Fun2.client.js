import Router, { useRouter } from 'next/router'
import React, { createRef } from 'react'

let id

export default function Fun2(props) {
    const ref = React.useRef({})

    id = React.useId()
    // if (!id) {
    // }

    const getter = React.useRef(
        () =>
            (typeof window != 'undefined' && document.getElementById(id)) || {
                style: {},
            },
    )

    // const setRef = React.useCallback((target) => {
    //     const el =
    //         target != null
    //             ? target
    //             : typeof window != 'undefined' && document.getElementById(id)
    //     if (el) {
    //         // Object.assign(el.style, {
    //         //     minHeight: '44px',
    //         //     fontSize: 17,
    //         //     padding: '0px 20px',
    //         //     width: '300px',
    //         //     maxWidth: '100%',
    //         //     // width: 'min(200px,100%)',
    //         //     // width: '100%',
    //         // })
    //     }
    // }, [])
    return (
        <>
            <select
                id={id}
                // ref={setRef}
                defaultValue={props.color}
                suppressHydrationWarning
                onChange={(e) => {
                    Router?.push?.('/[[...path]]', '/' + e.target.value)
                    // setColor(e.target.value)
                }}
                style={{ pointerEvents: 'auto' }}
            >
                <Child />
                <option value={'green'} title="Green">
                    Green
                </option>
                <option value={'blue'} title="Blue">
                    Blue
                </option>
                <option value={'red'} title="Red">
                    Red
                </option>
            </select>
        </>
    )
}

let child = <Fun2 />

function Child() {
    // if (typeof window != 'undefined') {
    //     Object.assign(document.getElementById(parentId)?.style || {}, {
    //         minHeight: '44px',
    //         fontSize: 17,
    //         padding: '0px 20px',
    //         width: '300px',
    //         maxWidth: '100%',
    //         // width: 'min(200px,100%)',
    //         // width: '100%',
    //     })
    //     React.useInsertionEffect(() => {
    //         // console.log('Insert', ref.current())
    //         Object.assign(document.getElementById(parentId)?.style || {}, {
    //             minHeight: '44px',
    //             fontSize: 17,
    //             padding: '0px 20px',
    //             width: '300px',
    //             maxWidth: '100%',
    //             // width: 'min(200px,100%)',
    //             // width: '100%',
    //         })
    //     })
    // }
    if (typeof window != 'undefined') {
        let parentId = id
        Object.assign(document.getElementById(parentId)?.style || {}, {
            minHeight: '44px',
            fontSize: 17,
            padding: '0px 20px',
            width: '300px',
            maxWidth: '100%',
            // width: 'min(200px,100%)',
            // width: '100%',
        })

        // React.useInsertionEffect(() => {
        //     // console.log('Insert', ref.current())
        //     Object.assign(document.getElementById(parentId)?.style || {}, {
        //         minHeight: '44px',
        //         fontSize: 17,
        //         padding: '0px 20px',
        //         width: '300px',
        //         maxWidth: '100%',
        //         // width: 'min(200px,100%)',
        //         // width: '100%',
        //     })
        // })
    }
}
