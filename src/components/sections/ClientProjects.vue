<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

/**
 * Replace the logos with your own (public/assets/*.png or full URLs).
 * Remote placeholders are used so you won’t get missing-file errors.
 */
const projects = ref([
  {
    name: 'Glamgrl',
    kind: 'Website',
    logo: 'https://placehold.co/800x420/0b2230/98f6fd?text=GLAMGRL',
    url: '#'
  },
  {
    name: 'Fantasy Kingdom',
    kind: 'Android App',
    logo: 'https://placehold.co/800x420/0b2230/f0fdf9?text=FANTASY+KINGDOM',
    url: '#'
  },
  {
    name: 'Goldx',
    kind: 'Android App',
    logo: 'https://placehold.co/800x420/0b2230/fde68a?text=GOLDX',
    url: '#'
  },
  // add more items…
])

/** Responsive items-per-slide (1 / 2 / 3) */
const per = ref(3)
function updatePer() {
  if (window.innerWidth < 640) per.value = 1
  else if (window.innerWidth < 1024) per.value = 2
  else per.value = 3
}
onMounted(() => {
  updatePer()
  window.addEventListener('resize', updatePer)
})
onUnmounted(() => window.removeEventListener('resize', updatePer))

/** chunk projects into slides */
const slides = computed(() => {
  const out = []
  for (let i = 0; i < projects.value.length; i += per.value) {
    out.push(projects.value.slice(i, i + per.value))
  }
  return out.length ? out : [[]]
})

/** carousel state */
const idx = ref(0)
function next() { idx.value = (idx.value + 1) % slides.value.length }
function prev() { idx.value = (idx.value - 1 + slides.value.length) % slides.value.length }

/** autoplay (pause on hover) */
let timer
function start() { stop(); timer = setInterval(next, 4500) }
function stop() { if (timer) clearInterval(timer) }
onMounted(start)
onUnmounted(stop)

/** tiny 3D tilt on card */
function handleTilt(e) {
  const card = e.currentTarget
  const rect = card.getBoundingClientRect()
  const x = (e.clientX - rect.left) / rect.width
  const y = (e.clientY - rect.top) / rect.height
  const rx = (y - 0.5) * -8
  const ry = (x - 0.5) * 12
  card.style.setProperty('--rx', `${rx}deg`)
  card.style.setProperty('--ry', `${ry}deg`)
}
function resetTilt(e) {
  const card = e.currentTarget
  card.style.setProperty('--rx', '0deg')
  card.style.setProperty('--ry', '0deg')
}
</script>

<template>
  <section id="client-projects" class="relative bg-[#0f2930] text-white py-20 lg:py-24 overflow-hidden">
    <!-- soft background blobs -->
    <div class="pointer-events-none absolute -top-24 -left-24 w-80 h-80 rounded-full bg-cyan-500/20 blur-3xl"></div>
    <div class="pointer-events-none absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-emerald-400/20 blur-3xl"></div>

    <div class="container mx-auto px-6 relative z-10">
      <h2 class="text-center text-3xl md:text-5xl font-extrabold tracking-wider text-cyan-300">
        CLIENT PROJECTS
      </h2>

      <!-- Slider -->
      <div
        class="mt-12 lg:mt-16 relative group"
        @mouseenter="stop"
        @mouseleave="start"
      >
        <!-- Track -->
        <div class="overflow-hidden rounded-3xl">
          <div
            class="flex transition-transform duration-700 ease-[cubic-bezier(.22,.61,.36,1)]"
            :style="{ transform: `translateX(-${idx * 100}%)` }"
          >
            <!-- Each slide -->
            <div
              v-for="(slide, s) in slides"
              :key="s"
              class="w-full shrink-0 px-1 sm:px-2"
              :style="{ width: '100%' }"
            >
              <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                <!-- Card -->
                <a
                  v-for="(p, i) in slide"
                  :key="p.name + i"
                  :href="p.url"
                  class="group/card relative rounded-2xl bg-[#0b2226] border border-white/10 overflow-hidden
                         shadow-[0_12px_40px_-12px_rgba(0,0,0,.6)]
                         will-change-transform"
                  style="transform: perspective(900px) rotateX(var(--rx,0)) rotateY(var(--ry,0));"
                  @mousemove="handleTilt"
                  @mouseleave="resetTilt"
                >
                  <!-- Shine border -->
                  <div class="pointer-events-none absolute inset-0 rounded-2xl border border-transparent
                              shine-border"></div>

                  <!-- Media -->
                  <div class="aspect-[16/9] overflow-hidden">
                    <img
                      :src="p.logo"
                      alt=""
                      class="h-full w-full object-contain bg-[#0b2226] transition-transform duration-700 group-hover/card:scale-[1.04]"
                      loading="lazy"
                    />
                    <!-- Ken Burns subtle zoom overlay -->
                    <div class="absolute inset-0 pointer-events-none kenburns"></div>
                  </div>

                  <!-- Content -->
                  <div class="p-6">
                    <h3 class="text-2xl font-bold text-cyan-300 group-hover/card:text-cyan-200 transition">
                      {{ p.name }}
                    </h3>
                    <p class="mt-2 text-gray-300">{{ p.kind }}</p>
                  </div>

                  <!-- Glow on hover -->
                  <div class="absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyan-500/0 via-cyan-500/20 to-emerald-400/0
                              opacity-0 group-hover/card:opacity-100 blur-xl transition"></div>
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Arrows -->
        <button
          class="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 h-11 w-11 items-center justify-center
                 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition shadow-lg"
          @click="prev"
          aria-label="Previous"
        >
          ‹
        </button>
        <button
          class="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 h-11 w-11 items-center justify-center
                 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition shadow-lg"
          @click="next"
          aria-label="Next"
        >
          ›
        </button>

        <!-- Dots -->
        <div class="mt-8 flex items-center justify-center gap-3">
          <button
            v-for="(dot, d) in slides.length"
            :key="d"
            class="h-3 w-3 rounded-full transition"
            :class="d === idx ? 'bg-cyan-400 scale-110' : 'bg-white/30 hover:bg-white/60'"
            @click="idx = d"
            aria-label="Go to slide"
          />
        </div>

        <!-- Magnetic See More -->
        <div class="mt-10 flex justify-center">
          <a
            href="#projects"
            class="relative inline-flex items-center justify-center px-8 py-3 rounded-xl
                   font-semibold text-[#052228] bg-cyan-400 hover:bg-cyan-300
                   shadow-[0_18px_35px_-12px_rgba(34,211,238,.45)]
                   transition-transform will-change-transform magnetic"
          >
            See More
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* shimmering border sweep */
.shine-border::before{
  content:'';
  position:absolute; inset:0; border-radius:inherit;
  padding:1px; background:
  linear-gradient(120deg, rgba(34,211,238,0.0) 0%, rgba(34,211,238,0.5) 50%, rgba(16,185,129,0.0) 100%);
  -webkit-mask: 
     linear-gradient(#000 0 0) content-box, 
     linear-gradient(#000 0 0);
  -webkit-mask-composite: xor; mask-composite: exclude;
  animation: sweep 3s linear infinite;
  opacity:.65;
}
@keyframes sweep { 
  0% { transform: translateX(-100%) }
  100% { transform: translateX(100%) }
}

/* very subtle ken-burns overlay to make logos feel alive */
.kenburns { animation: kb 8s ease-in-out infinite; }
@keyframes kb {
  0%, 100% { transform: scale(1); opacity:.15 }
  50% { transform: scale(1.04); opacity:.25 }
}

/* magnetic button */
.magnetic { transition: transform .15s ease; }
.magnetic:hover { transform: translateY(-2px); }
</style>
