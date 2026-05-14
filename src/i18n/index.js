import { ref, computed } from "vue"
import uz from "./uz.js"
import ru from "./ru.js"
import en from "./en.js"

const dicts = { uz, ru, en }
const STORAGE_KEY = "iman.locale"
const LOCALES = ["uz", "ru", "en"]

function detectInitial() {
  if (typeof window === "undefined") return "uz"
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved && LOCALES.includes(saved)) return saved
  const browser = (navigator.language || "uz").slice(0, 2)
  if (LOCALES.includes(browser)) return browser
  return "uz"
}

const locale = ref(detectInitial())

function setLocale(next) {
  if (!LOCALES.includes(next)) return
  locale.value = next
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, next)
    document.documentElement.lang = next
  }
}

if (typeof window !== "undefined") {
  document.documentElement.lang = locale.value
}

function pick(dict, path) {
  return path.split(".").reduce((acc, k) => (acc == null ? acc : acc[k]), dict)
}

const dict = computed(() => dicts[locale.value])

function t(path) {
  const val = pick(dict.value, path)
  if (val == null) {
    if (locale.value !== "uz") {
      const fallback = pick(dicts.uz, path)
      if (fallback != null) return fallback
    }
    return path
  }
  return val
}

const fmt = computed(() => {
  const numFormatters = {
    uz: new Intl.NumberFormat("uz-UZ"),
    ru: new Intl.NumberFormat("ru-RU"),
    en: new Intl.NumberFormat("en-US"),
  }
  return (n) => {
    if (!isFinite(n)) return "0"
    return numFormatters[locale.value].format(Math.round(n)).replace(/[ ,]/g, " ")
  }
})

export function useI18n() {
  return { locale, setLocale, t, dict, fmt, locales: LOCALES }
}
