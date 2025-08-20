<!-- src/views/PersonalProjects.vue -->
<script setup>
import { ref, computed } from 'vue'
import projects from '../../data/personalProjects.js'

const search = ref('')
const platform = ref('all')
const sortKey = ref('date_desc') // 'date_desc' | 'date_asc' | 'title_asc' | 'title_desc'

function hasAndroid(p){ return !!(p.android && p.android.trim()) }
function hasIOS(p){ return !!(p.ios && p.ios.trim()) }
function parseDate(d){ const t=new Date(d); return isNaN(t)?new Date(0):t }
function imgSrc(file){ return `/assets/images/${file}` }

const filtered = computed(()=> {
  const q = search.value.trim().toLowerCase()
  let list = projects
    .filter(p=>{
      if (platform.value==='android' && !hasAndroid(p)) return false
      if (platform.value==='ios' && !hasIOS(p)) return false
      if (!q) return true
      const blob = `${p.title} ${p.description} ${p.technology} ${p.solution} ${p.name}`.toLowerCase()
      return blob.includes(q)
    })

  switch (sortKey.value) {
    case 'date_asc':   list = list.sort((a,b)=> parseDate(a.date) - parseDate(b.date)); break
    case 'title_asc':  list = list.sort((a,b)=> a.title.localeCompare(b.title)); break
    case 'title_desc': list = list.sort((a,b)=> b.title.localeCompare(a.title)); break
    default:           list = list.sort((a,b)=> parseDate(b.date) - parseDate(a.date))
  }
  return list
})

const resultCount = computed(()=> filtered.value.length)

function clearFilters(){
  search.value = ''
  platform.value = 'all'
  sortKey.value = 'date_desc'
}
</script>

<template>
  <!-- Hero -->
  <section class="relative overflow-hidden">
    <div class="bg-gradient-to-r from-[#0f172a] via-[#0e7490] to-[#059669] text-white pt-20 pb-16">
      <div class="container mx-auto px-6">
        <p class="tracking-[.35em] text-cyan-300 font-semibold">PERSONAL PROJECTS</p>
        <h2 class="mt-2 text-3xl md:text-5xl font-extrabold">Crafting Apps People Love</h2>
        <p class="mt-3 text-gray-200 max-w-2xl">
          A curated list of my recent Android & iOS products, templates, and experiments.
        </p>

        <!-- Controls -->
        <div class="mt-6 flex flex-col lg:flex-row gap-3 lg:items-center">
          <!-- Search -->
          <div class="flex items-center bg-white/10 border border-white/20 rounded-xl px-3 focus-within:ring-2 focus-within:ring-white/60">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white/70" viewBox="0 0 24 24" fill="currentColor"><path d="M21 21 15.8 15.8M10 18a8 8 0 1 1 0-16a8 8 0 0 1 0 16Z"/></svg>
            <input
              v-model="search"
              type="text"
              placeholder="Search projects…"
              class="ml-2 py-2 bg-transparent outline-none text-sm w-64 md:w-80 placeholder-white/70 text-white"
            />
          </div>

          <!-- Platform filter -->
          <div class="bg-white/10 rounded-xl p-1 flex border border-white/20">
            <button
              class="px-3 py-2 text-sm rounded-lg transition"
              :class="platform==='all' ? 'bg-white text-gray-900 shadow' : 'text-white/80 hover:text-white'"
              @click="platform='all'"
            >All</button>
            <button
              class="px-3 py-2 text-sm rounded-lg transition"
              :class="platform==='android' ? 'bg-white text-gray-900 shadow' : 'text-white/80 hover:text-white'"
              @click="platform='android'"
            >Android</button>
            <button
              class="px-3 py-2 text-sm rounded-lg transition"
              :class="platform==='ios' ? 'bg-white text-gray-900 shadow' : 'text-white/80 hover:text-white'"
              @click="platform='ios'"
            >iOS</button>
          </div>

          <!-- Sort -->
          <div class="flex items-center gap-2 bg-white/10 rounded-xl px-3 py-2 border border-white/20 ml-auto">
            <span class="text-sm text-white/80">Sort</span>
            <select v-model="sortKey" class="bg-transparent text-white text-sm outline-none">
              <option value="date_desc" class="text-gray-900">Newest</option>
              <option value="date_asc" class="text-gray-900">Oldest</option>
              <option value="title_asc" class="text-gray-900">Title A–Z</option>
              <option value="title_desc" class="text-gray-900">Title Z–A</option>
            </select>
          </div>

          <!-- Reset -->
          <button
            class="text-sm text-white/80 hover:text-white underline underline-offset-4"
            @click="clearFilters"
          >Reset</button>
        </div>
      </div>
    </div>

    <!-- soft blobs -->
    <div class="pointer-events-none absolute -top-24 -left-24 w-80 h-80 rounded-full bg-cyan-500/20 blur-3xl"></div>
    <div class="pointer-events-none absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-emerald-400/20 blur-3xl"></div>
  </section>

  <!-- Content -->
  <section class="bg-white py-10 md:py-16">
    <div class="container mx-auto px-6">
      <div class="flex items-center justify-between mb-6">
        <p class="text-sm text-gray-600">
          Showing <span class="font-semibold text-gray-900">{{ resultCount }}</span> project{{ resultCount===1?'':'s' }}
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <!-- Cards -->
        <div class="lg:col-span-9">
          <div class="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
            <article
              v-for="p in filtered"
              :key="p.title + p.date"
              class="group rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm hover:shadow-lg transition duration-300"
            >
              <div class="relative">
                <img
                  :src="imgSrc(p.image)"
                  :alt="p.title"
                  class="w-full h-44 object-cover"
                  @error="$event.target.src = 'https://placehold.co/600x400?text=No+Image'"
                  loading="lazy"
                />
                <!-- subtle badge -->
                <span class="absolute bottom-3 left-3 text-[11px] uppercase tracking-wide bg-black/60 text-white px-2 py-1 rounded-full backdrop-blur">
                  {{ p.name }}
                </span>
              </div>

              <div class="p-5">
                <h3 class="text-lg font-semibold text-gray-900 group-hover:text-cyan-700 transition">
                  {{ p.title }}
                </h3>
                <p class="mt-1 text-xs text-gray-500">{{ p.date }}</p>
                <p class="mt-3 text-sm text-gray-700 line-clamp-3">{{ p.description }}</p>

                <div class="mt-4 flex flex-wrap gap-2">
                  <span v-if="p.technology" class="inline-flex items-center rounded-full bg-cyan-50 text-cyan-700 border border-cyan-100 px-2 py-1 text-[11px] font-medium">
                    {{ p.technology }}
                  </span>
                  <span v-if="p.solution" class="inline-flex items-center rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-1 text-[11px] font-medium">
                    {{ p.solution }}
                  </span>
                </div>

                <!-- Store buttons -->
                <div class="mt-5 flex items-center gap-3">
                  <a
                    v-if="p.android"
                    :href="p.android" target="_blank" rel="noopener"
                    class="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 hover:border-emerald-300 hover:bg-emerald-50 transition"
                  >
                    Google Play
                  </a>
                  <a
                    v-if="p.ios"
                    :href="p.ios" target="_blank" rel="noopener"
                    class="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 hover:border-gray-300 hover:bg-gray-50 transition"
                  >
                    App Store
                  </a>
                </div>
              </div>
            </article>
          </div>

          <div v-if="filtered.length===0" class="mt-10 text-center text-gray-500">
            No projects found. Try a different search or filter.
          </div>
        </div>

        <!-- Sticky booking sidebar -->
        <aside class="lg:col-span-3">
          <div class="lg:sticky lg:top-24 space-y-6">
            <div class="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
              <div class="bg-gradient-to-r from-cyan-600 to-emerald-600 text-white p-5">
                <h4 class="text-lg font-semibold">Book Service Now</h4>
                <p class="text-white/90 text-sm mt-1">Hire me for Flutter, iOS/tvOS, Android, and Full-stack mobile apps.</p>
              </div>
              <div class="p-5">
                <!-- Fiverr -->
                <a
                  href="https://www.fiverr.com/s/LdpEezo"
                  target="_blank" rel="noopener"
                  class="w-full inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-white bg-[#1DBF73] hover:brightness-110 transition"
                >
                  Hire on Fiverr
                </a>

                <!-- Upwork -->
                <a
                  href="https://www.upwork.com/freelancers/~0180a06cf7f88b8e7c?mp_source=share"
                  target="_blank" rel="noopener"
                  class="w-full mt-3 inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-white bg-[#14A800] hover:brightness-110 transition"
                >
                  Hire on Upwork
                </a>

                <div class="mt-4 grid grid-cols-3 gap-3 text-center">
                  <div class="rounded-lg border border-gray-200 p-3">
                    <p class="text-xs text-gray-500">Exp</p>
                    <p class="text-sm font-semibold text-gray-900">7+ yrs</p>
                  </div>
                  <div class="rounded-lg border border-gray-200 p-3">
                    <p class="text-xs text-gray-500">Platform</p>
                    <p class="text-sm font-semibold text-gray-900">Android · iOS</p>
                  </div>
                  <div class="rounded-lg border border-gray-200 p-3">
                    <p class="text-xs text-gray-500">Rating</p>
                    <p class="text-sm font-semibold text-gray-900">Top-Rated</p>
                  </div>
                </div>

                <ul class="mt-4 space-y-2 text-sm text-gray-700">
                  <li class="flex items-start gap-2"><span class="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500"></span> End-to-end delivery</li>
                  <li class="flex items-start gap-2"><span class="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500"></span> Clean architecture</li>
                  <li class="flex items-start gap-2"><span class="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500"></span> App Store & Play launch</li>
                </ul>

                <div class="mt-5 rounded-xl bg-gray-50 border border-gray-200 p-4">
                  <p class="text-xs text-gray-500">Preferred Stack</p>
                  <p class="mt-1 text-sm font-medium text-gray-900">Flutter · Riverpod/GetX · Firebase · GraphQL · SwiftUI · tvOS</p>
                </div>
              </div>
            </div>

            <div class="rounded-2xl border border-gray-200 bg-white shadow-sm p-5">
              <h5 class="font-semibold text-gray-900">Got a custom idea?</h5>
              <p class="text-sm text-gray-600 mt-1">Tell me about your product and timeline—let’s build it right.</p>
              <a href="mailto:hello@example.com" class="mt-3 inline-flex items-center gap-2 text-cyan-700 hover:text-cyan-900 text-sm font-semibold">
                Email me
              </a>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </section>
</template>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
