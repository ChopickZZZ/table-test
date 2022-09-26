import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'

export const key: InjectionKey<Store<State>> = Symbol()

interface State {
	count: number
}

export const store = createStore<State>({
	state: {
		count: 0
	}
})

export function useStore() {
	return baseUseStore(key)
}