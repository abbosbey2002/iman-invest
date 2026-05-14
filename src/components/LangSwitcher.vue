<script setup>
import { ref, onBeforeUnmount } from "vue"
import { useI18n } from "../i18n"

const { locale, setLocale, locales, t } = useI18n()
const open = ref(false)
const root = ref(null)

const FLAGS = { uz: "🇺🇿", ru: "🇷🇺", en: "🇺🇸" }

function toggle() { open.value = !open.value }
function choose(code) { setLocale(code); open.value = false }
function onDocClick(e) {
  if (!root.value) return
  if (!root.value.contains(e.target)) open.value = false
}
function onKey(e) { if (e.key === "Escape") open.value = false }

if (typeof window !== "undefined") {
  document.addEventListener("click", onDocClick)
  document.addEventListener("keydown", onKey)
  onBeforeUnmount(() => {
    document.removeEventListener("click", onDocClick)
    document.removeEventListener("keydown", onKey)
  })
}
</script>

<template>
  <div class="relative" ref="root" :data-open="open">
    <button
      :aria-expanded="open" :aria-haspopup="true" @click.stop="toggle" type="button"
      class="inline-flex items-center gap-1.5 border border-transparent bg-transparent px-2.5 py-1.5 rounded-full font-sans text-[0.85rem] text-ink transition-colors duration-200 hover:border-line hover:bg-paper/80"
      :class="{ 'border-line bg-paper': open }"
    >
      <span class="font-mono text-[0.74rem] tracking-[0.16em] font-medium text-ink-soft">{{ locale.toUpperCase() }}</span>
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.4"
           class="opacity-60 transition-transform duration-300"
           :class="{ 'rotate-180': open }">
        <path d="M2.5 4.5L6 8l3.5-3.5" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>

    <Transition name="lang-pop">
      <ul v-if="open" role="listbox"
          class="absolute top-[calc(100%+0.5rem)] right-0 bg-paper border border-line rounded-[14px] list-none m-0 p-1.5 min-w-[200px] shadow-[0_24px_50px_-20px_rgba(10,44,40,0.25)] z-[90]">
        <li v-for="code in locales" :key="code" class="block">
          <button
            type="button" :data-active="code === locale" role="option" :aria-selected="code === locale" @click="choose(code)"
            class="w-full flex items-center gap-2.5 px-3 py-2.5 border-0 bg-transparent rounded-lg font-sans text-[0.92rem] text-ink text-left transition-colors duration-200 hover:bg-cream-2"
            :class="{ 'bg-cream-3': code === locale }"
          >
            <span class="text-base leading-none">{{ FLAGS[code] }}</span>
            <span class="flex-1">{{ t(`locale.${code}`) }}</span>
            <span class="font-mono text-[0.65rem] tracking-[0.16em] text-ash-strong">{{ code.toUpperCase() }}</span>
            <span v-if="code === locale" class="w-[7px] h-[7px] rounded-full bg-brass-deep ml-1.5"></span>
          </button>
        </li>
      </ul>
    </Transition>
  </div>
</template>

<style scoped>
.lang-pop-enter-from, .lang-pop-leave-to {
  opacity: 0;
  transform: translateY(-8px) scale(0.96);
}
.lang-pop-enter-active, .lang-pop-leave-active {
  transition: opacity 0.18s var(--ease-flow), transform 0.22s var(--ease-flow);
}
</style>
