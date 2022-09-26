<script setup lang="ts">
import FilterData from './FilterData.vue'
import { ref, Ref } from 'vue'
import { Filter, Header, Item, Order } from '../types'
const props = defineProps<{
	headers: Header[],
	items: Item[]
}>()
const rows: Ref<Item[]> = ref([...props.items])
const sort = (value: keyof Item, order: Order) => {
	rows.value = rows.value.sort((row1, row2) => {
		if (order === 'to-bottom') {
			[row1, row2] = [row2, row1]
		}
		if (row1[value] > row2[value]) return 1
		if (row1[value] < row2[value]) return -1
		return 0
	})
}
const filterItems = ({ column, condition, inputValue }: Filter) => {
	console.log(new Date('30.08.2022'.split('.').reverse().join('-')).getTime())
	switch (condition) {
		case 'equal': {
			rows.value = rows.value.filter(row => String(row[column]) === inputValue)
			break
		}
		case 'contains': {
			rows.value = rows.value.filter(row => String(row[column]).includes(inputValue))
			break
		}
		case 'more': {
			rows.value = rows.value.filter(row => row[column] > inputValue)
			break
		}
		case 'less': {
			rows.value = rows.value.filter(row => row[column] < inputValue)
			break
		}
	}
}
const cancelFilter = () => rows.value = props.items
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
					<FilterData @filter="filterItems" @cancel="cancelFilter" />
				</td>
			</tr>
		</tbody>
	</table>
</template>

<style scoped lang="scss">
.table {
	width: 100%;

	&__head th,
	&__body td {
		font-size: 1.4rem;
		text-align: left;
		border: none;
		padding: 1rem 1.5rem;
	}

	&__head th {
		font-weight: bold;
		background-color: #d8d8d8;
	}

	&__head th:first-child,
	&__body tr:first-child {
		border-radius: 8px 0 0 8px;
	}

	&__head th:last-child,
	&__body tr:last-child {
		border-radius: 0 8px 8px 0;
		background-color: #d8d8d8;
	}

	&__body td {
		vertical-align: top;
	}

	&__body tr:nth-child(even) {
		background-color: #f3f3f3;
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

.sort-container {
	display: flex;
	flex-direction: column;

	svg {
		display: inline-block;
		font-size: 1.6rem;
		color: #908986;
		transition: .3s ease;
		cursor: pointer;
	}

	svg:hover {
		color: #4d423d;
	}
}
</style>