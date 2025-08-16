<script setup>
import { ref, computed } from 'vue'
import projects from '../../data/personalProjects.js'

const search = ref('')
const platform = ref('all')
function hasAndroid(p){ return !!(p.android && p.android.trim()) }
function hasIOS(p){ return !!(p.ios && p.ios.trim()) }
function parseDate(d){ const t=new Date(d); return isNaN(t)?new Date(0):t }
function imgSrc(file){ return `/assets/images/${file}` }

const filtered = computed(()=> {
  const q = search.value.trim().toLowerCase()
  return projects
    .filter(p=>{
      if (platform.value==='android' && !hasAndroid(p)) return false
      if (platform.value==='ios' && !hasIOS(p)) return false
      if (!q) return true
      const blob = `${p.title} ${p.description} ${p.technology} ${p.solution} ${p.name}`.toLowerCase()
      return blob.includes(q)
    })
    .sort((a,b)=> parseDate(b.date) - parseDate(a.date))
})
</script>

<template>
  <!-- Colorful hero like Home -->
  <section class="relative overflow-hidden">
    <div class="bg-gradient-to-r from-[#0f172a] via-[#0e7490] to-[#059669] text-white pt-20 pb-16">
      <div class="container mx-auto px-6">
        <p class="tracking-[.35em] text-cyan-300 font-semibold">PERSONAL PROJECTS</p>
        <h2 class="mt-2 text-3xl md:text-5xl font-extrabold">Crafting Apps People Love</h2>
        <p class="mt-3 text-gray-200 max-w-2xl">
          A curated list of my recent Android & iOS projects, templates, and experiments.
        </p>

        <!-- controls on hero -->
        <div class="mt-6 flex flex-col sm:flex-row gap-3">
          <div class="flex items-center bg-white/10 border border-white/20 rounded-xl px-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white/70" viewBox="0 0 24 24" fill="currentColor"><path d="M21 21 15.8 15.8M10 18a8 8 0 1 1 0-16a8 8 0 0 1 0 16Z"/></svg>
            <input
              v-model="search"
              type="text"
              placeholder="Search projects…"
              class="ml-2 py-2 bg-transparent outline-none text-sm w-56 placeholder-white/70 text-white"
            />
          </div>

          <div class="bg-white/10 rounded-xl p-1 flex border border-white/20">
            <button
              class="px-3 py-2 text-sm rounded-lg"
              :class="platform==='all' ? 'bg-white text-gray-900 shadow' : 'text-white/80'"
              @click="platform='all'"
            >All</button>
            <button
              class="px-3 py-2 text-sm rounded-lg"
              :class="platform==='android' ? 'bg-white text-gray-900 shadow' : 'text-white/80'"
              @click="platform='android'"
            >Android</button>
            <button
              class="px-3 py-2 text-sm rounded-lg"
              :class="platform==='ios' ? 'bg-white text-gray-900 shadow' : 'text-white/80'"
              @click="platform='ios'"
            >iOS</button>
          </div>
        </div>
      </div>
    </div>
    <!-- soft blobs -->
    <div class="pointer-events-none absolute -top-24 -left-24 w-80 h-80 rounded-full bg-cyan-500/20 blur-3xl"></div>
    <div class="pointer-events-none absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-emerald-400/20 blur-3xl"></div>
  </section>

  <!-- White content area -->
  <section class="bg-white py-10 md:py-16">
    <div class="container mx-auto px-6">
      <div class="grid mt-2 gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <article
          v-for="p in filtered"
          :key="p.title + p.date"
          class="group rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition"
        >
          <div class="relative">
            <img
              :src="imgSrc(p.image)"
              :alt="p.title"
              class="w-full h-44 object-cover"
              @error="$event.target.src = 'https://placehold.co/600x400?text=No+Image'"
            />
            <div class="absolute top-3 right-3 flex gap-2">
              <a v-if="p.android" :href="p.android" target="_blank"
                 class="inline-flex items-center justify-center h-9 w-9 rounded-full bg-white/90 border border-gray-200 hover:bg-white"
                 title="Google Play">
                 <!-- play icon -->
                 <svg class="h-5 w-5 text-emerald-600" viewBox="0 0 24 24" fill="currentColor"><path d="M3.2 2.2c-.7.3-1.2 1-1.2 1.8v16c0 .8.5 1.5 1.2 1.8L14 12 3.2 2.2Zm11.6 9.8 4.2-2.4c1.8-1 1.8-2.7 0-3.7L16 3.5 13 7l1.8 5Zm0 0L13 17l3 3.5 3-1.7c1.8-1 1.8-2.7 0-3.7l-4.2-2.1Z"/></svg>
              </a>
              <a v-if="p.ios" :href="p.ios" target="_blank"
                 class="inline-flex items-center justify-center h-9 w-9 rounded-full bg-white/90 border border-gray-200 hover:bg-white"
                 title="App Store">
                 <!-- apple -->
                 <svg class="h-5 w-5 text-gray-900" viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 13.3c0 3.2 2.8 4.3 2.8 4.3s-1.9 5.6-4.7 5.6c-1 0-1.8-.7-3-.7s-2.1.7-3 .7c-2.9 0-6-5.3-6-9.4 0-4.1 2.6-6.3 5-6.3 1.3 0 2.4.8 3 .8.6 0 2-.9 3.5-.8.6 0 2.7.1 4.1 2.1-3.6 2-3.2 6.3-1.7 8.7ZM14.7 3.3c.9-1.1 1.6-2.6 1.4-4.1-1.3.1-2.8.9-3.7 2-0.8 0.9-1.5 2.5-1.4 4 1.4.1 2.8-.8 3.7-1.9Z"/></svg>
              </a>
            </div>
          </div>

          <div class="p-5">
            <h3 class="text-lg font-semibold text-gray-900 group-hover:text-cyan-700 transition">
              {{ p.title }}
            </h3>
            <p class="mt-1 text-xs text-gray-500">{{ p.name }} • {{ p.date }}</p>
            <p class="mt-3 text-sm text-gray-700">{{ p.description }}</p>

            <div class="mt-4 flex flex-wrap gap-2">
              <span v-if="p.technology" class="inline-flex items-center rounded-full bg-cyan-50 text-cyan-700 border border-cyan-100 px-2 py-1 text-xs">
                {{ p.technology }}
              </span>
              <span v-if="p.solution" class="inline-flex items-center rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-1 text-xs">
                {{ p.solution }}
              </span>
            </div>
          </div>
        </article>
      </div>

      <div v-if="filtered.length===0" class="mt-10 text-center text-gray-500">
        No projects found. Try a different search or filter.
      </div>
    </div>
  </section>
</template>
