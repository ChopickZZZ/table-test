<script setup lang="ts">
import AppDropDown from './AppDropDown.vue';
import { ref, reactive } from 'vue';
import { Condition, Header, Item, Filter } from '../types';
const emit = defineEmits<{
	(event: 'filter', filterBase: Filter): void,
	(event: 'cancel'): void
}>()
const columnModel = ref('')
const conditionModel = ref('')
const inputValue = reactive({
	value: '',
	err: false
})
const columnBase: Header[] = [
	{ text: 'Дата', value: 'date' },
	{ text: 'Название', value: 'title' },
	{ text: 'Количество', value: 'amount' },
	{ text: 'Расстояние', value: 'distance' },
]
const conditionBase: Condition[] = [
	{ text: 'Равно', value: 'equal' },
	{ text: 'Содержит', value: 'contains' },
	{ text: 'Больше', value: 'more' },
	{ text: 'Меньше', value: 'less' },
]
const filter = () => {
	if (!inputValue.value) {
		inputValue.err = true
		return
	}
	emit('filter', {
		column: columnModel.value as keyof Item,
		condition: conditionModel.value as keyof Condition[],
		inputValue: inputValue.value as string
	})
}
const cancel = () => {
	inputValue.value = ''
	inputValue.err = false
	emit('cancel')
}
</script>

<template>
	<div class="filter-container">
		<AppDropDown title="Колонка" :list="columnBase" @pick-item="(val) => columnModel = val" />
		<AppDropDown title="Условие" :list="conditionBase" @pick-item="(val) => conditionModel = val" />
		<div class="input-container">
			<label for="value">Значение</label>
			<input id="value" type="text" placeholder="Введите значение" v-model="inputValue.value"
				:class="{invalid: inputValue.err}" @input="inputValue.err = false">
		</div>
		<button @click="filter">Фильтровать</button>
		<button @click="cancel">Отмена</button>
	</div>
</template>

<style scoped lang="scss">
.input-container {
	display: flex;
	align-items: center;
}

.input-container input {
	display: inline-block;
	padding: .5rem .75rem;
	outline: none;
	font-size: 1.4rem;
	border: 1px solid #999999;
}

.input-container input.invalid {
	border-color: red;
}

.filter-container {
	display: flex;
}
</style>