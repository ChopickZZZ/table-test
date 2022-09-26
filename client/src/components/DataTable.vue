<script setup lang="ts">
import { Header, Item } from '../types'
defineProps<{
	headers: Header[],
	items: Item[]
}>()
</script>

<template>
	<table class="table">
		<thead class="table__head">
			<tr>
				<th v-for="header in headers" :key="header.value">
					{{header.text}}
				</th>
			</tr>
		</thead>
		<tbody class="table__body">
			<tr v-for="item in items" :key="item.id">
				<td>{{item.date}}</td>
				<td>{{item.title}}</td>
				<td>{{item.amount}}</td>
				<td>{{item.distance}}</td>
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
	}

	&__body td {
		vertical-align: top;
	}

	&__body tr:nth-child(even) {
		background-color: #f3f3f3;
	}
}
</style>