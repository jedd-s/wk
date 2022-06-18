import { jsx } from 'react/jsx-runtime'
import { jsx as jsxDev } from 'react/jsx-dev-runtime'

function ObjectView({ object }) {
  const entries = Object.entries(object)

  return (
    <>
      {entries.map(([key, value], i) => {
        return (
          <div style={{ display: 'flex', padding: 10 }} key={key}>
            <div>{key}</div>
            <div style={{ paddingLeft: 10 }}>{`${value}`}</div>
          </div>
        )
      })}
    </>
  )
}
import { useRouter } from 'next/router'
import React, { useEffect, useMemo, useRef, useState } from 'react'
const calloutStyle = `
.invisible {
    opacity: 0;
    pointer-events: none;
}
.hidden {
    display: none;
}

div.annotations,
div.annotations > div,
div.callouts,
div.style-helper {
    position: absolute;
    top: 0;
    left: 0;
}
.selected {
    z-index: 1;
}
.lifted {
    z-index: 2;
}
.callout {
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: auto;
    -webkit-user-select: auto;
    -moz-user-select: text;
    -ms-user-select: text;
    user-select: text;
}
.dark-mode .callout {
    color: #fff;
}
.callout > * {
    position: absolute;
    top: 0;
    left: 0;
}
svg.bubble {
    display: block;
    width: 100%;
    height: 100%;
}
div.callout-accessory {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    overflow: hidden;
}
div.callout-accessory-content {
    white-space: nowrap;
    position: relative;
    text-align: center;
    font-size: 12px;
}
div.callout-accessory:first-child {
    left: 0;
}
div.callout-accessory:last-child {
    right: 0;
}
div.callout-accessory:first-child .callout-accessory-content {
    padding-right: 8px;
}
div.callout-accessory:last-child .callout-accessory-content {
    padding-left: 8px;
}
div.standard {
    font-family: "-apple-system", BlinkMacSystemFont, "Helvetica Neue", Helvetica, Arial, sans-serif;
    box-sizing: border-box;
    position: relative;
}
div.custom-content,
div.standard {
    transform: translateY(-50%);
}
div.standard .callout-content > div {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
div.standard .callout-content {
    padding: 0 4px;
}
.callout-content.rtl {
    direction: rtl;
}
.callout-content.rtl * {
    text-align: right;
}
div.callout-accessory:first-child + .callout-content {
    padding-left: 8px;
}
div.standard .callout-content:nth-last-child(2) {
    padding-right: 8px;
}
div.standard .title {
    font-size: 17px;
    font-weight: 500;
    color: #000;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    letter-spacing: 0.025em;
}
.dark-mode div.standard .title {
    color: #fff;
}
div.standard .subtitle {
    font-size: 13px;
    color: rgba(0, 0, 0, 0.7);
    letter-spacing: 0.025em;
}
.dark-mode div.standard .subtitle {
    color: rgba(255, 255, 255, 0.7);
}
svg.bubble path {
    fill: #fff;
    stroke: rgba(0, 0, 0, 0.2);
}
`

const useLayoutEffectImpl =
  typeof window != 'undefined' ? React.useLayoutEffect : React.useEffect

function useMenu(items) {
  const row = {
    small: 37,
    regular: 49,
    large: 61,
  }
  // const size =

  const [size, setSize] = useState({
    // r:
    radius: 10.5,
    arrowH: 13,
    arrowX: 0.5,
    width: 220,
    height: row.regular,
    arrowW: 34,

    // get height() {
    //   return this._height
    // },
    // _windowHeight: 0,
  })

  function getItemHeight(item) {
    return row[item.size] || (item.subtitle ? row.large : row.regular)
  }

  const totalItemsHeight = useMemo(
    () => items.reduce((a, item) => a + getItemHeight(item), 0),
    [items]
  )

  const maxHeight = useRef(0)

  function getListHeight() {
    const availableHeight =
      typeof window != 'undefined'
        ? document.documentElement.clientHeight -
          (size.arrowH + row.regular * 2)
        : 1000

    return size.arrowH + Math.min(availableHeight, totalItemsHeight)
  }

  useLayoutEffectImpl(() => {
    function resizeHandle() {
      setSize((prev) => ({ ...prev, height: getListHeight() }))
    }
    const resizeOpts = {}

    if (typeof window != 'undefined') {
      setSize((prev) => ({ ...prev, height: getListHeight() }))
      window.addEventListener('resize', resizeHandle, resizeOpts)
    }
    return () => {
      window.removeEventListener('resize', resizeHandle, resizeOpts)
    }
  }, [totalItemsHeight])

  return { size, getItemHeight, getListHeight }
}
// const size = {
//   // r:
//   radius: 10.5,
//   arrowH: 13,
//   arrowX: 0.5,
//   width: 220,
//   arrowW: 34,
//   row: {
//     small: 36,
//     regular: 52,
//     large: 80,
//   },
//   getItemHeight(item) {
//     return (
//       this.row[item.size] || (item.subtitle ? this.row.large : this.row.regular)
//     )
//   },
//   _height: 0,
//   _totalItemsHeight: 0,
//   get height() {
//     return this._height
//   },
//   _windowHeight: 0,
//   getProps(items) {
//     if (typeof window != 'undefined') {
//       const clientHeight = document.documentElement.clientHeight

//       // this._windowHeight =
//       if (!this._totalItemsHeight) {
//         this._totalItemsHeight = items.reduce(
//           (a, item) => a + this.getItemHeight(item),
//           0
//         )
//       }

//       if (clientHeight != this._windowHeight) {
//         this._windowHeight = clientHeight
//         this._height =
//           this.arrowH +
//           Math.min(clientHeight - 150, this._totalItemsHeight)
//       }
//     }
//     return this
//   },
// }
const data = {
  items: [
    { title: 'San Francisco', subtitle: 'California' },
    { title: 'Vernon', subtitle: 'British Columbia' },
    { title: 'Canada' },
    { title: 'United States' },
    { title: 'Mexico' },
  ],
}

const Callouts = () => {
  let menu = useMenu(data.items)

  return (
    <>
      <div class='callouts' style={{}}>
        <div
          class='callout selected'
          style={{
            position: 'fixed',
            bottom: '50vh',
            left: '50vw',
            direction: 'ltr',
            '--w': `${menu.size.width}px`,
            '--h': `${menu.size.height}px`,
            '--innerH': `calc(var(--h) - ${menu.size.arrowH}px)`,
            // '--w': 'calc(var(--scw) * var(--scx))',
            // '--h': 'calc(var(--sch) * var(--scy))',
            transform: 'translate3d(-50%,50%,0px)',
            // transform:
            //   'translate(408px, 328.5px) translateY(34.75px) scale(1) translateY(-34.75px) rotate3d(0, 0, 0, 0deg)',
            width: 'var(--w)',
            height: 'var(--h)',
            fontFamily: 'system-ui',
            fontSize: 14,
          }}
        >
          <div
            class='bubble'
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              minWidth: 'var(--w)',
              transform: 'translate3d(0px,0px,0px)',
              width: 'var(--w)',
              minHeight: 'var(--h)',
              height: 'var(--h)',
              backgroundColor: '#33333380',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              clipPath: `path("M0,${menu.size.radius} c0,-7 4,-${
                menu.size.radius
              } ${menu.size.radius},-${menu.size.radius} h${
                menu.size.width - menu.size.radius * 2
              } c7,0 ${menu.size.radius},4 ${menu.size.radius},${
                menu.size.radius
              } v${
                menu.size.height - menu.size.radius * 2 - menu.size.arrowH
              } c0,7 -4,${menu.size.radius} -${menu.size.radius},${
                menu.size.radius
              } h-${
                (menu.size.width - menu.size.radius * 2 - menu.size.arrowW) *
                (1 - menu.size.arrowX)
              } c-10,0 -12,${menu.size.arrowH} -${menu.size.arrowW / 2},${
                menu.size.arrowH
              } c-5,0 -7,-${menu.size.arrowH} -${menu.size.arrowW / 2},-${
                menu.size.arrowH
              } h-${
                menu.size.width -
                menu.size.radius * 2 -
                menu.size.arrowW -
                (menu.size.width - menu.size.radius * 2 - menu.size.arrowW) *
                  (1 - menu.size.arrowX)
              } c-7,0 -${menu.size.radius},-4 -${menu.size.radius},-${
                menu.size.radius
              }z")`,
            }}
          ></div>
          <div
            class='bubble'
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: 'var(--w)',
              maxWidth: 'var(--w)',
              maxHeight: 'var(--innerH)',
              height: 'var(--innerH)',
              overflowX: 'hidden',
              overflowY: 'scroll',
              touchAction: 'pan-y',
              backgroundColor: 'rgba(0,0,0,0)',
            }}
          >
            {data.items.map((item, i) => {
              return (
                <React.Fragment key={i}>
                  {i != 0 && (
                    <div
                      style={{
                        position: 'absolute',
                        height: 1,
                        left: 0,
                        transform: 'translate3d(0px,-.5px,0px) scaleY(.5)',
                        transformOriginY: '100%',
                        width: '100%',
                        backgroundColor: 'rgba(145,150,165,.3)',
                      }}
                    ></div>
                  )}
                  <div
                    style={{
                      zIndex: 2,
                      position: 'absolute',
                      left: 0,
                      // transformOriginY: '100%',
                      width: '100%',
                      height: menu.getItemHeight(item),
                      backgroundColor: `rgba(145,150,165,${i == 2 ? 0.3 : 0})`,
                    }}
                  ></div>
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'stretch',
                      position: 'relative',
                      transform: 'translate3d(0px,0px,0px)',
                      '--contentLeftWidth':
                        item.contentLeft != null ? '60px' : '10px',
                      top: 0,
                      backgroundColor: 'rgba(200,0,0,0)',
                      left: 0,
                      height: menu.getItemHeight(item),
                      right: 0,
                    }}
                  >
                    <div
                      class='callout-accessory'
                      style={{
                        width: `var(--contentLeftWidth)`,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <div
                        class='callout-accessory-content'
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <span>{item.contentLeft}</span>
                      </div>
                    </div>
                    <div
                      class='callout-content'
                      style={{
                        flex: 1,
                        // marginLeft: '38.875px',
                        // marginRight: '32.5px',
                        display: 'flex',
                        padding: '10px 12px',

                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                      }}
                    >
                      <div
                        class='title'
                        dir='auto'
                        style={{
                          fontSize: '15px',
                          lineHeight: '22px',
                          opacity: 0.9,
                        }}
                      >
                        {item.title}
                      </div>
                      {item.subtitle && (
                        <div
                          class='subtitle'
                          dir='auto'
                          style={{
                            fontSize: '11px',
                            fontWeight: 500,
                            lineHeight: '13px',
                            opacity: 0.5,
                          }}
                        >
                          {item.subtitle}
                        </div>
                      )}
                    </div>
                    <div
                      class='callout-accessory'
                      style={{
                        width: item.contentRight != null ? '48px' : '10px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <div class='callout-accessory-content'>
                        <span>{item.contentRight}</span>
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}
export default function Page(props) {
  return (
    <>
      {/* {props.ro} */}
      <section
        style={{
          touchAction: 'pan-y',
          '--navbarh': 'calc(60px + env(safe-area-inset-top))',
        }}
      >
        <section
          style={{
            position: 'fixed',
            top: -0.5,
            width: '100%',
            minHeight: 'var(--navbarh)',
            height: 'var(--navbarh)',
            maxHeight: 'var(--navbarh)',
            zIndex: 2,
            padding: 8,
            backgroundColor: `rgba(20,20,20,.7)`,
            WebkitBackdropFilter: 'blur(20px)',
            backdropFilter: 'blur(20px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
        >
          <div
            style={{
              minHeight: 44,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',

              justifyContent: 'center',
            }}
          >
            <span style={{ fontSize: 17 }}>Title</span>
          </div>
        </section>

        <section
          style={{
            minHeight: 'var(--navbarh)',
            height: 'var(--navbarh)',
            padding: '20px 20px 20px 20px',
            backgroundColor: `rgba(0,0,0,0)`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div>-</div>
        </section>
        <section
          style={{
            minHeight: '16vh',
            padding: '20px 20px 20px 20px',
            backgroundColor: `rgba(240,245,255,.04)`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            justifyContent: 'center',
          }}
        >
          <div style={{ minHeight: 12 }} />
          <div
            style={{
              justifyContent: 'flex-start',
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
            }}
          >
            <span style={{ fontSize: 20 }}>Section Heading</span>
          </div>
          <div style={{ minHeight: 44 }} />
          <div
            class='callouts'
            style={{
              // position: 'absolute',
              // bottom: '50vh',
              // left: '50vw',
              // minWidth: '92%',
              alignSelf: 'center',
              width: '94%',
              maxWidth: '94%',
              minHeight: '240px',
              borderRadius: 20,
              height: 'max(36vh, 260px)',
              // transform: 'translate3d(-50%,50%,0px)',
              backgroundImage: 'url("/images/monteray-dark.jpg")',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
            }}
          ></div>
          <div style={{ minHeight: 44 }} />
        </section>
        <section
          style={{
            minHeight: '100vh',
            padding: 20,
            backgroundColor: `rgba(240,245,255,.02)`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Callouts />
        </section>
        <section
          style={{
            minHeight: '42vh',
            padding: 20,
            backgroundColor: `rgba(240,245,255,.04)`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div>Footer</div>
        </section>
      </section>
      {/* <ObjectView object={useRouter()} /> */}
      {/* <div>{props?.router}</div> */}
    </>
  )
}
