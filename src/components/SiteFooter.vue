<script setup>
import { useI18n } from "../i18n"

const { t, setLocale, locale, locales } = useI18n()
const NAMES = { uz: "O‘zbek", ru: "Русский", en: "English" }
</script>

<template>
  <footer class="bg-ink-deep text-cream py-[clamp(3rem,6vw,5rem)] px-[clamp(1.25rem,4vw,4.5rem)] pb-8">
    <div class="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] gap-12 pb-12 border-b border-line-cream">
      <div>
        <a href="#top" class="inline-flex items-center no-underline">
          <img src="/iman-logo.png" alt="IMAN Invest"
               class="h-9 w-auto object-contain brightness-0 invert opacity-90" />
        </a>
        <p class="mt-5 font-display italic text-[1.05rem] text-cream/72 max-w-[28ch] leading-normal">{{ t("footer.motto") }}</p>
      </div>

      <div>
        <h5 class="font-mono text-[0.7rem] tracking-[0.2em] uppercase text-brass m-0 mb-4 font-medium">{{ t("footer.pages") }}</h5>
        <ul class="list-none p-0 m-0 grid gap-3.5">
          <li><a href="#how" class="text-cream/75 text-[0.96rem] hover:text-brass-glow transition-colors">{{ t("nav.how") }}</a></li>
          <li><a href="#trust" class="text-cream/75 text-[0.96rem] hover:text-brass-glow transition-colors">{{ t("nav.halal") }}</a></li>
          <li><a href="#calc" class="text-cream/75 text-[0.96rem] hover:text-brass-glow transition-colors">{{ t("nav.calc") }}</a></li>
          <li><a href="#voices" class="text-cream/75 text-[0.96rem] hover:text-brass-glow transition-colors">{{ t("nav.voices") }}</a></li>
        </ul>
      </div>

      <div>
        <h5 class="font-mono text-[0.7rem] tracking-[0.2em] uppercase text-brass m-0 mb-4 font-medium">{{ t("footer.contact") }}</h5>
        <ul class="list-none p-0 m-0 grid gap-3.5 text-[0.96rem] text-cream/75">
          <li><span class="block font-mono text-[0.7rem] tracking-[0.14em] uppercase text-cream/45">{{ t("contact.operator") }}</span>+998 (78) 113-00-30</li>
          <li><span class="block font-mono text-[0.7rem] tracking-[0.14em] uppercase text-cream/45">{{ t("contact.chat") }}</span>t.me/imaninvest_bot</li>
          <li><span class="block font-mono text-[0.7rem] tracking-[0.14em] uppercase text-cream/45">{{ t("contact.hours") }}</span>09:00 – 18:00</li>
        </ul>
      </div>

      <div>
        <h5 class="font-mono text-[0.7rem] tracking-[0.2em] uppercase text-brass m-0 mb-4 font-medium">{{ t("footer.lang") }}</h5>
        <ul class="list-none p-0 m-0 grid gap-3.5">
          <li v-for="code in locales" :key="code">
            <button type="button" @click="setLocale(code)"
                    class="border-0 bg-transparent p-0 font-sans text-[0.96rem] text-left transition-colors"
                    :class="code === locale ? 'text-brass-glow' : 'text-cream/75 hover:text-brass-glow'">
              {{ NAMES[code] }}
            </button>
          </li>
        </ul>
      </div>
    </div>

    <div class="max-w-7xl mx-auto pt-6 flex justify-between items-center gap-4 flex-wrap font-mono text-[0.72rem] tracking-[0.12em] text-cream/50 uppercase">
      <span>© IMAN Invest. 2025 · {{ t("footer.rights") }}</span>
      <div class="flex gap-2.5">
        <a v-for="(svg, key) in {
          telegram: 'M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z',
          youtube: 'M21.6 7.2c-.2-1.4-1.3-2.4-2.7-2.6C16.5 4.2 12 4.2 12 4.2s-4.5 0-6.9.4c-1.4.2-2.5 1.2-2.7 2.6C2 9.6 2 12 2 12s0 2.4.4 4.8c.2 1.4 1.3 2.4 2.7 2.6 2.4.4 6.9.4 6.9.4s4.5 0 6.9-.4c1.4-.2 2.5-1.2 2.7-2.6.4-2.4.4-4.8.4-4.8s0-2.4-.4-4.8zM10 15.5v-7l6 3.5-6 3.5z',
        }" :key="key" href="#" :aria-label="key"
          class="w-10 h-10 grid place-items-center rounded-full border border-cream/18 transition-all duration-200 hover:bg-brass hover:border-brass hover:text-ink">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path :d="svg" /></svg>
        </a>
        <a href="#" aria-label="instagram"
           class="w-10 h-10 grid place-items-center rounded-full border border-cream/18 transition-all duration-200 hover:bg-brass hover:border-brass hover:text-ink">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
            <rect x="3" y="3" width="18" height="18" rx="5"/>
            <circle cx="12" cy="12" r="4"/>
            <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor"/>
          </svg>
        </a>
      </div>
    </div>
  </footer>
</template>
