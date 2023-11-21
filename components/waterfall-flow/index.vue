<script setup lang="ts">
const { columnWidth = 512 } = defineProps<{
	columnWidth?: number;
}>();

const slots = defineSlots<{
	default: () => any;
}>();

let columns = $ref<any[]>([]);

const divRef = $ref<HTMLDivElement>();

useResizeObserver(
	() => divRef,
	() => {
		if (!divRef) return;
		for (let i = 0; i < Math.ceil(divRef.clientWidth / columnWidth); i++) {

		}
	}
);

setTimeout(() => {
	console.log(slots.default());
}, 1000);
</script>

<template>
	<div ref="divRef" class="waterfall-flow" :style="{ '--column-width': columnWidth }">
		<!-- {{ columns }} -->
		<div v-for="item in columns">
			{{ item }}
			<component :is="slots.default()[0]" />
			123
		</div>
	</div>
</template>

<style lang="less" scoped>
.waterfall-flow {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(1fr, var(--column-width)));
}
</style>
