<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue"
import { useI18n } from "../i18n"

const { t, dict, fmt } = useI18n()
const items = computed(() => dict.value.pillars.items)
const counts = ref(items.value.map(() => 0))
const root = ref(null)
let observer
let animated = false

function animate() {
  if (animated) return
  animated = true
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
    items.value.forEach((p, i) => { counts.value[i] = p.value })
    return
  }
  items.value.forEach((p, i) => {
    const start = performance.now()
    const dur = 1600
    function tick(now) {
      const t = Math.min(1, (now - start) / dur)
      const eased = 1 - Math.pow(1 - t, 3)
      counts.value[i] = Math.round(p.value * eased)
      if (t < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  })
}

onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        e.target.classList.add("is-in")
        if (e.target.dataset.counter !== undefined) animate()
        observer.unobserve(e.target)
      }
    }
  }, { threshold: 0.2 })
  root.value.querySelectorAll("[data-reveal], [data-counter]").forEach((el) => observer.observe(el))
})
onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <section id="trust" ref="root"
           class="relative overflow-hidden bg-ink text-cream py-[clamp(5rem,10vw,8rem)]">
    <!-- Geometric pattern background -->
    <svg class="absolute inset-0 pointer-events-none opacity-[0.07] w-full h-full"
         viewBox="0 0 1400 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <pattern id="star8" width="160" height="160" patternUnits="userSpaceOnUse">
          <g transform="translate(80 80)" stroke="#e6d49e" stroke-width="0.8" fill="none">
            <rect x="-50" y="-50" width="100" height="100" />
            <rect x="-50" y="-50" width="100" height="100" transform="rotate(45)" />
            <circle r="50" />
          </g>
        </pattern>
      </defs>
      <rect width="1400" height="600" fill="url(#star8)" />
    </svg>

    <div class="relative max-w-7xl mx-auto px-[clamp(1.25rem,4vw,4.5rem)]" data-reveal data-counter>
      <div class="text-center mb-16">
        <span class="eyebrow !text-brass">{{ t("pillars.eyebrow") }}</span>
        <h2 class="font-display font-light text-cream mt-2.5 mx-auto max-w-[22ch]
                   text-[clamp(2rem,4.5vw,3.4rem)] leading-[1.08] tracking-[-0.03em]">
          {{ t("pillars.title1") }} <em class="font-display-italic text-brass-glow">{{ t("pillars.title2") }}</em>{{ t("pillars.title3") }}
        </h2>
      </div>

      <div class="grid grid-cols-2 lg:grid-cols-4 border-y border-line-cream">
        <div v-for="(p, i) in items" :key="i"
             class="px-6 py-10 border-line-cream
                    lg:border-r last:border-r-0
                    max-lg:[&:nth-child(odd)]:border-r max-lg:[&:nth-child(-n+2)]:border-b">
          <div class="font-mono text-[0.7rem] tracking-[0.22em] text-brass">№ {{ p.index }}</div>
          <div class="font-display font-light text-brass-glow tabular
                      text-[clamp(2.6rem,5vw,4.2rem)] leading-none tracking-[-0.04em] my-6">
            <span>{{ p.value >= 1000 ? fmt(counts[i]) : counts[i] }}</span>
            <small class="font-display-italic text-brass text-[0.42em] ml-[0.2em] font-normal">{{ p.suffix }}</small>
          </div>
          <div class="text-[0.98rem] leading-[1.5] text-cream/78">{{ p.label }}</div>
        </div>
      </div>
    </div>
  </section>
</template>
