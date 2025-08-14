<!-- src/views/Home.vue -->
<script setup>
import WhatIDoSection from '../components/sections/WhatIDoSection.vue'
import RecentWorkShowcase from '../components/sections/RecentWorkShowcase.vue'
import ClientProjects from '../components/sections/ClientProjects.vue'
import FeaturedStats from '../components/sections/FeaturedStats.vue'
import ContactSection from '../components/sections/ContactSection.vue'
</script>

<template>
  <div>
    <WhatIDoSection />
    <RecentWorkShowcase />
    <ClientProjects />
    <FeaturedStats />
    <ContactSection />
  </div>
</template>
