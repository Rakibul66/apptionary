<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

/* --------- DATA (replace with your own later) --------- */
// Recent work cards
const works = ref([
  {
    title: 'Glamgrl',
    tag: 'E-commerce Website',
    cover: 'https://placehold.co/960x600/0b2230/f8fafc?text=GLAMGRL+CASE',
    logo: 'https://placehold.co/140x48/0b2230/98f6fd?text=GLAMGRL',
    href: '#'
  },
  {
    title: 'Fantasy Kingdom',
    tag: 'Android App',
    cover: 'https://placehold.co/960x600/0b2230/f0fdf9?text=FANTASY+KINGDOM',
    logo: 'https://placehold.co/140x48/0b2230/f0fdf9?text=FK',
    href: '#'
  },
  {
    title: 'Goldx',
    tag: 'Fintech Android App',
    cover: 'https://placehold.co/960x600/0b2230/fde68a?text=GOLDX+FINTECH',
    logo: 'https://placehold.co/140x48/0b2230/fde68a?text=GOLDX',
    href: '#'
  },
  // add more…
])

// Logos for the three lanes
const brandLogos = [
  'https://placehold.co/180x72/e5e7eb/0b2230?text=Brand+1',
  'https://placehold.co/180x72/e5e7eb/0b2230?text=Brand+2',
  'https://placehold.co/180x72/e5e7eb/0b2230?text=Brand+3',
  'https://placehold.co/180x72/e5e7eb/0b2230?text=Brand+4',
  'https://placehold.co/180x72/e5e7eb/0b2230?text=Brand+5',
  'https://placehold.co/180x72/e5e7eb/0b2230?text=Brand+6',
]
const partnerLogos = [
  'https://placehold.co/180x72/dbeafe/0b2230?text=Partner+1',
  'https://placehold.co/180x72/dbeafe/0b2230?text=Partner+2',
  'https://placehold.co/180x72/dbeafe/0b2230?text=Partner+3',
  'https://placehold.co/180x72/dbeafe/0b2230?text=Partner+4',
  'https://placehold.co/180x72/dbeafe/0b2230?text=Partner+5',
]
const customerLogos = [
  'https://placehold.co/180x72/ffe4e6/0b2230?text=Customer+1',
  'https://placehold.co/180x72/ffe4e6/0b2230?text=Customer+2',
  'https://placehold.co/180x72/ffe4e6/0b2230?text=Customer+3',
  'https://placehold.co/180x72/ffe4e6/0b2230?text=Customer+4',
  'https://placehold.co/180x72/ffe4e6/0b2230?text=Customer+5',
  'https://placehold.co/180x72/ffe4e6/0b2230?text=Customer+6',
]

/* --------- TABS --------- */
const tabs = ['work', 'brands', 'partners', 'customers']
const active = ref('work')

/* --------- SLIDER (recent work) --------- */
const per = ref(3)
function updatePer() {
  if (window.innerWidth < 640) per.value = 1
  else if (window.innerWidth < 1024) per.value = 2
  else per.value = 3
}
onMounted(() => { updatePer(); window.addEventListener('resize', updatePer) })
onUnmounted(() => window.removeEventListener('resize', updatePer))

const slides = computed(() => {
  const out = []
  for (let i = 0; i < works.value.length; i += per.value) {
    out.push(works.value.slice(i, i + per.value))
  }
  return out.length ? out : [[]]
})

const idx = ref(0)
function next() { idx.value = (idx.value + 1) % slides.value.length }
function prev() { idx.value = (idx.value - 1 + slides.value.length) % slides.value.length }

let timer
function start() { stop(); timer = setInterval(next, 4000) }
function stop() { if (timer) clearInterval(timer) }
onMounted(start)
onUnmounted(stop)

/* Tilt interaction for cards */
function tilt(e) {
  const el = e.currentTarget
  const r = el.getBoundingClientRect()
  const x = (e.clientX - r.left) / r.width
  const y = (e.clientY - r.top) / r.height
  const rx = (y - 0.5) * -8
  const ry = (x - 0.5) * 12
  el.style.setProperty('--rx', `${rx}deg`)
  el.style.setProperty('--ry', `${ry}deg`)
}
function untilt(e) { const el = e.currentTarget; el.style.setProperty('--rx','0deg'); el.style.setProperty('--ry','0deg') }
</script>

<template>
  <section id="recent-work" class="relative bg-[#0f2930] text-white py-20 lg:py-24 overflow-hidden">
    <!-- soft blobs -->
    <div class="pointer-events-none absolute -top-24 -left-24 w-80 h-80 rounded-full bg-cyan-500/20 blur-3xl"></div>
    <div class="pointer-events-none absolute -bottom-24 -right-24 w-[28rem] h-[28rem] rounded-full bg-emerald-400/20 blur-3xl"></div>

    <div class="container mx-auto px-6 relative z-10">
      <!-- Header -->
      <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <p class="tracking-[.35em] text-cyan-300 font-semibold">TOP RECENT WORK</p>
          <h2 class="mt-2 text-3xl md:text-5xl font-extrabold">Brands, Partners & Customers</h2>
          <p class="mt-3 text-gray-300 max-w-2xl">
            A fast glance at recent projects and the companies who trust my work.
          </p>
        </div>

        <!-- Tabs -->
        <div class="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl p-1 self-start">
          <button
            v-for="t in tabs"
            :key="t"
            @click="active = t"
            class="px-3 sm:px-4 py-2 rounded-lg capitalize text-sm sm:text-base transition"
            :class="active === t ? 'bg-cyan-500 text-[#052228] font-semibold' : 'text-gray-200 hover:text-white'"
          >
            {{ t }}
          </button>
        </div>
      </div>

      <!-- Work slider -->
      <div v-show="active==='work'" class="mt-10 relative group" @mouseenter="stop" @mouseleave="start">
        <div class="overflow-hidden rounded-3xl">
          <div class="flex transition-transform duration-700 ease-[cubic-bezier(.22,.61,.36,1)]"
               :style="{ transform: `translateX(-${idx * 100}%)` }">
            <div v-for="(slide, s) in slides" :key="s" class="w-full shrink-0 px-1 sm:px-2">
              <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                <a v-for="(w, i) in slide" :key="w.title + i" :href="w.href"
                   class="group/card relative rounded-2xl bg-[#0b2226] border border-white/10 overflow-hidden
                          shadow-[0_12px_40px_-12px_rgba(0,0,0,.6)] will-change-transform"
                   style="transform: perspective(900px) rotateX(var(--rx,0)) rotateY(var(--ry,0));"
                   @mousemove="tilt" @mouseleave="untilt">
                  <div class="aspect-[16/9] overflow-hidden">
                    <img :src="w.cover" alt="" class="h-full w-full object-cover transition-transform duration-700 group-hover/card:scale-[1.04]" />
                    <div class="absolute left-4 bottom-4 bg-black/50 backdrop-blur px-3 py-1.5 rounded-lg flex items-center gap-2">
                      <img :src="w.logo" alt="" class="h-5" />
                      <span class="text-xs text-gray-100">{{ w.tag }}</span>
                    </div>
                  </div>
                  <div class="p-6">
                    <h3 class="text-2xl font-bold text-cyan-300 group-hover/card:text-cyan-200 transition">{{ w.title }}</h3>
                    <p class="mt-1 text-gray-300">Case study →</p>
                  </div>
                  <div class="absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyan-500/0 via-cyan-500/20 to-emerald-400/0 opacity-0 group-hover/card:opacity-100 blur-xl transition"></div>
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Arrows -->
        <button class="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 h-11 w-11 items-center justify-center
                       rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition shadow-lg"
                @click="prev" aria-label="Previous">‹</button>
        <button class="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 h-11 w-11 items-center justify-center
                       rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition shadow-lg"
                @click="next" aria-label="Next">›</button>
      </div>

      <!-- Logos marquee -->
      <div v-show="active!=='work'" class="mt-10">
        <p class="text-gray-300 mb-4" v-if="active==='brands'">Trusted by these brands</p>
        <p class="text-gray-300 mb-4" v-else-if="active==='partners'">Built with great partners</p>
        <p class="text-gray-300 mb-4" v-else>Happy customers</p>

        <div class="rounded-2xl bg-white/5 border border-white/10 overflow-hidden p-4">
          <!-- row 1 -->
          <div class="marquee">
            <div class="marquee-track">
              <img v-for="(src, i) in (active==='brands' ? brandLogos : active==='partners' ? partnerLogos : customerLogos)"
                   :key="'m1'+i" :src="src" class="logo" alt="" />
              <!-- duplicate for seamless loop -->
              <img v-for="(src, i) in (active==='brands' ? brandLogos : active==='partners' ? partnerLogos : customerLogos)"
                   :key="'m1b'+i" :src="src" class="logo" alt="" />
            </div>
          </div>
          <!-- row 2 (reverse direction) -->
          <div class="marquee reverse mt-3">
            <div class="marquee-track">
              <img v-for="(src, i) in (active==='brands' ? brandLogos : active==='partners' ? partnerLogos : customerLogos)"
                   :key="'m2'+i" :src="src" class="logo" alt="" />
              <img v-for="(src, i) in (active==='brands' ? brandLogos : active==='partners' ? partnerLogos : customerLogos)"
                   :key="'m2b'+i" :src="src" class="logo" alt="" />
            </div>
          </div>
        </div>
      </div>

      <!-- CTA -->
      <div class="mt-10 flex justify-center">
        <a href="#projects" class="inline-flex items-center justify-center px-6 py-3 rounded-xl
                 font-semibold text-[#052228] bg-cyan-400 hover:bg-cyan-300
                 shadow-[0_18px_35px_-12px_rgba(34,211,238,.45)] transition">
          View All Case Studies
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* marquee */
.marquee { overflow: hidden; }
.marquee-track {
  display: flex;
  align-items: center;
  gap: 2.5rem;
  animation: marquee 22s linear infinite;
}
.marquee.reverse .marquee-track { animation-direction: reverse; }
.logo {
  height: 44px;
  filter: grayscale(100%) opacity(80%);
  transition: filter .25s ease, transform .25s ease;
}
.logo:hover {
  filter: grayscale(0%) opacity(100%);
  transform: translateY(-2px);
}
@keyframes marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
</style>
