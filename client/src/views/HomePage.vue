<script setup lang="ts">
import DataTable from '../components/DataTable.vue'
import { Header } from '../types'

const headers: Header[] = [
	{ text: 'Дата', value: 'date' },
	{ text: 'Название', value: 'title' },
	{ text: 'Количество', value: 'amount' },
	{ text: 'Расстояние', value: 'distance' },
]
</script>

<template>
	<div class="container">
		<DataTable :headers="headers" />
	</div>
</template>

<style scoped lang="scss">
.container {
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>