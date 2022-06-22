import { jsx } from 'react/jsx-runtime'
import { jsx as jsxDev } from 'react/jsx-dev-runtime'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'

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

function useMenuBuilder(items) {
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

const MenuContext = React.createContext({})

const MenuProvider = ({ items, children }) => {
  const value = useMenuBuilder(items)

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>
}

function MenuRoot({ children }) {
  const menu = React.useContext(MenuContext)

  return (
    <div
      className='callout selected'
      style={{
        position: 'fixed',
        bottom: '50vh',
        left: '50vw',
        direction: 'ltr',
        '--w': `${menu.size.width}px`,
        '--h': `${menu.size.height}px`,
        '--innerH': `calc(var(--h) - ${menu.size.arrowH}px)`,
        transform: 'translate3d(-50%,50%,0px)',
        width: 'var(--w)',
        height: 'var(--h)',
        fontFamily: 'system-ui',
        fontSize: 14,
      }}
    >
      <div
        className='bubble'
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
        className='bubble'
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
        {children}
      </div>
    </div>
  )
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

function WkMenuItem({ item, index: i }) {
  const menu = useContext(MenuContext)

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
          '--contentLeftWidth': item.contentLeft != null ? '60px' : '10px',
          top: 0,
          backgroundColor: 'rgba(200,0,0,0)',
          left: 0,
          height: menu.getItemHeight(item),
          right: 0,
        }}
      >
        <div
          className='callout-accessory'
          style={{
            width: `var(--contentLeftWidth)`,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div
            className='callout-accessory-content'
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
          className='callout-content'
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
            className='title'
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
              className='subtitle'
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
          className='callout-accessory'
          style={{
            width: item.contentRight != null ? '48px' : '10px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div className='callout-accessory-content'>
            <span>{item.contentRight}</span>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

const WkMenu = () => {
  let menu = useMenuBuilder(data.items)

  return (
    <>
      <MenuProvider items={data.items}>
        <MenuRoot>
          {data.items.map((item, index) => {
            return <WkMenuItem key={index} item={item} index={index} />
          })}
        </MenuRoot>
      </MenuProvider>
    </>
  )
}

export default WkMenu
