<script setup>
import { computed } from "vue"
import { useI18n } from "../i18n"

const { t, dict } = useI18n()
const steps = computed(() => dict.value.how.steps)
const highlights = computed(() => dict.value.how.highlight)
const numerals = ["i.", "ii.", "iii.", "iv.", "v."]
</script>

<template>
  <section id="how" class="relative bg-paper py-[clamp(4.5rem,9vw,7.5rem)] px-[clamp(1.25rem,4vw,4.5rem)]">
    <div class="relative max-w-7xl mx-auto">
      <!-- Heading -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-end mb-12 lg:mb-18" data-reveal>
        <div>
          <span class="eyebrow">{{ t("how.eyebrow") }}</span>
          <h2 class="font-display font-light text-ink m-0 mt-2.5
                     text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.02] tracking-[-0.03em]">
            {{ t("how.title1") }} <em class="font-display-italic text-brass-deep">{{ t("how.title2") }}</em>{{ t("how.title3") }}
          </h2>
        </div>
        <p class="m-0 text-[1.04rem] leading-[1.65] text-ink-body max-w-[46ch]">
          {{ t("how.intro") }}
        </p>
      </div>

      <!-- Steps -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 border-t border-line" data-reveal-stagger>
        <article v-for="(s, i) in steps" :key="i"
                 class="step-cell px-6 py-6 pb-8 border-line transition-colors duration-300 hover:bg-cream-2
                        lg:border-r last:border-r-0
                        max-lg:border-b">
          <span class="font-display-italic text-brass-deep text-[3rem] leading-none inline-block">{{ numerals[i] }}</span>
          <h3 class="font-display font-normal text-ink mt-8 mb-3 text-[1.28rem] leading-[1.22] tracking-[-0.01em]">{{ s.title }}</h3>
          <p class="m-0 text-[0.98rem] leading-[1.6] text-ink-body">{{ s.body }}</p>
        </article>
      </div>

      <!-- Highlight strip -->
      <div class="relative mt-14 bg-ink text-cream rounded-[var(--radius-lg)] grid grid-cols-1 md:grid-cols-3 overflow-hidden" data-reveal>
        <div class="absolute inset-0 pointer-events-none bg-[radial-gradient(120%_80%_at_0%_0%,rgba(201,168,106,0.18),transparent_55%)]"></div>
        <div v-for="(h, i) in highlights" :key="i"
             class="relative z-10 p-8 border-line-cream
                    md:border-r md:last:border-r-0
                    max-md:border-b max-md:last:border-b-0">
          <div class="font-display font-light text-brass-glow text-[clamp(1.8rem,4vw,2.8rem)] leading-none tracking-[-0.03em]">
            {{ h.num }}<small v-if="h.suffix" class="font-display-italic text-brass text-[0.45em] ml-[0.15em] font-normal">{{ h.suffix }}</small>
          </div>
          <div class="mt-2.5 text-[0.98rem] leading-[1.5] text-cream/80">{{ h.label }}</div>
        </div>
      </div>
    </div>
  </section>
</template>
