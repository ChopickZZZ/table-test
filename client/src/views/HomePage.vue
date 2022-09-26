<script setup lang="ts">
import DataTable from '../components/DataTable.vue'
import { Header, Item } from '../types'
const headers: Header[] = [
	{ text: 'Дата', value: 'date' },
	{ text: 'Название', value: 'title' },
	{ text: 'Количество', value: 'amount' },
	{ text: 'Расстояние', value: 'distance' },
]
const items: Item[] = [
	{ id: 1, date: '22.08.2022', title: 'Яблоки', amount: 50, distance: 156 },
	{ id: 2, date: '05.07.2022', title: 'Груши', amount: 20, distance: 6 },
	{ id: 3, date: '21.02.2022', title: 'Инжир', amount: 30, distance: 15 },
	{ id: 4, date: '15.03.2022', title: 'Тыквы', amount: 45, distance: 136 },
	{ id: 5, date: '13.08.2022', title: 'Сливы', amount: 15, distance: 121 },
	{ id: 6, date: '08.10.2022', title: 'Поидоры', amount: 65, distance: 1560 },
	{ id: 7, date: '06.12.2022', title: 'Огурцы', amount: 900, distance: 109 },
	{ id: 8, date: '01.11.2022', title: 'Кабачки', amount: 789, distance: 187 },
	{ id: 9, date: '30.04.2022', title: 'Картошки', amount: 150, distance: 122 },
	{ id: 10, date: '19.08.2022', title: 'Арбузы', amount: 432, distance: 178 },
]
</script>

<template>
	<div class="container">
		<DataTable :headers="headers" :items="items" />
	</div>
</template>

<style scoped lang="scss">
.container {
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>