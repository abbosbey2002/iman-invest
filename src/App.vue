<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'

/* ====== Locale switcher (UZ default) ====== */
const lang = ref('UZ')

/* ====== Calculator state ====== */
const principal = ref(50_000_000)   // 50 mln
const monthly = ref(2_000_000)      // 2 mln/oy
const term = ref(18)                // 12 / 18 / 24
const yieldRate = 22                // annual % — matches old site calculator
const withdrawMonthly = ref(false)

const breakdown = computed(() => {
  const P = Number(principal.value) || 0
  const M = Number(monthly.value) || 0
  const T = Number(term.value) || 1
  const r = yieldRate / 100 / 12
  // Future value with monthly contributions, compounded monthly
  const fvPrincipal = P * Math.pow(1 + r, T)
  const fvContrib = M > 0 ? M * ((Math.pow(1 + r, T) - 1) / r) : 0
  const totalInvested = P + M * T
  const totalFV = withdrawMonthly.value
    ? totalInvested + (P * r * T + (M * r * (T * (T - 1) / 2)))
    : fvPrincipal + fvContrib
  const profit = totalFV - totalInvested
  return {
    total: Math.round(totalFV),
    profit: Math.round(profit),
    invested: Math.round(totalInvested),
    monthlyIncome: Math.round((profit / T) || 0),
  }
})

function fmt(n) {
  if (!isFinite(n)) return '0'
  return Math.round(n).toLocaleString('uz-UZ').replace(/,/g, ' ')
}

/* ====== Testimonials carousel ====== */
const voices = [
  {
    quote: "Iman ga Osmondagi bolalarda ko'rganimdayoq juda Hursand bo'lganman va ilk sarmoyamni kiritganman. O'shanda azgina ishonchsizlik ham bor edi menda. Qayta qayta savollar berardim. Aniq eslayman Islombek degan operatorlar hamma savollarimga erinmasdan Hushmuomalik bilan javob berardi. Necha yillardan beri Iman ishonchni oqladi.",
    name: 'Sardorbek',
    city: 'Sherik',
    initials: 'S',
  },
  {
    quote: "Ko‘p kompaniyalar ko‘pincha o‘zini oylidi oxirigacha bormasdan yopib yo‘q bo‘b ketadi, @imaninvest esa aksincha — o‘ziga emas, xalqqa, elga, yurtga foyda bo‘lsin deb harakat qilayapti. Shularga o‘xshagan kompaniya tadbirkorlar ko‘paysa, xalq yanada farovonlashadi.",
    name: 'Omina',
    city: 'Sherik',
    initials: 'O',
  },
  {
    quote: "3 yildan beri sherikman, bundan afsus qilmayman. Eng muhimi — foydasi halol; muzoraba sherikchilikda foydaga ham, zararga ham rozi bo‘lib qo‘yganman.",
    name: 'Sadullayev Nodirbek',
    city: 'Sherik',
    initials: 'N',
  },
  {
    quote: "Alloh bu loyihani butun dunyoga yoyilishini nasib etsin. Islom moliyasiga dunyo, ayniqsa musulmonlar eng ko‘p ehtiyojlilaridir. Katta ahamiyatga ega soha — bizlar ham kengayishiga yordam beramiz in shaa Alloh.",
    name: 'Temur Oxunov',
    city: 'Sherik',
    initials: 'T',
  },
  {
    quote: "Foydali rolik bo‘libdi. Haqiqatan, farzand uchun dabdaba emas, oqilona sarmoya foyda keltiradi. Men ham Iman ga boshlang‘ich 200$ bilan sarmoya kirtdim va farzandim voyaga yetguncha sarmoya kiritib bormoqchiman.",
    name: 'Abdulazizxon',
    city: 'Sherik',
    initials: 'A',
  },
  {
    quote: "Assalomu alaykum, ishlaringizga omad. 9 oydan buyon sherikman — Iman da pul jamg‘arish menga yoqdi. Qadriyatlarimizga to‘g‘ri kelgani uchun hamda pul jamg‘arishni o‘rganish uchun Iman bilan birgaman.",
    name: 'Mirsoat',
    city: 'Sherik',
    initials: 'M',
  },
  {
    quote: "Bu Websummit-da o‘z birodarlarimiz yuqori natijani qo‘lga kiritgani bizni benihoya mamnun qildi. Iman jamoasiga kuch-quvvat tilaymiz. Investitsiyaga kelsak, men ishonamanki IMAN qiymati yuqori bo‘lgan pul mablag‘larini ham bemalol boshqara oladi.",
    name: 'Ilhomjon Raximo‘tkirov',
    city: 'Sherik',
    initials: 'I',
  },
]
const voiceIndex = ref(0)
const voicesPerView = ref(3)
function updatePerView() {
  const w = window.innerWidth
  voicesPerView.value = w < 720 ? 1 : w < 1100 ? 2 : 3
}
function voicesNext() {
  const max = voices.length - voicesPerView.value
  voiceIndex.value = Math.min(voiceIndex.value + 1, max)
}
function voicesPrev() {
  voiceIndex.value = Math.max(voiceIndex.value - 1, 0)
}
const voicesTransform = computed(() => {
  const pct = (100 / voicesPerView.value) * voiceIndex.value
  return `translateX(calc(-${pct}% - ${voiceIndex.value * (1.25)}rem))`
})

/* ====== Counter animation ====== */
const pillars = [
  { label: "boshqaruvdagi mablag‘lar", value: 100, suffix: 'mlrd so‘m', index: '01' },
  { label: 'Sheriklar', value: 50000, suffix: '+', index: '02' },
  { label: 'Xodimdan iborat jamoa', value: 150, suffix: '+', index: '03' },
  { label: 'Xaridorlar', value: 40000, suffix: '+', index: '04' },
]
const counted = ref(pillars.map(() => 0))
function animateCounters() {
  pillars.forEach((p, i) => {
    const start = performance.now()
    const duration = 1600
    const target = p.value
    function tick(now) {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      counted.value[i] = Math.round(target * eased)
      if (t < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  })
}

/* ====== Reveal-on-scroll ====== */
let observer
function setupReveals() {
  observer = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        e.target.classList.add('is-in')
        if (e.target.dataset.counter !== undefined) animateCounters()
        observer.unobserve(e.target)
      }
    }
  }, { threshold: 0.18 })
  document
    .querySelectorAll('[data-reveal], [data-reveal-stagger]')
    .forEach((el) => observer.observe(el))
}

onMounted(() => {
  updatePerView()
  window.addEventListener('resize', updatePerView)
  setupReveals()
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', updatePerView)
  observer?.disconnect()
})

/* ====== Helpers for sliders ====== */
function rangePercent(value, min, max) {
  return ((value - min) / (max - min)) * 100
}
const principalMin = 1_000_000
const principalMax = 1_000_000_000
const monthlyMin = 0
const monthlyMax = 50_000_000

const sparkPath = computed(() => {
  // Tiny synthetic chart for phone mockup, oscillating upward
  const points = Array.from({ length: 28 }, (_, i) => {
    const y = 60 - (i * 1.6) - Math.sin(i * 0.55) * 6
    const x = (i / 27) * 240
    return `${x.toFixed(1)},${y.toFixed(1)}`
  })
  return 'M' + points.join(' L')
})

const sparkArea = computed(() => sparkPath.value + ' L240,80 L0,80 Z')
</script>

<template>
  <!-- ============= NAV ============= -->
  <header class="nav">
    <div class="nav__inner">
      <a href="#top" class="brand">
        <span class="brand__mark">
          <img src="/iman-logo.png" alt="IMAN" style="width:38px;height:38px;object-fit:contain" />
        </span>
        <span class="brand__word">
          IMAN
          <small>invest · halol moliya</small>
        </span>
      </a>

      <nav>
        <ul class="nav__menu">
          <li><a href="#trust">Halollik sertifikati</a></li>
          <li><a href="#calc">Kalkulyator</a></li>
          <li><a href="#contact">Qayta aloqa</a></li>
        </ul>
      </nav>

      <div class="nav__cta">
        <span class="lang">
          <b>{{ lang }}</b>
          <span style="opacity:.55">/ Русский</span>
        </span>
        <a href="#contact" class="btn">
          Ilovaga o‘tish
          <svg class="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
            <path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </a>
      </div>
    </div>
  </header>

  <!-- ============= HERO ============= -->
  <section id="top" class="hero">
    <div class="hero__grid">
      <div data-reveal>
        <div class="hero__meta">
          <span class="eyebrow">IMAN Invest · 2014–2025</span>
          <span class="hero__meta-line"></span>
          <span class="eyebrow">Halol moliya · O‘zbekiston</span>
        </div>

        <h1 class="hero__title">
          Maqsadlaringizga
          <em>2 barobar</em>
          tezroq erishing.
        </h1>

        <p class="hero__lead">
          Islom moliyasi asosida qo‘shimcha daromad.<br>
          <b>Maqsadlaringiz uchun tezroq pul to‘plang.</b><br>
          Har oylik foydani kartangizga oling.
        </p>

        <div class="hero__ctas">
          <a href="#calc" class="btn">
            Kalkulyator
            <svg class="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
              <path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </a>
          <a href="#how" class="btn btn--ghost">
            Bu qanday ishlaydi?
          </a>
          <span class="hero__note">Halollik sertifikati</span>
        </div>
      </div>

      <!-- showpiece -->
      <aside class="showpiece" data-reveal>
        <!-- Islamic 8-point star ornament -->
        <svg class="showpiece__ornament" viewBox="0 0 400 500" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="brassG" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0" stop-color="#e6d49e" stop-opacity="0.5" />
              <stop offset="1" stop-color="#c9a86a" stop-opacity="0.1" />
            </linearGradient>
          </defs>
          <g stroke="url(#brassG)" stroke-width="1" fill="none">
            <!-- pinstripe rules -->
            <line x1="0" y1="80" x2="400" y2="80" />
            <line x1="0" y1="440" x2="400" y2="440" />
            <!-- 8-point star — two rotated squares -->
            <g transform="translate(200 250)">
              <rect x="-150" y="-150" width="300" height="300" />
              <rect x="-150" y="-150" width="300" height="300" transform="rotate(45)" />
              <circle r="160" />
              <circle r="80" />
              <g stroke-opacity="0.5">
                <line x1="-150" y1="0" x2="150" y2="0" />
                <line x1="0" y1="-150" x2="0" y2="150" />
                <line x1="-106" y1="-106" x2="106" y2="106" />
                <line x1="-106" y1="106" x2="106" y2="-106" />
              </g>
            </g>
          </g>
        </svg>

        <span class="showpiece__corner">Yillik · taxminiy</span>

        <div class="showpiece__big">
          27<span class="pct">%</span>
        </div>

        <div class="showpiece__caption">
          <p>Kutilayotgan yillik daromad.</p>
          <small>1 mln so‘mdan boshlab</small>
        </div>
      </aside>
    </div>
  </section>

  <!-- ============= MARQUEE ============= -->
  <div class="marquee" aria-hidden="true">
    <div class="marquee__track">
      <span class="marquee__item">27% kutilayotgan yillik daromad</span>
      <span class="marquee__item">Har oy foydani chiqarib olish</span>
      <span class="marquee__item">1 mln so‘m — minimal sarmoya</span>
      <span class="marquee__item">100 mlrd so‘m boshqaruvdagi mablag‘lar</span>
      <span class="marquee__item">50 000+ sheriklar</span>
      <span class="marquee__item">40 000+ xaridorlar</span>
      <span class="marquee__item">150+ xodimdan iborat jamoa</span>
      <span class="marquee__item">Halollik sertifikati</span>

      <span class="marquee__item">27% kutilayotgan yillik daromad</span>
      <span class="marquee__item">Har oy foydani chiqarib olish</span>
      <span class="marquee__item">1 mln so‘m — minimal sarmoya</span>
      <span class="marquee__item">100 mlrd so‘m boshqaruvdagi mablag‘lar</span>
      <span class="marquee__item">50 000+ sheriklar</span>
      <span class="marquee__item">40 000+ xaridorlar</span>
      <span class="marquee__item">150+ xodimdan iborat jamoa</span>
      <span class="marquee__item">Halollik sertifikati</span>
    </div>
  </div>

  <!-- ============= HOW ============= -->
  <section id="how" class="section how">
    <div class="container">
      <div class="how__head" data-reveal>
        <div>
          <span class="eyebrow">§ Mudoraba sherikchiligi</span>
          <h2>Bu qanday <em>ishlaydi</em>?</h2>
        </div>
        <p>
          Beshta sodda qadam — siz sarmoya kiritasiz, biz halol savdo qilamiz,
          sof foyda esa barcha sheriklar o‘rtasida adolat bilan taqsimlanadi.
        </p>
      </div>

      <div class="steps" data-reveal-stagger>
        <article class="step">
          <span class="step__num">i.</span>
          <h3>Sherik bo‘lasiz</h3>
          <p>IMAN kompaniyasiga sarmoya kiritib biznes sherikka aylanasiz.</p>
        </article>
        <article class="step">
          <span class="step__num">ii.</span>
          <h3>Tovar xarid qilinadi</h3>
          <p>Sizdan jalb qilingan pullarga hamkor do‘konlardan elektronika va maishiy texnika xarid qilinadi.</p>
        </article>
        <article class="step">
          <span class="step__num">iii.</span>
          <h3>Nasiyaga sotiladi</h3>
          <p>Tovarlarga ustama narx belgilanib boshqa insonlarga nasiyaga sotiladi.</p>
        </article>
        <article class="step">
          <span class="step__num">iv.</span>
          <h3>Foyda taqsimlanadi</h3>
          <p>Ana shu savdo natijasida olinadigan sof foyda barcha sheriklar o‘rtasida taqsimlanadi.</p>
        </article>
        <article class="step">
          <span class="step__num">v.</span>
          <h3>Dividend daromad</h3>
          <p>Har bir sherik dividend shaklida daromad oladi.</p>
        </article>
      </div>

      <!-- 3-tile highlight strip preserved from original layout -->
      <div class="highlight" data-reveal>
        <div class="highlight__cell">
          <div class="highlight__num">27<small>%</small></div>
          <div class="highlight__label">kutilayotgan yillik daromad</div>
        </div>
        <div class="highlight__cell">
          <div class="highlight__num">Har oy</div>
          <div class="highlight__label">foydani chiqarib olish</div>
        </div>
        <div class="highlight__cell">
          <div class="highlight__num">1 mln <small>so‘m</small></div>
          <div class="highlight__label">minimal sarmoya miqdori</div>
        </div>
      </div>
    </div>
  </section>

  <!-- ============= PILLARS ============= -->
  <section id="trust" class="pillars">
    <!-- background pattern -->
    <svg class="pillars__bg" viewBox="0 0 1400 600" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="star8" width="160" height="160" patternUnits="userSpaceOnUse">
          <g transform="translate(80 80)" stroke="#e6d49e" stroke-width="0.8" fill="none">
            <rect x="-50" y="-50" width="100" height="100" />
            <rect x="-50" y="-50" width="100" height="100" transform="rotate(45)" />
            <circle r="50" />
          </g>
        </pattern>
      </defs>
      <rect width="1400" height="600" fill="url(#star8)" />
    </svg>

    <div class="container" data-reveal data-counter>
      <div class="pillars__head">
        <span class="eyebrow">§ Halollik sertifikati</span>
        <h2>100 000 ga yaqin insonga <em>moliyaviy xizmat</em> ko‘rsatdik.</h2>
      </div>

      <div class="pillars__grid">
        <div class="pillar" v-for="(p, i) in pillars" :key="i">
          <div class="pillar__index">№ {{ p.index }}</div>
          <div class="pillar__num">
            <span v-if="p.value >= 1000">{{ fmt(counted[i]) }}</span>
            <span v-else>{{ counted[i] }}</span>
            <small>{{ p.suffix }}</small>
          </div>
          <div class="pillar__label">{{ p.label }}</div>
        </div>
      </div>
    </div>
  </section>

  <!-- ============= CALCULATOR ============= -->
  <section id="calc" class="section calc">
    <div class="container">
      <div class="calc__head" data-reveal>
        <div>
          <span class="eyebrow">§ Kalkulyator</span>
          <h2>Biz bilan qancha <em>foyda</em> olishingiz mumkin?</h2>
        </div>
        <p class="right">
          Slayderlarni harakatlantiring — hisob real vaqtda yangilanadi.
          Yillik foyda ko‘rsatkichi 22%.
        </p>
      </div>

      <div class="calc__shell" data-reveal>
        <!-- Inputs -->
        <div class="calc__panel">
          <div class="calc__row">
            <div class="calc__label">
              <span>Boshlang‘ich sarmoya</span>
              <span class="calc__value">{{ fmt(principal) }} <small>so‘m</small></span>
            </div>
            <input
              type="range"
              v-model.number="principal"
              :min="principalMin"
              :max="principalMax"
              step="500000"
              :style="{
                background: `linear-gradient(to right, var(--ink) 0%, var(--ink) ${rangePercent(principal, principalMin, principalMax)}%, var(--line) ${rangePercent(principal, principalMin, principalMax)}%, var(--line) 100%)`
              }"
            />
            <div class="calc__bounds">
              <span>1 000 000</span>
              <span>1 000 000 000</span>
            </div>
          </div>

          <div class="calc__row">
            <div class="calc__label">
              <span>Oylik sarmoya</span>
              <span class="calc__value">{{ fmt(monthly) }} <small>so‘m</small></span>
            </div>
            <input
              type="range"
              v-model.number="monthly"
              :min="monthlyMin"
              :max="monthlyMax"
              step="100000"
              :style="{
                background: `linear-gradient(to right, var(--ink) 0%, var(--ink) ${rangePercent(monthly, monthlyMin, monthlyMax)}%, var(--line) ${rangePercent(monthly, monthlyMin, monthlyMax)}%, var(--line) 100%)`
              }"
            />
            <div class="calc__bounds">
              <span>0</span>
              <span>50 000 000</span>
            </div>
          </div>

          <div class="calc__row">
            <div class="calc__label">
              <span>Sarmoya muddati</span>
              <span class="calc__value">{{ term }} <small>oy</small></span>
            </div>
            <div class="chips">
              <button class="chip" :data-active="term === 12" @click="term = 12">12 oy</button>
              <button class="chip" :data-active="term === 18" @click="term = 18">18 oy</button>
              <button class="chip" :data-active="term === 24" @click="term = 24">24 oy</button>
              <button class="chip" :data-active="term === 36" @click="term = 36">36 oy</button>
            </div>
          </div>

          <div class="calc__row">
            <div class="calc__label">
              <span>Foydani har oy chiqarib olasizmi?</span>
              <span class="toggle">
                <button :data-active="withdrawMonthly" @click="withdrawMonthly = true">Ha</button>
                <button :data-active="!withdrawMonthly" @click="withdrawMonthly = false">Yo‘q</button>
              </span>
            </div>
          </div>
        </div>

        <!-- Result -->
        <div class="calc__panel calc__panel--dark">
          <div style="position:relative; z-index:1">
            <div class="calc__result-label">Yakuniy summa · {{ term }} oydan keyin</div>
            <p class="calc__big">{{ fmt(breakdown.total) }} <small>so‘m</small></p>
          </div>

          <ul class="calc__breakdown" style="position:relative; z-index:1">
            <li>
              <span>Yillik foyda ko‘rsatkichi</span>
              <b>{{ yieldRate }} %</b>
            </li>
            <li>
              <span>Butun davrdagi investitsiya</span>
              <b>{{ fmt(breakdown.invested) }} so‘m</b>
            </li>
            <li>
              <span>Oylik foyda</span>
              <b>{{ fmt(breakdown.monthlyIncome) }} so‘m</b>
            </li>
          </ul>

          <a href="#contact" class="btn btn--brass calc__cta" style="position:relative; z-index:1">
            Ilovaga o‘tish
            <svg class="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
              <path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- ============= VOICES ============= -->
  <section id="voices" class="section voices">
    <div class="container">
      <div class="voices__head" data-reveal>
        <div>
          <span class="eyebrow">§ Sheriklarimiz</span>
          <h2>Sheriklarimizning biz haqimizdagi <em>fikrlari</em>.</h2>
        </div>
        <div class="voices__nav">
          <button @click="voicesPrev" aria-label="Oldingisi">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
              <path d="M15 18l-6-6 6-6" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
          <button @click="voicesNext" aria-label="Keyingi">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
              <path d="M9 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      <div class="voices__viewport" data-reveal>
        <div class="voices__track" :style="{ transform: voicesTransform }">
          <article class="quote" v-for="(v, i) in voices" :key="i">
            <div class="quote__mark">“</div>
            <p>{{ v.quote }}</p>
            <div class="quote__author">
              <span class="quote__avatar">{{ v.initials }}</span>
              <div>
                <b>{{ v.name }}</b>
                <small>{{ v.city }} · sherik</small>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>

  <!-- ============= INVESTOR STEPS + PHONE ============= -->
  <section class="section invest">
    <div class="container invest__grid">
      <div class="invest__head" data-reveal>
        <span class="eyebrow">§ Boshlash</span>
        <h2>Investor bo‘lishga <em>tayyormisiz</em>?</h2>
        <p style="color:var(--ash); margin:0; max-width:46ch">
          Bugundanoq maqsadlar uchun pul to‘plashni boshlang.
        </p>

        <ol class="invest__list" data-reveal-stagger>
          <li>
            <span class="n">1</span>
            <div>
              <h4>IMAN Invest mobil ilovasini yuklab oling</h4>
            </div>
          </li>
          <li>
            <span class="n">2</span>
            <div>
              <h4>Ro‘yxatdan o‘tib, moliyaviy maqsad belgilang</h4>
            </div>
          </li>
          <li>
            <span class="n">3</span>
            <div>
              <h4>Birinchi sarmoyangizni kiriting</h4>
            </div>
          </li>
          <li>
            <span class="n">4</span>
            <div>
              <h4>Sarmoya kiritishda doimiy bo‘ling va maqsadingizga erishing!</h4>
            </div>
          </li>
        </ol>

        <a href="#contact" class="btn">
          Ilovaga o‘tish
          <svg class="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
            <path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </a>
      </div>

      <!-- Phone -->
      <div data-reveal>
        <div class="phone">
          <div class="phone__notch"></div>
          <div class="phone__screen">
            <div class="phone__statusbar">
              <span>09:41</span>
              <span>● ● ● ●</span>
            </div>

            <div style="display:flex; justify-content:space-between; align-items:center;">
              <div>
                <div style="font-family:var(--mono); font-size:.6rem; letter-spacing:.18em; color:var(--brass); text-transform:uppercase">Assalomu alaykum</div>
                <div style="font-family:var(--display); font-size:1.05rem; color:var(--cream); margin-top:.2rem">Abbosbek</div>
              </div>
              <div style="width:34px; height:34px; border-radius:50%; background:var(--brass); display:grid; place-items:center; color:var(--ink); font-family:var(--display); font-weight:500;">A</div>
            </div>

            <div class="phone__card">
              <div class="label">Hozirgi balans</div>
              <div class="figure">4 536 800 <small style="font-size:.5em; color:var(--brass)">so‘m</small></div>
              <div class="delta">↑ +18 333 so‘m bu oy</div>

              <svg class="phone__chart" viewBox="0 0 240 80" preserveAspectRatio="none">
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

            <div class="phone__row">
              <div>
                <div class="lbl">Foyda</div>
                <div class="num">+27 %</div>
              </div>
              <div>
                <div class="lbl">Sherikligingiz</div>
                <div class="num">2.4 yil</div>
              </div>
            </div>

            <div class="phone__cta">Sarmoya kiritish</div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ============= CTA / CONTACT ============= -->
  <section id="contact" class="section cta">
    <div class="container cta__grid">
      <div data-reveal>
        <span class="eyebrow" style="color:var(--brass)">§ Qayta aloqa</span>
        <h2>Qo‘shimcha <em>yordam</em> kerakmi?</h2>
        <p class="cta__lead">
          Operatorlarimiz 24 soat ichida siz bilan bog‘lanib,
          barcha savollaringizga javob beradilar.
        </p>

        <div class="cta__meta">
          <div>
            <span class="lbl">Operator</span>
            <b>+998 (78) 113-00-30</b>
          </div>
          <div>
            <span class="lbl">Onlayn chat</span>
            <b>t.me/imaninvest_bot</b>
          </div>
          <div>
            <span class="lbl">Ish vaqti</span>
            <b>09:00−18:00</b>
          </div>
          <div>
            <span class="lbl">Hudud</span>
            <b>O‘zbekiston · Toshkent</b>
          </div>
        </div>
      </div>

      <form class="form" data-reveal @submit.prevent>
        <div class="field">
          <label>Ismingiz</label>
          <input type="text" placeholder="Ismingiz" />
        </div>
        <div class="field">
          <label>Telefon raqamingiz</label>
          <input type="tel" placeholder="+998 00-000-0000" />
        </div>
        <div class="field">
          <label>Sizga qanday aloqaga chiqsak qulay?</label>
          <select>
            <option>Telefon qo‘ng‘irog‘i</option>
            <option>Telegram</option>
            <option>WhatsApp</option>
            <option>SMS</option>
          </select>
        </div>
        <button type="submit" class="btn btn--brass" style="margin-top:.4rem">
          Yuborish
          <svg class="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
            <path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
      </form>
    </div>
  </section>

  <!-- ============= FOOTER ============= -->
  <footer class="foot">
    <div class="foot__grid">
      <div class="foot__brand">
        <a href="#top" class="brand">
          <span class="brand__mark">
            <img src="/iman-logo.png" alt="IMAN" style="width:38px;height:38px;object-fit:contain; filter: brightness(0) invert(1) sepia(.4) saturate(.7)"/>
          </span>
          <span class="brand__word">
            IMAN
            <small>invest · halol moliya</small>
          </span>
        </a>
        <p class="foot__motto">
          Islom moliyasi asosida qo‘shimcha daromad —
          maqsadlaringiz uchun tezroq pul to‘plang.
        </p>
      </div>

      <div>
        <h5>Sayt bo‘limlari</h5>
        <ul>
          <li><a href="#how">Bu qanday ishlaydi?</a></li>
          <li><a href="#trust">Halollik sertifikati</a></li>
          <li><a href="#calc">Kalkulyator</a></li>
          <li><a href="#voices">Sheriklarimiz</a></li>
        </ul>
      </div>

      <div>
        <h5>Aloqa</h5>
        <ul>
          <li><span style="color:rgba(243,236,223,.5)">Operator</span><br>+998 (78) 113-00-30</li>
          <li><span style="color:rgba(243,236,223,.5)">Onlayn chat</span><br>t.me/imaninvest_bot</li>
          <li><span style="color:rgba(243,236,223,.5)">Ish vaqti</span><br>09:00−18:00</li>
        </ul>
      </div>

      <div>
        <h5>Til</h5>
        <ul>
          <li><a href="#">O‘zbek</a></li>
          <li><a href="#">Русский</a></li>
        </ul>
      </div>
    </div>

    <div class="foot__bottom">
      <span>© IMAN Invest. 2025 · Barcha huquqlar himoyalangan</span>
      <div class="foot__socials">
        <a href="#" aria-label="Telegram">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z" /></svg>
        </a>
        <a href="#" aria-label="Instagram">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.8" fill="currentColor"/></svg>
        </a>
        <a href="#" aria-label="YouTube">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M21.6 7.2c-.2-1.4-1.3-2.4-2.7-2.6C16.5 4.2 12 4.2 12 4.2s-4.5 0-6.9.4c-1.4.2-2.5 1.2-2.7 2.6C2 9.6 2 12 2 12s0 2.4.4 4.8c.2 1.4 1.3 2.4 2.7 2.6 2.4.4 6.9.4 6.9.4s4.5 0 6.9-.4c1.4-.2 2.5-1.2 2.7-2.6.4-2.4.4-4.8.4-4.8s0-2.4-.4-4.8zM10 15.5v-7l6 3.5-6 3.5z"/></svg>
        </a>
      </div>
    </div>
  </footer>
</template>
