<script setup>
import AppHeader from './components/header/AppHeader.vue'
import ScrollToTop from './components/ScrollToTop.vue'
import AppFooter from './components/AppFooter.vue'
</script>

<template>
  <div class="bg-white font-sans">
    <AppHeader />
    <main>
      <router-view />
    </main>
    <AppFooter />
    <ScrollToTop />
  </div>
</template>
