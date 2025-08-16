<!-- src/views/Home.vue -->
<script setup>
import WhatIDoSection from '../components/sections/WhatIDoSection.vue'
import RecentWorkShowcase from '../components/sections/RecentWorkShowcase.vue'
import ClientProjects from '../components/sections/ClientProjects.vue'
import FeaturedStats from '../components/sections/FeaturedStats.vue'
import ContactSection from '../components/sections/ContactSection.vue'
</script>

<template>
  <!-- remove space-y-* so no white gap shows through -->
  <div>
    <section class="scroll-mt-28">
      <WhatIDoSection />
    </section>

    <!-- -mt-px prevents any hairline seam between dark sections -->
    <section id="android-apps" class="scroll-mt-28 -mt-px">
      <RecentWorkShowcase />
    </section>

    <section id="client-projects" class="scroll-mt-28 -mt-px">
      <ClientProjects />
    </section>

    <section id="stats" class="scroll-mt-28 -mt-px">
      <FeaturedStats />
    </section>

    <section id="contact" class="scroll-mt-28 -mt-px">
      <ContactSection />
    </section>
  </div>
</template>
