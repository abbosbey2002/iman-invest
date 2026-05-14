<script setup>
import { ref } from "vue"
import { useI18n } from "../i18n"

const { t, dict } = useI18n()

const name = ref("")
const phone = ref("")
const channel = ref(dict.value.contact.channels[0])
const submitted = ref(false)

function maskPhone(v) {
  const d = v.replace(/\D/g, "").replace(/^998/, "")
  const chunks = [d.slice(0, 2), d.slice(2, 5), d.slice(5, 7), d.slice(7, 9)].filter(Boolean)
  return "+998 " + chunks.join(" ")
}
function onPhone(e) { phone.value = maskPhone(e.target.value) }

function onSubmit() {
  if (!name.value.trim() || phone.value.replace(/\D/g, "").length < 12) return
  submitted.value = true
  setTimeout(() => { submitted.value = false }, 4000)
}
</script>

<template>
  <section id="contact" class="relative overflow-hidden bg-ink text-cream py-[clamp(4.5rem,9vw,7.5rem)] px-[clamp(1.25rem,4vw,4.5rem)]">
    <!-- Brass glow corner -->
    <div class="absolute -right-[200px] -bottom-[200px] w-[600px] h-[600px] pointer-events-none
                bg-[radial-gradient(circle,rgba(201,168,106,0.18),transparent_60%)]"></div>

    <div class="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
      <div data-reveal>
        <span class="eyebrow !text-brass">{{ t("contact.eyebrow") }}</span>
        <h2 class="font-display font-light text-cream m-0 mt-2.5 mb-4
                   text-[clamp(2.2rem,5.5vw,4.2rem)] leading-[1.02] tracking-[-0.03em]">
          {{ t("contact.title1") }} <em class="font-display-italic text-brass-glow">{{ t("contact.title2") }}</em> {{ t("contact.title3") }}
        </h2>
        <p class="text-cream/78 max-w-[40ch] m-0 text-[1.08rem] leading-[1.65]">{{ t("contact.lead") }}</p>

        <div class="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-5 border-t border-line-cream pt-6">
          <div>
            <span class="block font-mono text-[0.7rem] tracking-[0.18em] text-brass uppercase mb-1.5">{{ t("contact.operator") }}</span>
            <b class="font-display font-normal text-[1.05rem] text-cream">
              <a href="tel:+998781130030" class="hover:text-brass-glow transition-colors">+998 (78) 113-00-30</a>
            </b>
          </div>
          <div>
            <span class="block font-mono text-[0.7rem] tracking-[0.18em] text-brass uppercase mb-1.5">{{ t("contact.chat") }}</span>
            <b class="font-display font-normal text-[1.05rem] text-cream">
              <a href="https://t.me/imaninvest_bot" target="_blank" rel="noopener" class="hover:text-brass-glow transition-colors">t.me/imaninvest_bot</a>
            </b>
          </div>
          <div>
            <span class="block font-mono text-[0.7rem] tracking-[0.18em] text-brass uppercase mb-1.5">{{ t("contact.hours") }}</span>
            <b class="font-display font-normal text-[1.05rem] text-cream">09:00 – 18:00</b>
          </div>
          <div>
            <span class="block font-mono text-[0.7rem] tracking-[0.18em] text-brass uppercase mb-1.5">{{ t("contact.region") }}</span>
            <b class="font-display font-normal text-[1.05rem] text-cream">{{ t("contact.regionValue") }}</b>
          </div>
        </div>
      </div>

      <form class="relative bg-cream/5 border border-cream/12 rounded-[var(--radius-lg)] p-[clamp(1.5rem,3vw,2.5rem)] grid gap-5 backdrop-blur-sm"
            data-reveal @submit.prevent="onSubmit">
        <div class="relative">
          <label for="cf-name" class="block font-mono text-[0.7rem] tracking-[0.18em] text-brass uppercase mb-2">{{ t("contact.name") }}</label>
          <input id="cf-name" type="text" v-model="name" :placeholder="t('contact.namePlaceholder')" autocomplete="name"
                 class="field-input" />
        </div>
        <div class="relative">
          <label for="cf-phone" class="block font-mono text-[0.7rem] tracking-[0.18em] text-brass uppercase mb-2">{{ t("contact.phone") }}</label>
          <input id="cf-phone" type="tel" :value="phone" @input="onPhone" :placeholder="t('contact.phonePlaceholder')"
                 autocomplete="tel" inputmode="tel" class="field-input" />
        </div>
        <div class="relative">
          <label for="cf-channel" class="block font-mono text-[0.7rem] tracking-[0.18em] text-brass uppercase mb-2">{{ t("contact.channel") }}</label>
          <select id="cf-channel" v-model="channel" class="field-input select-brass">
            <option v-for="c in dict.contact.channels" :key="c">{{ c }}</option>
          </select>
        </div>
        <button type="submit" class="btn btn--brass justify-center mt-1">
          <span v-if="!submitted">{{ t("contact.submit") }}</span>
          <span v-else>✓</span>
          <svg v-if="!submitted" class="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7">
            <path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
        <p class="m-0 font-mono text-[0.7rem] tracking-[0.12em] text-cream/50 text-center uppercase">{{ t("contact.privacy") }}</p>
      </form>
    </div>
  </section>
</template>

<style scoped>
.field-input {
  width: 100%;
  background: transparent;
  border: 0;
  border-bottom: 1px solid rgba(243, 236, 223, 0.25);
  padding: 0.65rem 0;
  color: var(--color-cream);
  font-family: var(--font-display);
  font-weight: 400;
  font-size: 1.22rem;
  letter-spacing: -0.005em;
  outline: none;
  transition: border-color 0.25s var(--ease-flow);
}
.field-input::placeholder { color: rgba(243, 236, 223, 0.35); }
.field-input:focus { border-color: var(--color-brass-glow); }
.field-input option { background: var(--color-ink); color: var(--color-cream); }
</style>
