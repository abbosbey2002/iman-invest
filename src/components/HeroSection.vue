<script setup>
import { ref, onMounted } from "vue"
import { useI18n } from "../i18n"

const { t } = useI18n()
const counter = ref(0)
let animated = false

function animateNumber() {
  if (animated) return
  animated = true
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) { counter.value = 27; return }
  const start = performance.now()
  const dur = 1400
  function tick(now) {
    const p = Math.min(1, (now - start) / dur)
    const eased = 1 - Math.pow(1 - p, 3)
    counter.value = Math.round(27 * eased)
    if (p < 1) requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)
}

onMounted(() => { setTimeout(animateNumber, 350) })
</script>

<template>
  <section id="top" class="relative overflow-hidden bg-cream px-[clamp(1.25rem,4vw,4.5rem)] pt-[clamp(2rem,4vw,3.5rem)] pb-[clamp(2.5rem,5vw,4rem)]">
    <!-- Background atmosphere -->
    <div class="absolute -right-[180px] -top-[40px] w-[480px] h-[480px] pointer-events-none
                bg-[radial-gradient(circle_at_50%_50%,rgba(201,168,106,0.11),transparent_65%)]"></div>

    <div class="relative max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[1.15fr_0.95fr] gap-[clamp(2rem,5vw,4.5rem)] items-stretch md:items-center">
      <!-- Left column -->
      <div class="py-2 md:py-4" data-reveal>
        <span class="eyebrow inline-block mb-6 pb-2 border-b border-line">{{ t("hero.eyebrow2") }}</span>

        <h1 class="font-display-soft font-light text-ink m-0
                   text-[clamp(2.4rem,5.6vw,4.6rem)] leading-none tracking-[-0.035em]">
          <span class="anim-word anim-word-1">{{ t("hero.title1") }}</span>
          <em class="anim-word anim-word-2 font-display-italic text-brass-deep not-italic" style="font-style: italic;">{{ t("hero.title2") }}</em>
          <span class="anim-word anim-word-3">{{ t("hero.title3") }}</span>
        </h1>

        <p class="my-5 max-w-[40ch] text-[1.05rem] leading-[1.55] text-ink-body">
          <b class="block mb-1 text-ink font-medium">{{ t("hero.lead2") }}</b>
          {{ t("hero.lead3") }}
        </p>

        <div class="flex gap-2.5 flex-wrap items-center">
          <a href="#calc" class="btn">
            {{ t("hero.ctaCalc") }}
            <svg class="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7">
              <path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </a>
          <a href="#how" class="btn btn--ghost">{{ t("hero.ctaHow") }}</a>
        </div>
      </div>

      <!-- Showpiece -->
      <aside class="relative aspect-square max-w-[460px] w-full ml-auto p-[1.6rem]
                    rounded-[var(--radius-lg)] overflow-hidden text-cream
                    grid grid-rows-[auto_1fr_auto] gap-2.5
                    bg-[radial-gradient(120%_80%_at_80%_10%,#19443e_0%,#0a2c28_55%,#051917_100%)]
                    shadow-[0_50px_80px_-40px_rgba(10,44,40,0.55),inset_0_0_0_1px_rgba(243,236,223,0.08)]
                    max-md:aspect-[5/4] max-md:max-w-none max-md:ml-0"
             data-reveal>
        <!-- Ornament -->
        <svg class="absolute inset-0 pointer-events-none opacity-50 anim-draw"
             viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <linearGradient id="brassG" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0" stop-color="#e6d49e" stop-opacity="0.55" />
              <stop offset="1" stop-color="#c9a86a" stop-opacity="0.1" />
            </linearGradient>
          </defs>
          <g stroke="url(#brassG)" stroke-width="1" fill="none">
            <g transform="translate(200 200)">
              <rect x="-150" y="-150" width="300" height="300" />
              <rect x="-150" y="-150" width="300" height="300" transform="rotate(45)" />
              <circle r="160" />
              <circle r="80" />
              <line x1="-150" y1="0" x2="150" y2="0" />
              <line x1="0" y1="-150" x2="0" y2="150" />
              <line x1="-106" y1="-106" x2="106" y2="106" />
              <line x1="-106" y1="106" x2="106" y2="-106" />
            </g>
          </g>
        </svg>

        <div class="relative z-10 flex justify-between items-center gap-4">
          <span class="font-mono text-[0.68rem] tracking-[0.18em] uppercase text-brass-glow">{{ t("hero.showpieceCorner") }}</span>
          <span class="font-mono text-[0.68rem] tracking-[0.18em] uppercase text-brass inline-flex items-center gap-1.5">
            <span class="w-[5px] h-[5px] rounded-full bg-brass shadow-[0_0_0_3px_rgba(201,168,106,0.22)]"></span>
            {{ t("hero.note") }}
          </span>
        </div>

        <div class="relative z-10 tabular flex items-center justify-center
                    font-display font-light text-brass-glow leading-[0.85] tracking-[-0.06em]
                    text-[clamp(6rem,16vw,12rem)] max-md:text-[clamp(5rem,22vw,8rem)]"
             style="font-variation-settings: 'opsz' 144, 'SOFT' 30, 'WONK' 1;">
          <span>{{ counter }}</span><span class="text-[0.45em] self-start text-brass font-display-italic ml-[0.05em] mt-[0.15em]">%</span>
        </div>

        <div class="relative z-10 flex justify-between gap-4 items-end">
          <p class="font-display-italic text-[1rem] leading-[1.3] text-cream max-w-[18ch] m-0">{{ t("hero.showpieceCaption") }}</p>
          <small class="font-mono text-[0.62rem] tracking-[0.18em] uppercase text-brass text-right shrink-0">{{ t("hero.showpieceSub") }}</small>
        </div>
      </aside>
    </div>
  </section>
</template>
