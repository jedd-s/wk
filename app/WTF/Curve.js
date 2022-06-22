// from/to: { left, top, width, height, shape: 'circle' | 'rect' }
function path(points, relative) {
    let type = null

    if (points.length === 3) {
        type = 'Q'
    } else if (points.length === 4) {
        type = 'C'
    } else if (points.length % 2 === 0) {
        type = 'C'
    } else {
        console.log('Number of points must be 3 or an even number more than 3')
    }

    const pathPoints = [
        relative ? 'l' : 'M',
        points[0][0],
        ',',
        points[0][1],
        relative ? type.toLowerCase() : type,
    ]

    for (let p = 1, l = points.length; p < l; p++) {
        if (p >= 4 && p % 2 === 0) pathPoints.push('S')

        pathPoints.push(points[p][0])
        pathPoints.push(',')
        pathPoints.push(points[p][1])
    }

    return pathPoints.join(' ')
}

function CurvedArrow({ from, to }) {
    function curvedHorizontal(x1, y1, x2, y2) {
        function pos(t) {
            let mx = x1 + (x2 - x1) / 2
            let p1 = { x: x1, y: y1 }
            let p2 = { x: mx, y: y1 }
            let p3 = { x: mx, y: y2 }
            let p4 = { x: x2, y: y2 }
            return {
                x:
                    (1 - t) ** 3 * p1.x +
                    3 * (1 - t) ** 2 * t * p2.x +
                    3 * (1 - t) * t ** 2 * p3.x +
                    t ** 3 * p4.x,
                y:
                    (1 - t) ** 3 * p1.y +
                    3 * (1 - t) ** 2 * t * p2.y +
                    3 * (1 - t) * t ** 2 * p3.y +
                    t ** 3 * p4.y,
            }
        }
        function intersects(point, area) {
            if (area.shape === 'rect') {
                return (
                    point.x >= area.left &&
                    point.x <= area.left + area.width &&
                    point.y >= area.top &&
                    point.y <= area.top + area.height
                )
            } else if (area.shape === 'circle') {
                const center = {
                    x: area.left + area.width / 2,
                    y: area.top + area.height / 2,
                }
                return (
                    Math.sqrt(
                        (center.x - point.x) ** 2 + (center.y - point.y) ** 2,
                    ) <=
                    area.width / 2
                )
            }
        }
        let line = []
        for (let t = 0; t < 1; t += 0.001) {
            let p = pos(t)
            if (!intersects(p, from) && !intersects(p, to)) {
                line.push(p.x, p.y)
            }
        }
        return line.length > 0 ? 'M ' + line.join(' ') : ''
    }

    const d1 = curvedHorizontal(
        from.left + from.width / 2,
        from.top + from.height / 2,
        to.left + to.width / 2,
        to.top + to.height / 2,
    )

    const d2 = curvedHorizontal(0, 50, 100, 0)
    const [W, H] = [200, 100]

    return (
        <path
            // d={rounded(50, 150)}
            // d={d2}
            // d={[
            //     'M0,100 ',
            //     path(
            //         [
            //             [0, 0],
            //             [0, -100],
            //             [0, -100],
            //             [100, -100],
            //         ],
            //         true,
            //     ),

            //     path(
            //         [
            //             [0, 0],
            //             [100, 0],
            //             [100, 0],
            //             [100, 100],
            //         ],
            //         true,
            //     ),
            //     path(
            //         [
            //             [0, 0],
            //             [0, 100],
            //             [0, 100],
            //             [-100, 100],
            //         ],
            //         true,
            //     ),
            //     path(
            //         [
            //             [0, 0],
            //             [-100, 0],
            //             [-100, 0],
            //             [-100, -100],
            //         ],
            //         true,
            //     ),
            //     ' Z',
            // ].join('')}
            stroke="#666666"
            strokeWidth={1}
            // strokeLinejoin="round"
            fill="#33333399"
        />
    )
}

function rounded(width, height, cornerRadius = 20) {
    // const width = _width + 0.5
    // const height = _height - 1
    const min = Math.min(width, height)
    const max = Math.max(width, height)

    // console.log()
    const smooth = (min > 60 ? 40 : 28) / (Math.min(20, cornerRadius) % min)
    // const smooth = 2
    const h = min / smooth
    const w = min / smooth
    const start = `M0,${h} `
    const vline = height - h - h
    const hline = width - w - w
    const top = `l${hline},0`
    const right = `l0,${vline}`
    const bottom = `l${-hline},0`
    const left = `l0,${-vline}`
    const topleft = `c0,${-h} 0,${-h} ${w},${-h}`
    const topright = `c${w},0 ${w},0 ${w},${h}`
    const bottomright = `c0,${h} 0,${h} ${-w},${h}`
    const bottomleft = `c${-w},0 ${-w},0 ${-w},${-h}`
    const end = `Z`
    return [
        start,
        topleft,
        top,
        topright,
        right,
        bottomright,
        bottom,
        bottomleft,
        left,
        end,
    ].join(' ')
}

export function RoundedExample() {
    const BOX = {
        WIDTH: 260,
        HEIGHT: 42,
        CORNER_RADIUS: 20,
    }
    const spacer = <div style={{ minHeight: BOX.HEIGHT / 2 }}></div>
    return (
        <div
            style={{
                width: BOX.WIDTH,
                height: BOX.HEIGHT,
                pointerEvents: 'all',
                marginBottom: BOX.HEIGHT,
                color: `rgba(40,40,40,.6)`,
                position: 'relative',
            }}
        >
            <svg
                viewBox={`-.5 -1 ${BOX.WIDTH} ${BOX.HEIGHT}`}
                style={{
                    color: 'currentcolor',
                    display: 'inline-block',
                    border: '0px solid rgba(0,0,0,0)',
                    overflow: 'visible',
                }}
            >
                <path
                    d={rounded(
                        BOX.WIDTH - 1.5,
                        BOX.HEIGHT - 1.5,
                        BOX.CORNER_RADIUS,
                    )}
                    fill="currentcolor"
                />
            </svg>
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: `rgba(240,245,255,.2)`,
                }}
            >
                <span>Search</span>
            </div>
        </div>
    )
}
