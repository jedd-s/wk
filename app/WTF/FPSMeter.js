// Start with:
// (new FPSMeter({ui: true})).start();

if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (() => {
        return (
            window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            function (callback) {
                window.setTimeout(callback, 1000 / 60)
            }
        )
    })()
}

const getTime = () => {
    return window.performance && window.performance.now
        ? window.performance.now()
        : +new Date()
}

class FPSMeter {
    constructor(opts) {
        this.ui = opts.ui || false
        this.fps = 0
        this.isRunning = false
        this.defaultStyles =
            'z-index:999;position:fixed;bottom:0;left:0;padding:10px;font-weight:600;font-style:normal;font-size:12px;font-family:Consolas,Menlo,Monaco,"Lucida Console","Liberation Mono","DejaVu Sans Mono","Bitstream Vera Sans Mono","Courier New",Courier,monospace,sans-serif'
    }

    measure() {
        const time = getTime()
        window.requestAnimationFrame(() => {
            const _fps = Math.round((1 / (getTime() - time)) * 1000)

            this.fps = _fps

            if (this.ui && this.element) {
                let i = 4 - `${_fps}`.length
                let pad = ''

                while (i > 0) {
                    pad += ' '
                    i--
                }

                this.text.nodeValue = `${_fps}${pad}fps`

                switch (false) {
                    case !(_fps < 7):
                        this.element.style.color = '#FFF'
                        this.element.style.backgroundColor = '#FF4500'
                        break
                    case !(_fps < 25):
                        this.element.style.color = '#FF4500'
                        this.element.style.backgroundColor = '#000'
                        break
                    case !(_fps < 40):
                        this.element.style.color = 'orange'
                        this.element.style.backgroundColor = '#000'
                        break
                    case !(_fps > 70):
                        this.element.style.color = '#0f0'
                        this.element.style.backgroundColor = '#000'
                        break
                    default:
                        this.element.style.color = '#018801'
                        this.element.style.backgroundColor = '#000'
                        break
                }
            }

            if (this.isRunning) {
                this.measure()
            }
        })
    }

    start() {
        if (!this.isRunning) {
            this.isRunning = true

            if (this.ui === true) {
                this.text = document.createTextNode('')
                this.element = document.createElement('div')
                this.element.style = this.defaultStyles
                this.element.appendChild(this.text)
                document.body.appendChild(this.element)
            }

            this.measure()
        }
    }

    pause() {
        this.isRunning = false
    }

    resume() {
        if (!this.isRunning) {
            this.isRunning = true
            this.measure()
        }
    }

    toggle() {
        this.isRunning ? this.pause() : this.resume()
    }

    stop() {
        if (this.isRunning) {
            this.isRunning = false
            if (this.ui === true && this.element) {
                this.element.remove()
            }
        }
    }
}
