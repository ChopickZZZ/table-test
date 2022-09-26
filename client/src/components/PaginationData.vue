<script setup lang="ts">
import { useStore } from '../store'
import { computed } from 'vue'
const emit = defineEmits<{
	(event: 'paginate', target: 'next' | 'prev'): void
}>()

const store = useStore()

const fromRow = computed(() => store.state.offset + 1)
const toRow = computed(() => store.state.offset + store.state.items.length)
const pageNumber = computed(() => (store.state.offset + store.state.limit) / store.state.limit)

const isPrevBtnVisible = computed(() => !store.state.offset)
const isBtnNextVisible = computed(() => (store.state.itemsLength - store.state.offset) <= store.state.limit)
</script>

<template>
	<div class="pagination">
		<div class="pagination__show">
			С {{fromRow}} по {{toRow}}
		</div>
		<div class="pagination__utils">
			<button :class="['pagination__btn', {invisible: isPrevBtnVisible}]" @click="emit('paginate', 'prev')">
				<fa-icon icon="chevron-left"></fa-icon>
			</button>
			<div class="pagination__page">
				{{pageNumber}}
			</div>
			<button :class="['pagination__btn', {invisible: isBtnNextVisible}]" @click="emit('paginate', 'next')">
				<fa-icon icon="chevron-right"></fa-icon>
			</button>
		</div>
	</div>
</template>

<style scoped lang="scss">
.pagination {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 2rem;

	&__utils {
		display: flex;
		gap: 1rem;
	}

	&__page {
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 5px;
		background-color: #49a09d;
		width: 3rem;
		height: 3rem;
	}

	&__btn {
		background-color: transparent;
		border: none;
		outline: none;
		cursor: pointer;

		svg {
			color: #58518b;
			font-size: 1.6rem;
		}

		svg:hover {
			color: darken(#58518b, 10);
		}
	}

	&__btn.invisible {
		opacity: 0;
		pointer-events: none;
	}
}
</style>