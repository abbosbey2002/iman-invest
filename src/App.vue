<script setup>
import { ref } from "vue"
import { useReveal } from "./composables/useReveal.js"
import SiteHeader from "./components/SiteHeader.vue"
import HeroSection from "./components/HeroSection.vue"
import MarqueeStrip from "./components/MarqueeStrip.vue"
import HowItWorks from "./components/HowItWorks.vue"
import PillarsSection from "./components/PillarsSection.vue"
import CalculatorSection from "./components/CalculatorSection.vue"
import VoicesSection from "./components/VoicesSection.vue"
import InvestorSteps from "./components/InvestorSteps.vue"
import ContactSection from "./components/ContactSection.vue"
import SiteFooter from "./components/SiteFooter.vue"

const root = ref(null)
useReveal(root)
</script>

<template>
  <div ref="root" class="min-h-screen">
    <SiteHeader />
    <main>
      <HeroSection />
      <MarqueeStrip />
      <HowItWorks />
      <PillarsSection />
      <CalculatorSection />
      <VoicesSection />
      <InvestorSteps />
      <ContactSection />
    </main>
    <SiteFooter />
  </div>
</template>
