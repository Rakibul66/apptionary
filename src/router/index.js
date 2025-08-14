import { createRouter, createWebHistory } from 'vue-router'

// lazy import, relative path (no alias)
const Home = () => import('../views/Home.vue')

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: { template: '<div />' } },
]

export default createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 }),
})
