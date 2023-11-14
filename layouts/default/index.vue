<script setup lang="ts">
import HeaderView from "./views/header/index.vue";
import NavView from "./views/nav/index.vue";
import MainView from "./views/main/index.vue";

// import AsideView from "./views/aside/index.vue";
import FooterView from "./views/footer/index.vue";
</script>

<template>
	<article>
		<header-view />
		<nav-view />
		<main-view>
			<slot />
		</main-view>
		<!-- <aside-view /> -->
		<footer-view />
	</article>
</template>

<style lang="less" scoped>
article {
  min-height: 100dvh;
}
</style>
