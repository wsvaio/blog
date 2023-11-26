<script setup lang="ts">
import HeaderView from "./views/header/index.vue";
import MainView from "./views/main/index.vue";
import FooterView from "./views/footer/index.vue";

// let url = $ref("");
// const theme = useThemeStore();

const { data, execute } = await useFetch<Record<any, any>>("/api/common/image");
// watchEffect(async () => {
// 	if (!data?.value?.url) return;
// 	const blob = await fetch(data.value.url).then(data => data.blob());

// 	if (url) URL.revokeObjectURL(url);
// 	url = URL.createObjectURL(blob);

// 	identifySubject(url).then(([r, g, b, a]) => {
// 		theme.common.primaryColor = `rgba(${r},${g},${b},${a})`;
// 		theme.common.secondaryColor = `rgba(${r},${g},${b},${a})`;
// 		theme.light.textColor = `rgba(${r},${g},${b},${a})`;
// 		theme.dark.textColor = `rgba(${r},${g},${b},${a})`;
// 	});
// });

useIntervalFn(() => {
	execute();
}, 10000);
</script>

<template>
	<article
		:style="{
			background: `url(${data?.imgurl}) center / cover fixed`,
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
  transition: all 5s 1s;

}
</style>
