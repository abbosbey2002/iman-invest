<script setup>
import { ref, computed } from "vue"
import { useI18n } from "../i18n"

const { t, dict, fmt } = useI18n()

const principal = ref(50_000_000)
const monthly = ref(2_000_000)
const term = ref(18)
const yieldRate = 22
const withdrawMonthly = ref(false)

const principalMin = 1_000_000
const principalMax = 1_000_000_000
const monthlyMin = 0
const monthlyMax = 50_000_000
const termOptions = [12, 18, 24, 36]

const breakdown = computed(() => {
  const P = Number(principal.value) || 0
  const M = Number(monthly.value) || 0
  const T = Number(term.value) || 1
  const r = yieldRate / 100 / 12
  const fvP = P * Math.pow(1 + r, T)
  const fvM = M > 0 ? M * ((Math.pow(1 + r, T) - 1) / r) : 0
  const invested = P + M * T
  const total = withdrawMonthly.value
    ? invested + (P * r * T + (M * r * (T * (T - 1) / 2)))
    : fvP + fvM
  const profit = total - invested
  return {
    total: Math.round(total),
    profit: Math.round(profit),
    invested: Math.round(invested),
    monthlyIncome: Math.round((profit / T) || 0),
  }
})

function rangePercent(value, min, max) { return ((value - min) / (max - min)) * 100 }
function sliderBg(v, min, max) {
  const pct = rangePercent(v, min, max)
  return `linear-gradient(to right, var(--color-ink) 0%, var(--color-ink) ${pct}%, var(--color-line) ${pct}%, var(--color-line) 100%)`
}
const principalBg = computed(() => sliderBg(principal.value, principalMin, principalMax))
const monthlyBg = computed(() => sliderBg(monthly.value, monthlyMin, monthlyMax))
</script>

<template>
  <section id="calc" class="bg-cream py-[clamp(4.5rem,9vw,7.5rem)] px-[clamp(1.25rem,4vw,4.5rem)]">
    <div class="max-w-7xl mx-auto">
      <!-- Heading -->
      <div class="flex justify-between items-end gap-8 mb-12 flex-wrap" data-reveal>
        <div>
          <span class="eyebrow">{{ t("calc.eyebrow") }}</span>
          <h2 class="font-display font-light m-0 mt-2.5 max-w-[18ch]
                     text-[clamp(2rem,4.5vw,3.4rem)] leading-[1.04] tracking-[-0.03em]">
            {{ t("calc.title1") }} <em class="font-display-italic text-brass-deep">{{ t("calc.title2") }}</em> {{ t("calc.title3") }}
          </h2>
        </div>
        <p class="text-ink-body max-w-[42ch] text-[1.02rem] leading-[1.6] m-0">{{ t("calc.intro") }}</p>
      </div>

      <!-- Shell -->
      <div class="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-5" data-reveal>
        <!-- Inputs -->
        <div class="bg-paper border border-line rounded-[var(--radius-lg)] p-[clamp(1.5rem,3vw,2.6rem)]">
          <!-- Initial -->
          <div class="mb-7 relative">
            <div class="flex justify-between items-baseline gap-4 mb-3 text-[0.96rem] text-ink flex-wrap">
              <span>{{ t("calc.initial") }}</span>
              <span class="font-display text-[1.45rem] text-ink tabular tracking-[-0.01em]">
                {{ fmt(principal) }} <small class="font-mono text-[0.65rem] tracking-[0.18em] text-ash-strong ml-1 uppercase">{{ t("calc.soum") }}</small>
              </span>
            </div>
            <input type="range" v-model.number="principal" :min="principalMin" :max="principalMax" step="500000"
                   :style="{ background: principalBg }" :aria-label="t('calc.initial')" />
            <div class="flex justify-between font-mono text-[0.7rem] tracking-[0.1em] text-ash-strong mt-2.5">
              <span>{{ fmt(principalMin) }}</span><span>{{ fmt(principalMax) }}</span>
            </div>
          </div>

          <!-- Monthly -->
          <div class="mb-7 relative">
            <div class="flex justify-between items-baseline gap-4 mb-3 text-[0.96rem] text-ink flex-wrap">
              <span>{{ t("calc.monthly") }}</span>
              <span class="font-display text-[1.45rem] text-ink tabular tracking-[-0.01em]">
                {{ fmt(monthly) }} <small class="font-mono text-[0.65rem] tracking-[0.18em] text-ash-strong ml-1 uppercase">{{ t("calc.soum") }}</small>
              </span>
            </div>
            <input type="range" v-model.number="monthly" :min="monthlyMin" :max="monthlyMax" step="100000"
                   :style="{ background: monthlyBg }" :aria-label="t('calc.monthly')" />
            <div class="flex justify-between font-mono text-[0.7rem] tracking-[0.1em] text-ash-strong mt-2.5">
              <span>{{ fmt(monthlyMin) }}</span><span>{{ fmt(monthlyMax) }}</span>
            </div>
          </div>

          <!-- Term -->
          <div class="mb-7">
            <div class="flex justify-between items-baseline gap-4 mb-3 text-[0.96rem] text-ink flex-wrap">
              <span>{{ t("calc.term") }}</span>
              <span class="font-display text-[1.45rem] text-ink">{{ term }}</span>
            </div>
            <div class="flex gap-2 flex-wrap">
              <button v-for="n in termOptions" :key="n" type="button"
                      :data-active="term === n" @click="term = n"
                      class="chip flex-1 min-w-[80px] px-4 py-2.5 border border-line bg-transparent rounded-full
                             font-mono text-[0.78rem] tracking-[0.06em] text-ink transition-all duration-200
                             hover:border-ink"
                      :class="term === n ? '!bg-ink !text-cream !border-ink' : ''">
                {{ dict.calc.months[n] }}
              </button>
            </div>
          </div>

          <!-- Withdraw toggle -->
          <div>
            <div class="flex justify-between items-baseline gap-4 text-[0.96rem] text-ink flex-wrap">
              <span>{{ t("calc.withdraw") }}</span>
              <span class="inline-flex border border-line rounded-full p-1 gap-1">
                <button type="button" @click="withdrawMonthly = true"
                        :data-active="withdrawMonthly"
                        class="border-0 bg-transparent px-4 py-2 rounded-full font-mono text-[0.78rem] tracking-[0.06em] text-ash-strong transition-all duration-200"
                        :class="withdrawMonthly ? '!bg-ink !text-cream' : ''">{{ t("calc.yes") }}</button>
                <button type="button" @click="withdrawMonthly = false"
                        :data-active="!withdrawMonthly"
                        class="border-0 bg-transparent px-4 py-2 rounded-full font-mono text-[0.78rem] tracking-[0.06em] text-ash-strong transition-all duration-200"
                        :class="!withdrawMonthly ? '!bg-ink !text-cream' : ''">{{ t("calc.no") }}</button>
              </span>
            </div>
          </div>
        </div>

        <!-- Result -->
        <div class="relative overflow-hidden bg-ink text-cream border border-ink rounded-[var(--radius-lg)] p-[clamp(1.5rem,3vw,2.6rem)] flex flex-col justify-between">
          <div class="absolute inset-0 pointer-events-none bg-[radial-gradient(120%_60%_at_100%_0%,rgba(201,168,106,0.16),transparent_55%)]"></div>

          <div class="relative z-10">
            <div class="font-mono text-[0.7rem] tracking-[0.18em] uppercase text-brass mb-2.5">{{ t("calc.result") }} · {{ term }} {{ t("calc.after") }}</div>
            <p class="font-display font-light text-brass-glow m-0 tabular flex items-baseline gap-2 flex-wrap
                      text-[clamp(2.8rem,6.5vw,5.6rem)] leading-none tracking-[-0.035em]">
              <Transition name="num" mode="out-in">
                <span :key="breakdown.total">{{ fmt(breakdown.total) }}</span>
              </Transition>
              <small class="font-display-italic text-brass text-[0.32em] font-normal">{{ t("calc.soum") }}</small>
            </p>
          </div>

          <ul class="relative z-10 list-none m-0 mt-6 pt-6 border-t border-[rgba(243,236,223,0.16)] grid gap-3.5">
            <li class="flex justify-between text-[0.96rem] text-cream/70 gap-4">
              <span>{{ t("calc.rate") }}</span>
              <b class="font-mono font-medium text-cream tabular">{{ yieldRate }} %</b>
            </li>
            <li class="flex justify-between text-[0.96rem] text-cream/70 gap-4">
              <span>{{ t("calc.invested") }}</span>
              <b class="font-mono font-medium text-cream tabular text-right">{{ fmt(breakdown.invested) }} {{ t("calc.soum") }}</b>
            </li>
            <li class="flex justify-between text-[0.96rem] text-cream/70 gap-4">
              <span>{{ t("calc.monthlyProfit") }}</span>
              <b class="font-mono font-medium text-cream tabular text-right">{{ fmt(breakdown.monthlyIncome) }} {{ t("calc.soum") }}</b>
            </li>
          </ul>

          <a href="#contact" class="relative z-10 btn btn--brass mt-7">
            {{ t("calc.cta") }}
            <svg class="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7">
              <path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.num-enter-from { opacity: 0; transform: translateY(8px); }
.num-leave-to { opacity: 0; transform: translateY(-8px); }
.num-enter-active, .num-leave-active {
  transition: opacity 0.25s var(--ease-flow), transform 0.25s var(--ease-flow);
  display: inline-block;
}
</style>
