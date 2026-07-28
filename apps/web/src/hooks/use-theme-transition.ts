import {useCallback, useRef} from 'react'
import type {Theme} from './use-theme'

const TRANSITION_DURATION = 500
const OVERLAY_ID = 'theme-transition-overlay'

// Approximate background colors matching CSS :root / .dark values.
// Used only by the fallback overlay — the View Transition API snapshots the
// real painted frame, so these aren't needed there.
const THEME_COLORS: Record<Theme, string> = {
  light: 'oklch(0.9818 0.0054 95.0986)',
  dark: 'oklch(0.2679 0.0036 106.6427)',
}

/** True when the user prefers reduced motion. */
function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Given a point (x, y) inside the viewport, return the radius (in px) of the
 * smallest circle centred on that point that fully covers the viewport.
 */
function maxRadius(x: number, y: number): number {
  const corners: [number, number][] = [
    [0, 0],
    [window.innerWidth, 0],
    [0, window.innerHeight],
    [window.innerWidth, window.innerHeight],
  ]
  return Math.max(...corners.map(([cx, cy]) => Math.hypot(cx - x, cy - y)))
}

/**
 * Set CSS custom properties --x, --y, --r on <html> so the CSS
 * `::view-transition-new(root)` animation can reference the click point.
 */
function setTransitionCoords(x: number, y: number, r: number): void {
  const root = document.documentElement
  root.style.setProperty('--x', `${x}px`)
  root.style.setProperty('--y', `${y}px`)
  root.style.setProperty('--r', `${r}px`)
}

function clearTransitionCoords(): void {
  const root = document.documentElement
  root.style.removeProperty('--x')
  root.style.removeProperty('--y')
  root.style.removeProperty('--r')
}

/**
 * View Transition path — wraps the React state update in
 * `document.startViewTransition()` so the browser captures a before/after
 * snapshot. We animate `::view-transition-new(root)` with a clip-path circle
 * via the Web Animations API so the origin and radius are dynamic per click.
 *
 * We set `mix-blend-mode: normal` and `isolation: isolate` on the new root
 * pseudo-element to prevent the "ghosting" artefact where the old snapshot
 * bleeds through during the transition.
 */
function transitionWithViewAPI(
  newTheme: Theme,
  x: number,
  y: number,
  updateState: (t: Theme) => void,
): void {
  const r = maxRadius(x, y)
  setTransitionCoords(x, y, r)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const vt: ViewTransition = (document as any).startViewTransition(() => {
    updateState(newTheme)
  })

  vt.ready.then(() => {
    // `::view-transition-new(root)` is the snapshot of the *new* frame.
    // We animate it from a 0-radius circle at the click point outward.
    document
      .getAnimations({subtree: true})
      .find(
        (a) =>
          a.effect instanceof KeyframeEffect &&
          a.effect.target === document.documentElement &&
          a.effect.pseudoElement === '::view-transition-new(root)',
      )
      ?.cancel() // cancel any stale running transition

    const newRoot = document.documentElement.animate(
      [
        {clipPath: `circle(0px at ${x}px ${y}px)`},
        {clipPath: `circle(${r}px at ${x}px ${y}px)`},
      ],
      {
        duration: TRANSITION_DURATION,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        pseudoElement: '::view-transition-new(root)',
      },
    )

    newRoot.finished.then(clearTransitionCoords)
  })
}

/**
 * CSS fallback for browsers without `startViewTransition`.
 * Creates a fixed overlay filled with the *new* theme colour, then expands a
 * clip-path circle from the click point via a CSS class toggle.
 *
 * The overlay sits at z-index: 1; #root sits at z-index: 2, so all page
 * content (text, borders, icons) remains fully visible above the overlay
 * throughout the animation.
 */
function transitionWithOverlay(
  newTheme: Theme,
  x: number,
  y: number,
  updateState: (t: Theme) => void,
): void {
  const root = document.documentElement
  const r = maxRadius(x, y)

  // Remove any stale overlay from a previous rapid toggle
  document.getElementById(OVERLAY_ID)?.remove()

  // Set coordinates so the CSS `clip-path` circle originates at the click
  root.style.setProperty('--x', `${x}px`)
  root.style.setProperty('--y', `${y}px`)

  const overlay = document.createElement('div')
  overlay.id = OVERLAY_ID
  overlay.style.background = THEME_COLORS[newTheme]
  document.body.appendChild(overlay)

  // Trigger the clip-path circle expansion on the next frame so the browser
  // registers the initial 0% state before transitioning to the full radius.
  requestAnimationFrame(() => {
    overlay.style.clipPath = `circle(${r}px at ${x}px ${y}px)`
  })

  // After the CSS transition ends, commit the real theme change and tear down
  const cleanup = (): void => {
    overlay.remove()
    root.style.removeProperty('--x')
    root.style.removeProperty('--y')
    updateState(newTheme)
  }

  overlay.addEventListener('transitionend', cleanup, {once: true})

  // Safety net in case transitionend doesn't fire (e.g. display: none)
  const timeout = setTimeout(cleanup, TRANSITION_DURATION + 100)
  overlay.addEventListener('transitionend', () => clearTimeout(timeout), {
    once: true,
  })
}

/**
 * Hook that returns a `toggle` callback. Call it with the click event (or
 * keyboard event) and the target theme. It picks the best available
 * transition strategy automatically.
 */
export function useThemeTransition() {
  const reducedMotion = useRef(prefersReducedMotion())

  const toggle = useCallback(
    (
      e: React.MouseEvent | React.KeyboardEvent,
      currentTheme: Theme,
      updateState: (t: Theme) => void,
    ) => {
      const newTheme: Theme = currentTheme === 'dark' ? 'light' : 'dark'

      // Keyboard events have no clientX/Y — fall back to button centre
      let x: number
      let y: number
      if ('clientX' in e) {
        x = e.clientX
        y = e.clientY
      } else {
        const btn = (e.target as HTMLElement).closest('button')
        if (btn) {
          const rect = btn.getBoundingClientRect()
          x = rect.left + rect.width / 2
          y = rect.top + rect.height / 2
        } else {
          x = window.innerWidth / 2
          y = window.innerHeight / 2
        }
      }

      if (reducedMotion.current) {
        updateState(newTheme)
        return
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ('startViewTransition' in document) {
        transitionWithViewAPI(newTheme, x, y, updateState)
      } else {
        transitionWithOverlay(newTheme, x, y, updateState)
      }
    },
    [],
  )

  return {toggle}
}
