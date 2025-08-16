<script setup>
import NavBar from './NavBar.vue'
import HeroSection from './HeroSection.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
</script>

<template>
  <header>
    <NavBar />
    <HeroSection v-if="route.name === 'Home'" />
  </header>
</template>
