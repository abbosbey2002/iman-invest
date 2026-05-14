<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from "vue"
import { useI18n } from "../i18n"
import LangSwitcher from "./LangSwitcher.vue"

const { t } = useI18n()
const open = ref(false)
const scrolled = ref(false)

function toggleMenu() { open.value = !open.value }
function closeMenu() { open.value = false }

function onScroll() { scrolled.value = window.scrollY > 8 }
function onKey(e) { if (e.key === "Escape") closeMenu() }

watch(open, (v) => { document.body.style.overflow = v ? "hidden" : "" })

onMounted(() => {
  onScroll()
  window.addEventListener("scroll", onScroll, { passive: true })
  document.addEventListener("keydown", onKey)
})
onBeforeUnmount(() => {
  window.removeEventListener("scroll", onScroll)
  document.removeEventListener("keydown", onKey)
  document.body.style.overflow = ""
})
</script>

<template>
  <header
    class="sticky top-0 z-80 transition-colors duration-300"
    :class="scrolled ? 'border-b border-line-soft' : 'border-b border-transparent'"
  >
    <div
      class="backdrop-blur-xl backdrop-saturate-150 transition-colors duration-300"
      :class="scrolled ? 'bg-cream/95' : 'bg-cream/85'"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-[clamp(1.25rem,4vw,4.5rem)] py-2.5 flex items-center gap-3 lg:gap-6">
        <a href="#top" @click="closeMenu" aria-label="IMAN Invest"
           class="inline-flex items-center no-underline shrink-0">
          <img src="/iman-logo.png" alt="IMAN Invest"
               class="h-7 sm:h-8 w-auto object-contain" />
        </a>

        <nav aria-label="Primary" class="hidden lg:flex flex-1 justify-center">
          <ul class="flex gap-0 m-0 p-0 list-none">
            <li><a href="#how" class="topnav-link">{{ t("nav.how") }}</a></li>
            <li><a href="#calc" class="topnav-link">{{ t("nav.calc") }}</a></li>
            <li><a href="#voices" class="topnav-link">{{ t("nav.voices") }}</a></li>
            <li><a href="#contact" class="topnav-link">{{ t("nav.contact") }}</a></li>
          </ul>
        </nav>

        <div class="flex items-center gap-1.5 sm:gap-2 shrink-0 ml-auto">
          <LangSwitcher />
          <a href="#contact" class="btn btn--sm hidden! sm:inline-flex!">
            <span>{{ t("nav.app") }}</span>
            <svg class="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7">
              <path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </a>

          <button
            class="burger lg:hidden shrink-0"
            :aria-expanded="open"
            :aria-label="t('nav.menu')"
            @click="toggleMenu"
            type="button"
          >
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile drawer -->
    <Transition name="drawer">
      <div v-if="open" class="fixed inset-0 z-100" role="dialog" aria-modal="true">
        <div class="drawer-backdrop absolute inset-0 bg-ink/45" @click="closeMenu"></div>
        <div class="drawer-panel absolute top-0 right-0 bottom-0 w-[min(420px,92vw)] bg-cream flex flex-col px-6 pt-5 pb-8 shadow-[-30px_0_80px_-20px_rgba(10,44,40,0.35)]">
          <div class="flex items-center justify-between pb-4 border-b border-line mb-6">
            <img src="/iman-logo.png" alt="IMAN Invest" class="h-7 w-auto object-contain" />
            <button :aria-label="t('nav.close')" @click="closeMenu" type="button"
                    class="w-11 h-11 rounded-full border border-line bg-transparent grid place-items-center text-ink hover:bg-paper transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                <path d="M6 6l12 12M18 6l-12 12" stroke-linecap="round" />
              </svg>
            </button>
          </div>

          <nav class="flex flex-col gap-1 flex-1">
            <a v-for="(item, i) in [
              { href: '#how', label: t('nav.how') },
              { href: '#trust', label: t('nav.halal') },
              { href: '#calc', label: t('nav.calc') },
              { href: '#voices', label: t('nav.voices') },
              { href: '#contact', label: t('nav.contact') },
            ]" :key="i" :href="item.href" @click="closeMenu"
               class="grid grid-cols-[40px_1fr] items-center py-4 font-display font-light text-[1.7rem] tracking-[-0.02em] text-ink border-b border-line-soft transition-[padding-left] duration-300 hover:pl-2">
              <span class="font-mono text-[0.65rem] tracking-[0.18em] text-brass-deep">{{ String(i + 1).padStart(2, '0') }}</span>
              <span>{{ item.label }}</span>
            </a>
          </nav>

          <div class="mt-6">
            <LangSwitcher />
          </div>

          <a href="#contact" class="btn btn--brass justify-center w-full mt-4" @click="closeMenu">
            {{ t("nav.app") }}
            <svg class="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7">
              <path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </a>

          <div class="mt-5 flex flex-wrap gap-2 font-mono text-[0.72rem] tracking-[0.12em] text-ash-strong uppercase">
            <span>+998 (78) 113-00-30</span>
            <span aria-hidden="true">·</span>
            <span>09:00 – 18:00</span>
          </div>
        </div>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.topnav-link {
  position: relative;
  display: inline-block;
  padding: 0.6rem 0.95rem;
  font-size: 0.92rem;
  color: var(--color-ink-soft);
  font-weight: 450;
  transition: color 0.2s var(--ease-flow);
}
.topnav-link::after {
  content: "";
  position: absolute;
  left: 0.95rem; right: 0.95rem;
  bottom: 0.35rem;
  height: 1px;
  background: var(--color-brass-deep);
  transform: scaleX(0);
  transform-origin: center;
  transition: transform 0.35s var(--ease-flow);
}
.topnav-link:hover { color: var(--color-ink); }
.topnav-link:hover::after { transform: scaleX(1); }

.burger {
  width: 40px; height: 40px;
  border: 1px solid var(--color-line);
  background: transparent;
  border-radius: 9999px;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.burger span {
  position: absolute;
  width: 16px;
  height: 1.4px;
  background: var(--color-ink);
  border-radius: 9999px;
  transition: transform 0.3s var(--ease-flow), opacity 0.2s var(--ease-flow), top 0.3s var(--ease-flow);
}
.burger span:nth-child(1) { top: 14px; }
.burger span:nth-child(2) { bottom: 14px; }
.burger[aria-expanded="true"] span:nth-child(1) { top: 50%; transform: translateY(-50%) rotate(45deg); }
.burger[aria-expanded="true"] span:nth-child(2) { bottom: auto; top: 50%; transform: translateY(-50%) rotate(-45deg); }

.drawer-backdrop {
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}
.drawer-enter-from, .drawer-leave-to { opacity: 0; }
.drawer-enter-from .drawer-panel,
.drawer-leave-to .drawer-panel { transform: translateX(100%); }
.drawer-enter-active, .drawer-leave-active { transition: opacity 0.3s var(--ease-flow); }
.drawer-enter-active .drawer-panel,
.drawer-leave-active .drawer-panel { transition: transform 0.4s var(--ease-flow); }
</style>
