<script setup lang="ts">
const rightDivRef = $ref<HTMLDivElement>();

const { y } = $(useWindowScroll());
let rightDivTop = $ref(0);

// 实现侧边栏的上下吸附——往下滚动吸附底部，往上滚动吸附顶部
watch(
	() => y,
	(value, oldValue) => {
		rightDivTop += oldValue - value;

		if (!rightDivRef) return;

		const max = 64;
		const min = -rightDivRef.clientHeight + document.documentElement.clientHeight - 16;

		rightDivTop < min && (rightDivTop = min);
		rightDivTop > max && (rightDivTop = max);
	}
);

// useResizeObserver(() => rightDivRef, () => {
// 	if (!rightDivRef) return;
// 	rightDivRef.style.top = `calc(100dvh - ${rightDivRef.clientHeight}px - 1em)`;
// });
</script>

<template>
	<main
		flex="1"
		m="x-auto"
		max="w-[var(--max-width)]"
		w="full"
		p="1em"
		z="10"
		pos="relative"
		grid="~ cols-[1fr] md:cols-[3fr_1fr]"
		gap="1em"
		items="start"
		box="border"
		:style="{
			gridTemplateColumns: $slots.sub ? undefined : '1fr',

		}"
	>
		<div flex="~ col" gap="1em" overflow="hidden">
			<slot />
		</div>
		<div
			v-if="$slots.sub"
			ref="rightDivRef"
			flex="~ col"
			gap="1em"
			pos="md:sticky"
			:style="{
				top: `${rightDivTop}px`,
			}"
		>
			<!-- <about-card /> -->
			<!-- <tiangou-card /> -->
			<!-- <sclsday-card /> -->
			<slot name="sub" />
		</div>
	</main>
</template>

<style lang="less" scoped>
main {
	@keyframes enter {
    0% {
      transform: translateY(16dvh);
			opacity: 0;
    }

    100% {
      transform: translateY(0%);
			opacity: 1;
    }
  }

  animation: enter .3s;
}
</style>
