import { onMounted, onBeforeUnmount } from "vue"

export function useReveal(rootRef, { onCounter } = {}) {
  let observer = null

  onMounted(() => {
    const root = rootRef?.value ?? document
    observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue
          e.target.classList.add("is-in")
          if (e.target.dataset.counter !== undefined && onCounter) onCounter(e.target)
          observer.unobserve(e.target)
        }
      },
      { threshold: 0.18 },
    )
    const nodes = root.querySelectorAll("[data-reveal], [data-reveal-stagger]")
    nodes.forEach((n) => observer.observe(n))
  })

  onBeforeUnmount(() => observer?.disconnect())
}
