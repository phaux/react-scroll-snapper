import { useCallback, useEffect, useRef, type JSX } from "react"

/**
 * Props for the {@link ScrollSnapper} component.
 */
export interface ScrollSnapperProps {
  /**
   * The current page index.
   *
   * Can be changed to programmatically scroll to a different page.
   */
  index: number
  /**
   * A callback which runs after the container is scrolled to a page.
   *
   * This will run even if the user scrolled but ended up on the same page.
   *
   * Scrolling triggered by changing the `index` prop will also trigger this callback after the animation is finished.
   */
  onIndexChange: (index: number, target: HTMLDivElement) => void
}

/**
 * Scroll Snapper React component.
 */
export function ScrollSnapper(
  props: ScrollSnapperProps & React.HTMLProps<HTMLDivElement>,
): JSX.Element {
  const { className = "", index, onIndexChange, onScroll, ...rootProps } = props

  const containerRef = useRef<HTMLDivElement>(null)
  const scrollTimeout = useRef<number>(null)
  const lastChildrenCount = useRef(0)

  // on every rerender
  useEffect(() => {
    if (!containerRef.current) return

    // set aria-hidden and inert on all children that aren't current page
    const currentChild = containerRef.current.children[index]
    for (const child of containerRef.current.children) {
      if (!(child instanceof HTMLElement)) continue
      const isCurrent = child === currentChild
      child.ariaHidden = !isCurrent ? "true" : null
      child.inert = !isCurrent
    }

    // only if number of children changed
    const childrenCount = containerRef.current.children.length
    if (childrenCount !== lastChildrenCount.current) {
      lastChildrenCount.current = childrenCount

      // scroll container to the current page instantly
      const pageWidth = containerRef.current.scrollWidth / containerRef.current.children.length
      containerRef.current.scrollTo({
        behavior: "instant",
        left: index * pageWidth,
        top: 0,
      })
    }
  })

  // on page index change
  useEffect(() => {
    if (!containerRef.current) return

    // scroll container to the current page smoothly
    const pageWidth = containerRef.current.scrollWidth / containerRef.current.children.length
    containerRef.current.scrollTo({
      behavior: "smooth",
      left: index * pageWidth,
      top: 0,
    })
  }, [index])

  // on user scroll
  const handleScroll = useCallback(
    (event: React.UIEvent<HTMLDivElement>) => {
      onScroll?.(event)
      const { currentTarget } = event
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current)
      scrollTimeout.current = window.setTimeout(() => {
        // update current page index
        const pageWidth = currentTarget.scrollWidth / currentTarget.children.length
        const currentIndex = Math.round(currentTarget.scrollLeft / pageWidth)
        onIndexChange(currentIndex, currentTarget)
      }, 100)
    },
    [onIndexChange, onScroll],
  )

  return (
    <div
      {...rootProps}
      ref={containerRef}
      className={`ScrollSnapper ${className}`}
      onScroll={handleScroll}
    />
  )
}
