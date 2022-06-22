export function enterFullscreen() {
  let callback = arguments[0]
  if (!document.webkitFullscreenEnabled) {
    callback(false)
    return
  }

  if (document.webkitIsFullScreen) {
    callback(true)
    return
  }

  let fullscreenChangeListener, fullscreenErrorListener
  fullscreenChangeListener = (e) => {
    // Some other element went fullscreen, we didn't request it.
    if (e.target !== document.documentElement) return

    if (!document.webkitIsFullScreen) return

    document.removeEventListener(
      'webkitfullscreenerror',
      fullscreenChangeListener
    )
    document.documentElement.removeEventListener(
      'webkitfullscreenchange',
      fullscreenErrorListener
    )
    callback(true)
  }
  fullscreenErrorListener = (e) => {
    // Some other element caused an error, we didn't request it.
    if (e.target !== document.documentElement) return

    document.removeEventListener(
      'webkitfullscreenchange',
      fullscreenChangeListener
    )
    document.documentElement.removeEventListener(
      'webkitfullscreenerror',
      fullscreenErrorListener
    )
    callback(!!document.webkitIsFullScreen)
  }

  // The document fires change events, but the fullscreen element fires error events.
  document.addEventListener('webkitfullscreenchange', fullscreenChangeListener)
  document.documentElement.addEventListener(
    'webkitfullscreenerror',
    fullscreenErrorListener
  )
  document.documentElement.webkitRequestFullscreen()
}
