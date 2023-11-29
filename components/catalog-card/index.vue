<script setup lang="ts">
import DeepUl from "./deep-ul.vue";

const { articleId = "" } = defineProps<{
	articleId: string;
}>();

const isMounted = $(useMounted());

watchEffect(async () => {
	if (!isMounted) return;
	// const domparser = new DOMParser();
	// const doc = domparser.parseFromString(marked(content), "text/html");
	const doc = document.getElementById(articleId);
	if (!doc) return;

	console.log(resolveArticleTitles(doc));
});

const titles = computed(() => {
	if (!isMounted) return [];
	const doc = document.getElementById(articleId);
	if (!doc) return;
	return resolveArticleTitles(doc);
});
</script>

<template>
	<section class="tiangou-card card">
		<header text="18px">目录</header>

		<deep-ul :list="titles" />
	</section>
</template>

<style lang="less" scoped></style>
