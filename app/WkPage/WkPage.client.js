import { useInsertionEffect } from 'react'
import { R } from 'UserInterface/Rules'
import WkNavItem from './WkNavItem.client'

function TestContent({ children }) {
    return (
        <>
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
                    className="callouts"
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
                {children}
            </section>
        </>
    )
}

const restorationCache = new Map()

function WkScrollViewRestoration({ restorationId }) {
    useInsertionEffect(() => {
        if (!restorationId) return

        const element = __CLIENT__
            ? document.getElementById(restorationId)
            : null
        if (element != null) {
            if (restorationCache.has(restorationId)) {
                element.scrollTop = restorationId
            }
        }

        return () => {
            restorationCache.set(restorationId, element.scrollTop)
        }
    })
    // useL
}
function WkScrollView({ children, restorationId, title }) {
    return (
        <section
            // tabIndex="1"
            id={restorationId}
            className="scrollview"
            style={{
                // touchAction: 'pan-y',
                backgroundColor: 'rgba(10,10,12,1)',
                // '--navbarh': 'calc(60px + env(safe-area-inset-top))',
                zIndex: 1,
            }}
        >
            {/* <div style={{}}> */}
            <section
                style={{
                    position: 'fixed',
                    // top: -0.5,
                    top: `calc(-0.5px + (100vh - (100vh * var(--y-detents))))`,
                    width: '100%',
                    minHeight: 'var(--column-safetopcontentinset)',
                    height: 'var(--column-safetopcontentinset)',
                    maxHeight: 'var(--column-safetopcontentinset)',
                    // zIndex: 0,
                    padding: 0,
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
                        height: 44,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',

                        justifyContent: 'center',
                    }}
                >
                    <span style={{ fontSize: 17 }}>{title || 'NoTitle'}</span>
                </div>
            </section>
            {/* </div> */}

            <section
                style={{
                    minHeight: 'var(--column-safetopcontentinset)',
                    height: 'var(--column-safetopcontentinset)',
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
            {children}
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
                <div className={R.Selectable}>
                    This could be some footer text
                </div>
            </section>
            <WkScrollViewRestoration restorationId={restorationId} />
        </section>
    )
}
function WkColumnContent(props) {
    return (
        <div className={'column content'} id={props.id}>
            <WkScrollView title={props.title} restorationId={props.id}>
                {props.children}
            </WkScrollView>
        </div>
    )
}
function WkColumnNavigation(props) {
    return (
        <div className={'column navigation'} id={props.id}>
            {/* <div style={{ minHeight: 'var(--safe-area-inset-top)' }}></div> */}
            {props.children}
        </div>
    )
}
function WkColumnBottomSheet(props) {
    return (
        <div className={'column bottomsheet'} id={props.id}>
            <WkScrollView restorationId={props.id}>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        padding: 20,
                        backgroundColor: 'rgba(100,100,100,.2)',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            padding: 20,
                        }}
                    >
                        {props.children}
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            padding: 20,
                            minHeight: '20vh',
                            backgroundColor: 'rgba(100,100,100,.3)',
                        }}
                    ></div>
                </div>
            </WkScrollView>
        </div>
    )
}

export default function WkPage({ children }) {
    return (
        <>
            <span className="ui-columns" id="navigation">
                <WkColumnNavigation id={'sidebar-navigation'}>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            padding: '2px 10px',
                        }}
                    >
                        <WkNavItem columnToggle="1">{'T1'}</WkNavItem>
                        <div style={{ flex: 1 }}></div>
                        <WkNavItem>{'R1'}</WkNavItem>
                    </div>
                </WkColumnNavigation>
                <WkColumnNavigation id={'master-navigation'}>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            padding: '2px 10px',
                        }}
                    >
                        <WkNavItem columnToggle="1">{'X1'}</WkNavItem>
                        <div style={{ flex: 1 }}></div>
                        <WkNavItem>{'R2'}</WkNavItem>
                    </div>
                </WkColumnNavigation>
                <WkColumnNavigation id={'detail-navigation'}>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            padding: '2px 10px',
                        }}
                    >
                        <WkNavItem columnToggle="2">{'T2'}</WkNavItem>
                        <div style={{ flex: 1 }}></div>
                        <WkNavItem>{'R3'}</WkNavItem>
                    </div>
                </WkColumnNavigation>
            </span>
            <span className="ui-columns" id="content">
                <WkColumnContent id={'sidebar-content'} title="Sidebar">
                    <TestContent>{children}</TestContent>
                </WkColumnContent>
                <WkColumnContent id={'master-content'} title="Master">
                    <TestContent>{children}</TestContent>
                </WkColumnContent>
                <WkColumnContent id={'detail-content'} title="Detail">
                    <TestContent>{children}</TestContent>
                </WkColumnContent>
            </span>
            <span className="ui-columns" id="bottomsheet">
                <WkColumnBottomSheet id={'sidebar-bottomsheet'}>
                    {/* <TestContent>{children}</TestContent> */}
                    {children}
                </WkColumnBottomSheet>
                <WkColumnBottomSheet id={'master-bottomsheet'}>
                    {/* <TestContent>{children}</TestContent> */}
                    {children}
                </WkColumnBottomSheet>
                <WkColumnBottomSheet id={'detail-bottomsheet'}>
                    {/* <TestContent>{children}</TestContent> */}
                    {children}
                </WkColumnBottomSheet>
            </span>
        </>
    )
}
