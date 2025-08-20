<template>
  <footer class="bg-[#0f2930] text-gray-300">
    <!-- subtle top divider -->
    <div class="border-t border-white/10"></div>

    <div class="container mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-3">
      <p class="text-sm">
        © {{ year }} <span class="font-semibold text-white">{{ owner }}</span>. All rights reserved.
      </p>


    </div>
  </footer>
</template>

<script setup>
const owner = 'Md.Rakibul Hasan' // ← change if needed
const year = new Date().getFullYear()
</script>
