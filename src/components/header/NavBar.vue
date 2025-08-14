<template>
  <nav class="bg-transparent backdrop-blur-md fixed w-full top-0 left-0 z-50 shadow-sm">
    <div class="container mx-auto px-6 py-4 flex justify-between items-center">
      <!-- Logo -->
      <a href="/" class="flex items-center gap-2">
    <img src="https://placehold.co/40x40/png" alt="Logo" class="w-10 h-10 rounded-md object-cover" loading="lazy" />

        <span class="font-bold text-xl text-white">Mubeen Droid</span>
      </a>

      <!-- Menu -->
      <ul class="hidden md:flex space-x-8 font-medium text-white">
        <li><a href="/" class="hover:text-cyan-300 transition">Home</a></li>
        <li><a href="#android-apps" class="hover:text-cyan-300 transition">Android Apps</a></li>
        <li><a href="#projects" class="hover:text-cyan-300 transition">Client Projects</a></li>
        <li><a href="#gallery" class="hover:text-cyan-300 transition">Gallery</a></li>
        <li><a href="#articles" class="hover:text-cyan-300 transition">Articles</a></li>
        <li><a href="#about" class="hover:text-cyan-300 transition">About</a></li>
      </ul>

      <!-- Dark Mode Toggle (optional) -->
      <button
        @click="toggleDarkMode"
        class="ml-6 p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
        aria-label="Toggle Dark Mode"
      >
        <span v-if="!isDark">🌙</span>
        <span v-else>☀️</span>
      </button>

      <!-- Mobile Menu Button -->
      <button
        @click="isMenuOpen = !isMenuOpen"
        class="md:hidden p-2 rounded-md bg-white/10 hover:bg-white/20 transition"
      >
        ☰
      </button>
    </div>

    <!-- Mobile Menu -->
    <div v-if="isMenuOpen" class="md:hidden bg-[#0f172a] text-white px-6 py-4 space-y-4">
      <a href="/" class="block hover:text-cyan-300">Home</a>
      <a href="#android-apps" class="block hover:text-cyan-300">Android Apps</a>
      <a href="#projects" class="block hover:text-cyan-300">Client Projects</a>
      <a href="#gallery" class="block hover:text-cyan-300">Gallery</a>
      <a href="#articles" class="block hover:text-cyan-300">Articles</a>
      <a href="#about" class="block hover:text-cyan-300">About</a>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'

const isMenuOpen = ref(false)
const isDark = ref(false)

function toggleDarkMode() {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
}
</script>
