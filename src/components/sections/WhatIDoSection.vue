<template>
  <section id="what-i-do" class="relative bg-[#0f3a3a] text-white">
    <!-- top spacing so it never hides behind fixed navbar -->
    <div class="container mx-auto px-6 py-20 lg:py-24 grid lg:grid-cols-2 gap-12 items-center">
      
      <!-- Illustration -->
      <div class="relative order-2 lg:order-1">
        <!-- Replace src with your own illustration -->
        <img
          src="/assets/what-i-do-illustration.svg"
          alt="Multitasking developer illustration"
          class="w-full max-w-xl mx-auto drop-shadow-xl"
        />
        <!-- soft blob behind image -->
        <div
          class="pointer-events-none absolute -z-10 -top-6 -left-10 w-80 h-80 rounded-[40%] bg-white/10 blur-2xl"
        ></div>
      </div>

      <!-- Text + Cards -->
      <div class="order-1 lg:order-2">
        <p class="tracking-[.35em] text-cyan-300 font-semibold">WHAT I DO ?</p>
        <h2 class="mt-2 text-3xl md:text-4xl font-extrabold">
          Innovative solutions to grow your creative projects
        </h2>

        <!-- Cards -->
        <div class="mt-10 grid sm:grid-cols-2 gap-6">
          <!-- Web App -->
          <div
            class="group rounded-2xl bg-[#0b2226]/90 border border-white/10 p-6 lg:p-8 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)] transition
                   hover:-translate-y-1 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.7)]"
          >
            <div class="flex items-center gap-4">
              <span
                class="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-cyan-500/20"
              >
                <!-- Globe icon -->
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-6 w-6">
                  <path fill="currentColor" d="M12 2a10 10 0 100 20 10 10 0 000-20Zm7.93 9h-3.18a15.9 15.9 0 00-1.05-5.17A8.02 8.02 0 0119.93 11ZM12 4c.84 0 2.4 2.37 2.93 7H9.07c.53-4.63 2.09-7 2.93-7ZM4.07 13h3.18c.53 2.94 1.49 4.89 2.26 5.87A8.02 8.02 0 014.07 13Zm3.18-2H4.07A8.02 8.02 0 018.51 5.3C7.74 6.28 6.78 8.23 6.25 11Zm4.75 8c-.84 0-2.4-2.37-2.93-7h5.86c-.53 4.63-2.09 7-2.93 7Zm1.74-.13c.77-.98 1.73-2.93 2.26-5.87h3.18a8.02 8.02 0 01-5.44 5.87Z"/>
                </svg>
              </span>
              <h3 class="text-xl font-bold">Web Application<br />Development</h3>
            </div>
            <p class="mt-4 text-gray-300 leading-relaxed">
              Everywhere &amp; every device, your site will flow seamlessly with
              responsive, accessible, and blazing-fast UX.
            </p>
          </div>

          <!-- Android App -->
          <div
            class="group rounded-2xl bg-[#0b2226]/90 border border-white/10 p-6 lg:p-8 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)] transition
                   hover:-translate-y-1 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.7)]"
          >
            <div class="flex items-center gap-4">
              <span
                class="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-cyan-500/20"
              >
                <!-- Phone icon -->
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-6 w-6">
                  <path fill="currentColor" d="M17 1H7a2 2 0 00-2 2v18a2 2 0 002 2h10a2 2 0 002-2V3a2 2 0 00-2-2Zm0 18H7V5h10v14Zm-5 3a1 1 0 110-2 1 1 0 010 2Z"/>
                </svg>
              </span>
              <h3 class="text-xl font-bold">Android Application<br />Development</h3>
            </div>
            <p class="mt-4 text-gray-300 leading-relaxed">
              Bring your mobile app ideas to life with clean architecture,
              offline-first data, and buttery animations.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- subtle bottom fade -->
    <div class="h-10 bg-gradient-to-b from-transparent to-[#0f3a3a]"></div>
  </section>
</template>
