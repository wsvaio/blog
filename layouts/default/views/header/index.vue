<script setup lang="ts">
import Logo from "./views/logo/index.vue";
import NavView from "./views/nav/index.vue";

let isDark = $ref(false);

const { y } = $(useWindowScroll());

const isMouted = $(useMounted());

const ratio = computed(() => {
	if (!isMouted) return;
	const { scrollHeight = 0, clientHeight = 0 } = document.documentElement;
	console.log(y, scrollHeight, clientHeight);
	const maxY = scrollHeight - clientHeight;
	if (maxY <= 0) return 0;
	return ((y / maxY) * 100).toFixed(0);
});
</script>

<template>
	<header :class="y != 0 && 'spin'">
		<logo />
		<nav-view />

		<div flex="1" />
		{{ ratio }}
		<theme-switch v-model="isDark" />
	</header>
</template>

<style lang="less" scoped>
header {
  display: flex;
  position: sticky;
  top: 0;
  align-items: center;
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 1em 36px;
  transition: padding 0.3s;
  background-color: pink;
  color: white;
  gap: 16px;

  &.spin {
    padding: 0.5em 36px;
    background-color: white;
    color: inherit;
  }
}
</style>
