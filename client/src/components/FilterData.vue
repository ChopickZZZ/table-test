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
	<div class="filter">
		<AppDropDown title="Колонка" :list="columnBase" @pick-item="(val) => columnModel = val" />
		<AppDropDown title="Условие" :list="conditionBase" @pick-item="(val) => conditionModel = val" />
		<div class="filter__input-container">
			<label class="filter__label" for="value">Значение</label>
			<input class="filter__input" id="value" type="text" placeholder="Введите значение" v-model="inputValue.value"
				:class="{invalid: inputValue.err}" @input="inputValue.err = false">
		</div>
		<div class="filter__btn-container">
			<button class="filter__btn" @click="filter">Фильтровать</button>
			<button class="filter__btn" @click="cancel">Отмена</button>
		</div>
	</div>
</template>

<style scoped lang="scss">
.input-container input.invalid {
	border-color: red;
}

.filter {
	display: flex;

	&__input-container {
		display: flex;
		align-items: center;
		margin-right: 1.5rem;
	}

	&__label {
		margin-right: 1rem;
	}

	&__input {
		display: inline-block;
		padding: .5rem .75rem;
		outline: none;
		font-size: 1.4rem;
		color: #fff;
		background-color: transparent;
		border-radius: 5px;
		border: 1px solid #5f2c82;
		transition: border-color .25s ease;
	}

	&__input.invalid {
		border-color: red;
	}

	&__input::placeholder {
		color: inherit;
	}

	&__btn-container {
		display: flex;
		gap: 1rem;
	}

	&__btn {
		display: inline-flex;
		padding: .5rem .75rem;
		border: 1px solid #5f2c82;
		outline: none;
		color: #fff;
		background-color: #58518b;
		border-radius: 5px;
		transition: .35s ease;
		cursor: pointer;
	}

	&__btn:hover {
		background-color: darken(#58518b, 10);
	}
}
</style>