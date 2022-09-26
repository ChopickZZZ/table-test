<script setup lang="ts">
import FilterData from './FilterData.vue'
import PaginationData from './PaginationData.vue'
import { Ref, computed } from 'vue'
import { Filter, Header, Item, Order } from '../types'
import { useStore } from '../store';

defineProps<{
	headers: Header[]
}>()

const store = useStore()
await store.dispatch('fetchItems')
await store.dispatch('fetchRowsLength')
const rows: Ref<Item[]> = computed(() => store.state.items)

const sort = (value: keyof Item, order: Order) => {
	store.commit('SORT_ITEMS', { value, order })
}

const filterItems = ({ column, condition, inputValue }: Filter) => {
	store.commit('FILTER_ITEMS', { column, condition, inputValue })
}

const movePage = (target: 'next' | 'prev') => {
	store.dispatch('movePage', target)
}

const cancelFilter = async () => await store.dispatch('fetchItems')
</script>

<template>
	<table class="table">
		<thead class="table__head head">
			<tr>
				<th class="head__cell" v-for="header in headers" :key="header.value">
					<div class="head__inner">
						{{header.text}}
						<div class="sort-container">
							<fa-icon @click="sort(header.value as keyof Item, 'to-bottom')" icon="fa-caret-up"></fa-icon>
							<fa-icon @click="sort(header.value as keyof Item, 'to-top')" icon="fa-caret-down"></fa-icon>
						</div>
					</div>
				</th>
			</tr>
		</thead>
		<tbody class="table__body body">
			<tr v-for="row in rows" :key="row.id">
				<td class="body__cell">{{row.date}}</td>
				<td class="body__cell">{{row.title}}</td>
				<td class="body__cell">{{row.amount}}</td>
				<td class="body__cell">{{row.distance}}</td>
			</tr>
			<tr>
				<td :colspan="headers.length">
					<div class="body__tools">
						<FilterData @filter="filterItems" @cancel="cancelFilter" />
						<PaginationData @paginate="movePage" />
					</div>
				</td>
			</tr>
		</tbody>
	</table>
</template>

<style scoped lang="scss">
.table {
	margin: 10rem 0;
	width: 100%;
	box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);

	&__head th,
	&__body td {
		font-size: 1.4rem;
		text-align: left;
		border: none;
		padding: 1rem 1.5rem;
		color: #fff;
	}

	&__head th {
		font-weight: bold;
		background-color: #55608f;
	}

	&__head th:first-child,
	&__body tr:first-child {
		border-radius: 8px 0 0 8px;
	}

	&__head th:last-child,
	&__body tr:last-child {
		border-radius: 0 8px 8px 0;
	}

	&__body td {
		vertical-align: top;
		background-color: rgba(255, 255, 255, 0.2);
	}
}

.head {
	&__inner {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	&__cell:first-child .sort-container {
		display: none;
	}
}

.body {
	&__tools {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
}

.sort-container {
	display: flex;
	flex-direction: column;

	svg {
		display: inline-block;
		font-size: 1.6rem;
		color: #fff;
		transition: .3s ease;
		cursor: pointer;
	}

	svg:hover {
		color: darken(#fff, 25)
	}
}
</style>