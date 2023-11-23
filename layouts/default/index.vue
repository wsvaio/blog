<script setup lang="ts">
import HeaderView from "./views/header/index.vue";
import MainView from "./views/main/index.vue";
import FooterView from "./views/footer/index.vue";

const { data } = useLazyFetch<Record<any, any>>("https://www.dmoe.cc/random.php?return=json", { responseType: "json" });

// useIntervalFn(() => {
// 	execute();
// }, 16000);
</script>

<template>
	<article
		:style="{
			backgroundImage: `url(${data?.imgurl})`,
		}"
	>
		<header-view />

		<main-view>
			<slot />
		</main-view>

		<footer-view />
	</article>
</template>

<style lang="less" scoped>
article {
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
  transition: all 16s;
  background-attachment: fixed;
  background-position: center;
  background-size: cover;
}
</style>
