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
		pos="relative"
	>
		<div flex="~ col" gap="1em">
			<article-card v-for="item in data" :data="item" />
		</div>
	</div>
</template>
