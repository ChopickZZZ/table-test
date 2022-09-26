import './style.scss'
import App from './App.vue'
import { createApp } from 'vue'
import { store, key } from './store'
import router from './router'

createApp(App)
	.use(store, key)
	.use(router)
	.mount('#app')