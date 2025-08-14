<!-- components/header/HeroSection.vue -->
<template>
  <section class="relative overflow-hidden bg-gradient-to-r from-[#0f172a] to-[#0e7490] text-white pt-24 pb-16">
    <!-- Decorative shapes -->
    <div class="absolute top-0 left-0 w-40 h-40 bg-pink-500/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
    <div class="absolute bottom-0 right-0 w-72 h-72 bg-emerald-400/20 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>

    <div class="container mx-auto px-6 relative z-10 grid md:grid-cols-2 items-center gap-12">
      <!-- Left Content -->
      <div>
        <h1 class="text-4xl md:text-5xl font-extrabold leading-tight">
          👋 Hello world! <br />
          I am <span class="text-cyan-400">Mubeen UI Alam</span>
        </h1>
        <p class="mt-4 text-lg text-gray-300 max-w-lg">
          Crafting modern, high-performance <span class="text-cyan-300">web</span> and
          <span class="text-cyan-300">mobile apps</span> that delight users.
        </p>
        <div class="mt-6 flex gap-4">
          <a
            href="#projects"
            class="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 rounded-lg font-semibold shadow-lg transition-transform hover:-translate-y-0.5"
          >
            🚀 View My Work
          </a>
          <a
            href="#contact"
            class="px-6 py-3 border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-white rounded-lg font-semibold transition-colors"
          >
            📩 Contact Me
          </a>
        </div>
      </div>

      <!-- Right Illustration -->
      <div class="relative">
        <img
          src="/assets/dev-illustration.svg"
          alt="Developer at work"
          class="drop-shadow-xl animate-float"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
  100% { transform: translateY(0px); }
}
.animate-float {
  animation: float 4s ease-in-out infinite;
}
</style>
