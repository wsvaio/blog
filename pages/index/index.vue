<script setup lang="ts">
import BannerView from "./views/banner/index.vue";

const { data } = await useFetch<any[]>("/api/article");

const { data: tags } = useLazyFetch<any[]>("/api/tag");
const { data: types } = useLazyFetch<any[]>("/api/type");
</script>

<template>
	<banner-view />
	<div
		m="x-auto" max="w-[var(--max-width)]" p="[var(--spacing)]" z="10"
		pos="relative" grid="~ cols-[3fr_1fr]" gap="1em"
	>
		<div flex="~ col" gap="1em">
			<article-card v-for="(item, index) in data" :data="item" :type="index % 2 == 0 ? 'left' : 'right'" />
		</div>
		<div flex="~ col" gap="1em">
			<about-card />
		</div>
	</div>
</template>
