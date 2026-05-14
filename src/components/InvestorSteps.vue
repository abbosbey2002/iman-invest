<script setup>
import { computed } from "vue"
import { useI18n } from "../i18n"

const { t, dict } = useI18n()
const steps = computed(() => dict.value.invest.steps)

const sparkPath = (() => {
  const pts = Array.from({ length: 28 }, (_, i) => {
    const y = 60 - i * 1.6 - Math.sin(i * 0.55) * 6
    const x = (i / 27) * 240
    return `${x.toFixed(1)},${y.toFixed(1)}`
  })
  return "M" + pts.join(" L")
})()
const sparkArea = sparkPath + " L240,80 L0,80 Z"
</script>

<template>
  <section class="overflow-hidden bg-cream py-[clamp(4.5rem,9vw,7.5rem)] px-[clamp(1.25rem,4vw,4.5rem)]">
    <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-16 items-center">
      <!-- Left -->
      <div data-reveal>
        <span class="eyebrow">{{ t("invest.eyebrow") }}</span>
        <h2 class="font-display font-light m-0 mt-2.5 mb-4 max-w-[18ch]
                   text-[clamp(2rem,4.5vw,3.4rem)] leading-[1.04] tracking-[-0.03em]">
          {{ t("invest.title1") }} <em class="font-display-italic text-brass-deep">{{ t("invest.title2") }}</em>{{ t("invest.title3") }}
        </h2>
        <p class="m-0 text-[1.05rem] leading-[1.6] text-ink-body max-w-[46ch]">{{ t("invest.intro") }}</p>

        <ol class="list-none p-0 my-8" data-reveal-stagger>
          <li v-for="(s, i) in steps" :key="i"
              class="grid grid-cols-[64px_1fr] gap-6 items-start py-5 border-t border-line transition-[padding-left] duration-300 hover:pl-2 last:border-b last:border-line">
            <span class="font-display-italic text-brass-deep text-[1.6rem] leading-[1.2] tabular">{{ String(i + 1).padStart(2, "0") }}</span>
            <div>
              <h4 class="m-0 font-display font-normal text-ink text-[1.18rem] leading-[1.35] tracking-[-0.01em]">{{ s }}</h4>
            </div>
          </li>
        </ol>

        <a href="#contact" class="btn mt-2">
          {{ t("invest.cta") }}
          <svg class="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7">
            <path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </a>
      </div>

      <!-- Phone mockup -->
      <div data-reveal class="grid place-items-center">
        <div class="relative w-[330px] max-w-full aspect-[9/19] bg-[#0a0a0a] rounded-[44px] p-3
                    shadow-[0_50px_70px_-30px_rgba(10,44,40,0.45),0_0_0_2px_#1a1a1a,inset_0_0_0_1px_rgba(255,255,255,0.05)]
                    max-md:w-[280px]">
          <div class="absolute top-4 left-1/2 -translate-x-1/2 w-[92px] h-6 bg-[#0a0a0a] rounded-full z-[2]"></div>
          <div class="w-full h-full rounded-[32px] overflow-hidden flex flex-col p-8 pb-5 px-5 text-cream relative
                      bg-gradient-to-b from-[#0a2c28] to-[#051917]">
            <div class="flex justify-between font-mono text-[0.65rem] text-cream/70 px-1 pb-4">
              <span class="tabular">09:41</span>
              <span aria-hidden="true">● ● ● ●</span>
            </div>

            <div class="flex items-center justify-between">
              <div>
                <div class="font-mono text-[0.58rem] tracking-[0.18em] text-brass uppercase">{{ t("invest.appWelcome") }}</div>
                <div class="font-display text-[1.05rem] mt-1 text-cream">{{ t("invest.appGreetingName") }}</div>
              </div>
              <div class="w-[34px] h-[34px] rounded-full bg-brass grid place-items-center text-ink font-display font-medium">{{ t("invest.appGreetingName").charAt(0) }}</div>
            </div>

            <div class="bg-cream/5 border border-cream/10 rounded-2xl p-4 mt-4">
              <div class="font-mono text-[0.58rem] tracking-[0.18em] text-brass uppercase">{{ t("invest.appBalance") }}</div>
              <div class="font-display font-light text-[1.6rem] mt-1.5 mb-1.5 text-brass-glow tabular tracking-[-0.02em]">
                4 536 800 <small class="text-[0.55em] text-brass italic">{{ t("calc.soum") }}</small>
              </div>
              <div class="font-mono text-[0.7rem] text-brass">↑ {{ t("invest.appDelta") }}</div>

              <svg class="h-20 mt-4 w-full" viewBox="0 0 240 80" preserveAspectRatio="none" aria-hidden="true">
                <defs>
                  <linearGradient id="sparkG" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0" stop-color="#e6d49e" stop-opacity="0.5" />
                    <stop offset="1" stop-color="#e6d49e" stop-opacity="0" />
                  </linearGradient>
                </defs>
                <path :d="sparkArea" fill="url(#sparkG)" />
                <path :d="sparkPath" stroke="#e6d49e" stroke-width="1.6" fill="none" />
              </svg>
            </div>

            <div class="flex gap-2.5 mt-3">
              <div class="flex-1 bg-cream/5 rounded-xl p-3">
                <div class="font-mono text-[0.55rem] tracking-[0.16em] text-cream/60 uppercase mb-1">{{ t("invest.appProfit") }}</div>
                <div class="font-display text-[1.05rem] text-cream">+22 %</div>
              </div>
              <div class="flex-1 bg-cream/5 rounded-xl p-3">
                <div class="font-mono text-[0.55rem] tracking-[0.16em] text-cream/60 uppercase mb-1">{{ t("invest.appTenure") }}</div>
                <div class="font-display text-[1.05rem] text-cream">2.4</div>
              </div>
            </div>

            <div class="mt-auto py-3.5 px-4 bg-brass text-ink rounded-2xl text-center font-medium text-[0.88rem]">{{ t("invest.appCta") }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
