<script
  setup>  import { useRoute } from 'vue-router'
   import AppHeader from './components/header/AppHeader.vue'
    import AppFooter from './components/AppFooter.vue'
     import ScrollToTop from './components/ScrollToTop.vue' 
     const route = useRoute() 
     </script>
<template>
  <div class="bg-white font-sans">
    <AppHeader /> <!-- 64px bar: give pages (except Home hero) breathing room -->
    <main :class="route.name === 'Home' ? '' : 'pt-16'"> <router-view /> </main>
    <AppFooter />
    <ScrollToTop />
  </div>
</template>