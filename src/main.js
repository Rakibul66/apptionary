// src/main.js
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// 1. Import the router
import router from './router'

// 2. Use the router in the app
createApp(App).use(router).mount('#app')