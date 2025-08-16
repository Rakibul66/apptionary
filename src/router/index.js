// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import PersonalProjectsPage from '../views/PersonalProjectsPage.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'Home', component: Home, meta: { overlapHeader: true } },
    { path: '/portfolio', name: 'Portfolio', component: PersonalProjectsPage, meta: { overlapHeader: true } },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: { template: '<div />' } },
  ],
  scrollBehavior(to) {
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  },
})
