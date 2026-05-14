<script setup>
import { computed } from "vue"
import { useI18n } from "../i18n"

const { locale } = useI18n()

const items = computed(() => {
  if (locale.value === "ru") return [
    "27% ожидаемой годовой доходности","Снятие прибыли каждый месяц","От 1 млн сум",
    "100 млрд сум активов","50 000+ партнёров","40 000+ покупателей","150+ сотрудников","Сертификат халяль",
  ]
  if (locale.value === "en") return [
    "27% expected annual return","Monthly profit withdrawals","From 1M UZS","100B UZS assets",
    "50 000+ partners","40 000+ customers","150+ team members","Halal certificate",
  ]
  return [
    "27% kutilayotgan yillik daromad","Har oy foydani chiqarib olish","1 mln so‘mdan",
    "100 mlrd so‘m mablag‘","50 000+ sheriklar","40 000+ xaridorlar","150+ jamoa a’zolari","Halollik sertifikati",
  ]
})
</script>

<template>
  <div class="bg-ink text-cream overflow-hidden border-y border-[rgba(243,236,223,0.08)] py-5" aria-hidden="true" :key="locale">
    <div class="flex gap-16 w-max anim-marquee">
      <span v-for="(item, i) in items" :key="`a-${i}`" class="marquee-item">{{ item }}</span>
      <span v-for="(item, i) in items" :key="`b-${i}`" class="marquee-item">{{ item }}</span>
    </div>
  </div>
</template>

<style scoped>
.marquee-item {
  display: inline-flex;
  align-items: center;
  gap: 1.2rem;
  font-family: var(--font-display);
  font-weight: 360;
  font-style: italic;
  font-size: 1.2rem;
  color: var(--color-brass-glow);
  white-space: nowrap;
}
.marquee-item::before {
  content: "✦";
  color: var(--color-brass);
  font-size: 0.75rem;
  font-style: normal;
}
</style>
