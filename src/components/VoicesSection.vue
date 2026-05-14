<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue"
import { useI18n } from "../i18n"

const { t, locale } = useI18n()

const voices = [
  { name: "Sardorbek", initials: "S", quote: "Iman ga Osmondagi bolalarda ko‘rganimdayoq juda hursand bo‘lganman va ilk sarmoyamni kiritganman. O‘shanda azgina ishonchsizlik ham bor edi menda. Qayta-qayta savollar berardim. Aniq eslayman, Islombek degan operatorlar hamma savollarimga erinmasdan hushmuomalik bilan javob berardi. Necha yillardan beri Iman ishonchni oqladi." },
  { name: "Omina", initials: "O", quote: "Ko‘p kompaniyalar oxirigacha bormasdan yopib qo‘yadi, @imaninvest esa aksincha — xalq uchun, elga, yurtga foyda bo‘lsin deb harakat qilayapti. Shularga o‘xshagan kompaniya tadbirkorlar ko‘paysa, xalq yanada farovonlashadi." },
  { name: "Sadullayev Nodirbek", initials: "N", quote: "3 yildan beri sherikman, bundan afsus qilmayman. Eng muhimi — foydasi halol; muzoraba sherikchilikda foydaga ham, zararga ham rozi bo‘lib qo‘yganman." },
  { name: "Temur Oxunov", initials: "T", quote: "Alloh bu loyihani butun dunyoga yoyilishini nasib etsin. Islom moliyasiga dunyo, ayniqsa musulmonlar eng ehtiyojli. Bizlar ham kengayishiga yordam beramiz in shaa Alloh." },
  { name: "Abdulazizxon", initials: "A", quote: "Foydali rolik bo‘libdi. Haqiqatan, farzand uchun dabdaba emas, oqilona sarmoya foyda keltiradi. Men ham Imanga boshlang‘ich 200$ bilan sarmoya kirtdim va farzandim voyaga yetguncha kiritib bormoqchiman." },
  { name: "Mirsoat", initials: "M", quote: "Assalomu alaykum, ishlaringizga omad. 9 oydan buyon sherikman — Imanda pul jamg‘arish menga yoqdi. Qadriyatlarimizga to‘g‘ri kelgani uchun hamda pul jamg‘arishni o‘rganish uchun Iman bilan birgaman." },
  { name: "Ilhomjon Raximo‘tkirov", initials: "I", quote: "Bu Websummit-da o‘z birodarlarimiz yuqori natijani qo‘lga kiritgani bizni benihoya mamnun qildi. Iman jamoasiga kuch-quvvat tilaymiz. IMAN qiymati yuqori mablag‘larni ham bemalol boshqara oladi degan yaxshi gumondamiz." },
]

const idx = ref(0)
const perView = ref(3)

function updatePerView() {
  const w = window.innerWidth
  perView.value = w < 720 ? 1 : w < 1100 ? 2 : 3
  const max = Math.max(0, voices.length - perView.value)
  if (idx.value > max) idx.value = max
}

function next() {
  const max = Math.max(0, voices.length - perView.value)
  idx.value = Math.min(idx.value + 1, max)
}
function prev() { idx.value = Math.max(idx.value - 1, 0) }

const trackStyle = computed(() => {
  const step = 100 / perView.value
  const gapsBefore = idx.value * 1.25
  return { transform: `translateX(calc(-${step * idx.value}% - ${gapsBefore}rem))` }
})

const dotsCount = computed(() => Math.max(1, voices.length - perView.value + 1))

onMounted(() => { updatePerView(); window.addEventListener("resize", updatePerView) })
onBeforeUnmount(() => window.removeEventListener("resize", updatePerView))
</script>

<template>
  <section id="voices" class="bg-paper py-[clamp(4.5rem,9vw,7.5rem)] pb-[clamp(5rem,9vw,7rem)] px-[clamp(1.25rem,4vw,4.5rem)]">
    <div class="max-w-7xl mx-auto">
      <!-- Heading -->
      <div class="flex justify-between items-end mb-12 gap-8 flex-wrap" data-reveal>
        <div>
          <span class="eyebrow">{{ t("voices.eyebrow") }}</span>
          <h2 class="font-display font-light m-0 mt-2.5 max-w-[22ch]
                     text-[clamp(2rem,4.5vw,3.4rem)] leading-[1.04] tracking-[-0.03em]">
            {{ t("voices.title1") }} <em class="font-display-italic text-brass-deep">{{ t("voices.title2") }}</em>{{ t("voices.title3") }}
          </h2>
          <p v-if="locale !== 'uz'" class="mt-3 font-mono text-[0.72rem] tracking-[0.12em] uppercase text-ash-strong">{{ t("testimonialsNote") }}</p>
        </div>
        <div class="flex gap-2.5">
          <button @click="prev" :aria-label="t('voices.prev')" type="button"
                  class="w-[50px] h-[50px] rounded-full border border-line bg-transparent text-ink grid place-items-center transition-all duration-200 hover:bg-ink hover:text-cream hover:border-ink hover:-translate-y-0.5">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
              <path d="M15 18l-6-6 6-6" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
          <button @click="next" :aria-label="t('voices.next')" type="button"
                  class="w-[50px] h-[50px] rounded-full border border-line bg-transparent text-ink grid place-items-center transition-all duration-200 hover:bg-ink hover:text-cream hover:border-ink hover:-translate-y-0.5">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
              <path d="M9 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Carousel -->
      <div class="overflow-hidden" data-reveal>
        <div class="flex gap-5 transition-transform duration-[700ms]"
             :style="{ ...trackStyle, transitionTimingFunction: 'var(--ease-out-soft)' }">
          <article v-for="(v, i) in voices" :key="i"
                   class="quote-card shrink-0 grow-0 bg-cream rounded-[var(--radius-lg)] p-8 flex flex-col gap-6 border border-line-soft">
            <div class="font-display-italic text-brass text-[5rem] leading-[0.5] h-4" aria-hidden="true">"</div>
            <p class="font-display font-normal text-ink text-[1.1rem] leading-[1.5] m-0 flex-1">{{ v.quote }}</p>
            <div class="flex items-center gap-3.5 border-t border-line pt-5">
              <span class="w-11 h-11 rounded-full grid place-items-center font-display font-medium bg-ink text-brass-glow text-base">{{ v.initials }}</span>
              <div>
                <b class="block font-sans font-medium text-[0.95rem] text-ink">{{ v.name }}</b>
                <small class="font-mono text-[0.7rem] tracking-[0.14em] uppercase text-ash-strong">{{ t("voices.partnerNote") }}</small>
              </div>
            </div>
          </article>
        </div>
      </div>

      <!-- Dots -->
      <div class="flex gap-2 justify-center mt-8" data-reveal>
        <button v-for="i in dotsCount" :key="i - 1" type="button" :aria-label="`${i}`"
                @click="idx = i - 1"
                class="h-2 rounded-full border-0 p-0 transition-all duration-300"
                :class="(i - 1) === idx ? 'bg-brass-deep w-7' : 'bg-line-strong w-2'"></button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.quote-card {
  flex: 0 0 calc((100% - 2.5rem) / 3);
  min-width: 320px;
}
@media (max-width: 1099px) {
  .quote-card { flex: 0 0 calc((100% - 1.25rem) / 2); }
}
@media (max-width: 719px) {
  .quote-card { flex: 0 0 100%; min-width: 0; }
}
</style>
