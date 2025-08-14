<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

/* 👉 Edit these numbers/texts any time */
const stats = ref([
  { value: 11, label: 'Android Apps' },
  { value: 7,  label: 'Web Apps' },
  { value: 32, label: 'Certificates' },
  { value: 3,  label: 'Job Experiences' },
])

/* animated values */
const shown = ref(stats.value.map(() => 0))
let hasAnimated = false
let rafId

function animateCounters(duration = 1400) {
  if (hasAnimated) return
  hasAnimated = true
  const start = performance.now()
  cancelAnimationFrame(rafId)

  function tick(now) {
    const t = Math.min(1, (now - start) / duration)
    // easeOutCubic
    const e = (x) => 1 - Math.pow(1 - x, 3)
    const k = e(t)
    shown.value = stats.value.map(s => Math.round(s.value * k))
    if (t < 1) rafId = requestAnimationFrame(tick)
  }
  rafId = requestAnimationFrame(tick)
}

/* trigger when section enters viewport */
let observer
const container = ref(null)
onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    if (entries.some(e => e.isIntersecting)) animateCounters()
  }, { threshold: 0.35 })
  if (container.value) observer.observe(container.value)
})
onUnmounted(() => {
  if (observer && container.value) observer.unobserve(container.value)
  cancelAnimationFrame(rafId)
})

/* subtle parallax on the illustration */
function tilt(e) {
  const el = e.currentTarget
  const r = el.getBoundingClientRect()
  const x = (e.clientX - r.left) / r.width
  const y = (e.clientY - r.top) / r.height
  const rx = (y - 0.5) * -6
  const ry = (x - 0.5) * 10
  el.style.setProperty('--rx', `${rx}deg`)
  el.style.setProperty('--ry', `${ry}deg`)
}
function resetTilt(e) {
  const el = e.currentTarget
  el.style.setProperty('--rx', '0deg')
  el.style.setProperty('--ry', '0deg')
}
</script>

<template>
  <section ref="container" class="relative bg-[#0f3a3a] text-white overflow-hidden">
    <!-- soft background blobs -->
    <div class="pointer-events-none absolute -top-24 -left-24 w-80 h-80 rounded-full bg-cyan-500/20 blur-3xl"></div>
    <div class="pointer-events-none absolute -bottom-24 -right-24 w-[28rem] h-[28rem] rounded-full bg-emerald-400/20 blur-3xl"></div>

    <div class="container mx-auto px-6 py-20 lg:py-24 grid lg:grid-cols-2 gap-12 items-center">
      <!-- LEFT: Title + Stats card -->
      <div>
        <p class="tracking-[.35em] text-cyan-300 font-semibold">MY FEATURED SKILLS</p>
        <h2 class="mt-3 text-3xl md:text-5xl font-extrabold leading-tight">
          Some Interesting Facts<br class="hidden sm:block" /> About Me.
        </h2>

        <!-- Glassy stats card -->
        <div
          class="mt-10 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md shadow-[0_20px_60px_-20px_rgba(0,0,0,.6)] overflow-hidden"
        >
          <div class="grid grid-cols-2 divide-x divide-y divide-white/10">
            <div
              v-for="(s, i) in stats"
              :key="s.label"
              class="px-6 py-10 sm:px-10 sm:py-12 text-center"
            >
              <div class="text-5xl font-black text-cyan-400 tabular-nums">
                {{ shown[i] }}
              </div>
              <div class="mt-3 text-gray-300 font-semibold">
                {{ s.label }}
              </div>
            </div>
          </div>

          <!-- shimmering top border accent -->
          <div class="h-[2px] w-full bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent animate-[shine_3.5s_linear_infinite]"></div>
        </div>
      </div>

      <!-- RIGHT: Illustration (no local asset needed) -->
      <div
        class="relative will-change-transform select-none"
        style="transform: perspective(1000px) rotateX(var(--rx,0)) rotateY(var(--ry,0));"
        @mousemove="tilt"
        @mouseleave="resetTilt"
      >
        <img
          src="https://placehold.co/980x900/0b2226/fafafa?text=FEATURED+SKILLS+ILLUSTRATION"
          alt="Featured skills illustration"
          class="w-full max-w-2xl mx-auto rounded-3xl drop-shadow-xl"
          loading="lazy"
        />
        <!-- soft glow -->
        <div class="pointer-events-none absolute -inset-6 rounded-[2rem] bg-cyan-400/10 blur-3xl"></div>
      </div>
    </div>

    <!-- bottom fade -->
    <div class="h-10 bg-gradient-to-b from-transparent to-[#0f3a3a]"></div>
  </section>
</template>

<style scoped>
@keyframes shine { from { transform: translateX(-100%) } to { transform: translateX(100%) } }
</style>
