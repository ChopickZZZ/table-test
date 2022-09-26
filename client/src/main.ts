import './style.scss'
import App from './App.vue'
import router from './router'
import clickOutside from './plugins/clickOutside'
import { createApp } from 'vue'
import { store, key } from './store'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCaretUp, faCaretDown, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'

library.add(faCaretUp, faCaretDown, faChevronLeft, faChevronRight)

const tableApp = createApp(App)

tableApp
	.component('fa-icon', FontAwesomeIcon)
	.use(clickOutside)
	.use(store, key)
	.use(router)
	.mount('#app')