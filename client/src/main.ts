import './style.scss'
import App from './App.vue'
import { createApp } from 'vue'
import { store, key } from './store'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons'

library.add(faCaretUp, faCaretDown)

const tableApp = createApp(App)

tableApp
	.component('fa-icon', FontAwesomeIcon)
	.use(store, key)
	.use(router)
	.mount('#app')