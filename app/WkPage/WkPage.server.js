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
function WkScrollView({ children }) {
    return (
        <section
            className="scrollview"
            style={{
                // touchAction: 'pan-y',
                backgroundColor: 'rgba(10,10,12,1)',
                '--navbarh': 'calc(60px + env(safe-area-inset-top))',
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
                    minHeight: 'var(--navbarh)',
                    height: 'var(--navbarh)',
                    maxHeight: 'var(--navbarh)',
                    // zIndex: 0,
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
            {/* </div> */}

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
                <div>Footer</div>
            </section>
        </section>
    )
}
function WkColumnContent(props) {
    return (
        <div className={'column content'} id={props.id}>
            <WkScrollView>{props.children}</WkScrollView>
        </div>
    )
}
function WkColumnNavigation(props) {
    return (
        <div className={'column navigation'} id={props.id}>
            <div>{props.children}</div>
        </div>
    )
}
function WkColumnBottomSheet(props) {
    return (
        <div className={'column bottomsheet'} id={props.id}>
            <WkScrollView>{props.children}</WkScrollView>
        </div>
    )
}

export default function WkPage({ children }) {
    return (
        <>
            <span className="ui-columns" id="navigation">
                <WkColumnNavigation id={'sidebar-navigation'}>
                    <WkNavItem columnToggle="1" />
                </WkColumnNavigation>
                <WkColumnNavigation id={'master-navigation'}>
                    <WkNavItem columnToggle="1" />
                </WkColumnNavigation>
                <WkColumnNavigation id={'detail-navigation'}>
                    <WkNavItem columnToggle="2" />
                </WkColumnNavigation>
            </span>
            <span className="ui-columns" id="content">
                <WkColumnContent id={'sidebar-content'}>
                    <TestContent>{children}</TestContent>
                </WkColumnContent>
                <WkColumnContent id={'master-content'}>
                    <TestContent>{children}</TestContent>
                </WkColumnContent>
                <WkColumnContent id={'detail-content'}>
                    <TestContent>{children}</TestContent>
                </WkColumnContent>
            </span>
            <span className="ui-columns" id="sheets">
                <WkColumnBottomSheet id={'sidebar-bottomsheet'}>
                    <TestContent>{children}</TestContent>
                </WkColumnBottomSheet>
                <WkColumnBottomSheet id={'master-bottomsheet'}>
                    <TestContent>{children}</TestContent>
                </WkColumnBottomSheet>
                <WkColumnBottomSheet id={'detail-bottomsheet'}>
                    <TestContent>{children}</TestContent>
                </WkColumnBottomSheet>
            </span>
        </>
    )
}
