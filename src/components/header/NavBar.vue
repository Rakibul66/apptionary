<!-- src/components/header/NavBar.vue -->
<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRoute } from 'vue-router'

// ✅ Use Vite's asset pipeline (best practice)
import logo from '../../assets/app.png'

const isMenuOpen = ref(false)
const route = useRoute()

// Track scroll to switch navbar style
const scrolled = ref(false)
const onScroll = () => { scrolled.value = window.scrollY > 16 }

// Pages that have a large hero behind the navbar
const HERO_ROUTES = new Set(['Home', 'Portfolio'])

const wantsTransparent = computed(() => HERO_ROUTES.has(route.name))
const isTransparent = computed(() => wantsTransparent.value && !scrolled.value)

function closeMenu () { isMenuOpen.value = false }

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <nav
    :class="[
      'fixed inset-x-0 top-0 z-50 transition-all duration-300',
      // At top of hero: dark glass (no milky white)
      isTransparent
        ? 'bg-slate-900/10 text-white backdrop-blur-[2px]'
        // Scrolled / non-hero pages: solid light bar
        : 'bg-white/95 text-gray-900 shadow-sm backdrop-blur'
    ]"
  >
    <div class="container mx-auto h-16 px-6 flex items-center justify-between">
      <!-- Logo + brand -->
      <RouterLink to="/" class="flex items-center gap-2" @click="closeMenu">
        <img :src="logo" alt=" logo" class="w-10 h-10 rounded-md object-cover" />
        <span class="font-semibold text-lg">Apptionary</span>
      </RouterLink>

      <!-- Desktop menu -->
      <ul class="hidden md:flex items-center gap-8">
        <li>
          <RouterLink to="/" class="hover:text-cyan-400" exact-active-class="text-cyan-400">Home</RouterLink>
        </li>
        <li>
          <RouterLink :to="{ path: '/', hash: '#android-apps' }" class="hover:text-cyan-400">
            Android Apps
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/portfolio" class="hover:text-cyan-400" active-class="text-cyan-400">
            Portfolio
          </RouterLink>
        </li>
      </ul>

      <!-- Mobile toggle -->
      <button
        class="md:hidden p-2 rounded-md hover:bg-black/5"
        aria-label="Toggle Menu"
        @click="isMenuOpen = !isMenuOpen"
      >
        ☰
      </button>
    </div>

    <!-- Mobile menu -->
    <div
      v-if="isMenuOpen"
      :class="[
        'md:hidden px-6 py-4 space-y-4',
        isTransparent ? 'bg-slate-900/95 text-white' : 'bg-white text-gray-900 shadow'
      ]"
    >
      <RouterLink to="/" class="block hover:text-cyan-400" @click="closeMenu">Home</RouterLink>
      <RouterLink :to="{ path: '/', hash: '#android-apps' }" class="block hover:text-cyan-400" @click="closeMenu">
        Android Apps
      </RouterLink>
      <RouterLink to="/portfolio" class="block hover:text-cyan-400" @click="closeMenu">
        Portfolio
      </RouterLink>
    </div>
  </nav>
</template>
