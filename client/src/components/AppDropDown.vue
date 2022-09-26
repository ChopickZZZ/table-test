<script setup lang="ts">
import { ref } from 'vue'
import { Condition, Header } from '../types';
defineProps<{
	title: string,
	list: Header[] | Condition[]
}>()
const emit = defineEmits<{
	(event: 'pickItem', item: string): void
}>()
const mainItem = ref('')
const isDropDownOpen = ref(false)
const pickItem = (val: string, text: string) => {
	isDropDownOpen.value = false
	mainItem.value = text
	emit('pickItem', val)
}
</script>

<template>
	<div class="dropdown">
		<div class="dropdown__label">{{title}}</div>
		<div class="dropdown__container" v-click-outside="() => (isDropDownOpen = false)">
			<div class="dropdown__body" @click="isDropDownOpen = !isDropDownOpen">
				<div class="dropdown__input">{{mainItem || 'Выбрать'}}</div>
				<div class="dropdown__triangle"></div>
			</div>
			<ul :class="['dropdown__items', {show: isDropDownOpen}]">
				<li class="dropdown__item" @click="pickItem(item.value, item.text)" v-for="item in list" :key="item.value">
					{{item.text}}
				</li>
			</ul>
		</div>
	</div>
</template>

<style scoped lang="scss">
.dropdown {
	display: flex;
	align-items: center;
	margin-right: 2rem;

	&__container {
		display: inline-block;
		min-width: 11rem;
		position: relative;
		margin: 0 1rem;
	}

	&__body {
		height: 25px;
		border-bottom: 1px solid #000;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 5px;
		cursor: pointer;
	}

	&__triangle {
		display: inline-block;
		vertical-align: middle;
		width: 0;
		height: 0;
		border-top: 6px solid #000;
		border-left: 6px solid transparent;
		border-right: 6px solid transparent;
	}

	&__items {
		display: none;
		position: absolute;
		top: 25px;
		left: 0;
		width: 100%;
		text-align: left;
		padding: 0;
		margin: 0;
		box-shadow: 0 5px 5px -3px #0003, 0 8px 10px 1px #00000024, 0 3px 14px 2px #0000001f;
	}

	&__items.show {
		display: block;
	}

	&__item {
		background-color: #fff;
		padding: 5px;
		cursor: pointer;
	}

	&__item.selected {
		background-color: salmon;
	}
}
</style>