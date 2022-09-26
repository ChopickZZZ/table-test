import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import { Filter, Item, Order } from '../types'
import { dateParser } from '../use/date'

export const key: InjectionKey<Store<State>> = Symbol()

interface State {
	items: Item[],
	limit: number,
	itemsLength: number,
	offset: number
}

export const store = createStore<State>({
	state: {
		items: [],
		itemsLength: 0,
		limit: 10,
		offset: 0
	},
	getters: {
		getItems: state => state.items
	},
	mutations: {
		SET_ITEMS(state, items: Item[]) {
			items = items.map(item => {
				return { ...item, date: dateParser(item.cur_date) }
			})
			state.items = items
		},
		SET_ITEMS_LENGTH(state, length: number) {
			state.itemsLength = length
		},
		CHANGE_OFFSET(state, target: 'next' | 'prev') {
			if (target === 'next') {
				if (!(state.offset + state.limit >= state.itemsLength)) {
					state.offset += state.limit
				}
			}
			else {
				if (state.offset >= state.limit) {
					state.offset -= state.limit
				}
				else state.offset = 0
			}
		},
		SORT_ITEMS(state, { value, order }: { value: keyof Item, order: Order }) {
			state.items = state.items.sort((row1, row2) => {
				if (order === 'to-bottom') {
					[row1, row2] = [row2, row1]
				}

				if (row1[value] > row2[value]) return 1
				if (row1[value] < row2[value]) return -1
				return 0
			})
		},
		FILTER_ITEMS(state, { column, condition, inputValue }: Filter) {
			switch (condition) {
				case 'equal': {
					state.items = state.items.filter(row => {
						String(row[column]).toUpperCase() === inputValue.toUpperCase()
					})
					break
				}
				case 'contains': {
					state.items = state.items.filter(row => {
						return String(row[column]).toUpperCase().includes(inputValue.toUpperCase())
					})
					break
				}
				case 'more': {
					state.items = state.items.filter(row => row[column] > inputValue)
					break
				}
				case 'less': {
					state.items = state.items.filter(row => row[column] < inputValue)
					break
				}
			}
		}
	},
	actions: {
		async fetchItems({ state, commit }) {
			return new Promise(async (resolve) => {
				const res = await fetch(`/api/row?limit=${state.limit}&offset=${state.offset}`)
				const items = await res.json()
				if (items.length) {
					commit('SET_ITEMS', items)
				}
				resolve(items)
			})
		},
		async fetchRowsLength({ commit }) {
			const res = await fetch(`/api/row`)
			const data = await res.json()
			commit('SET_ITEMS_LENGTH', data.length)
		},
		async movePage({ dispatch, commit }, target: 'next' | 'prev') {
			commit('CHANGE_OFFSET', target)
			await dispatch('fetchItems')
		}
	}
})

export function useStore() {
	return baseUseStore(key)
}