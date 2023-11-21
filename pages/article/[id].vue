<script setup lang="ts">
import { marked } from "marked";

const route = useRoute();
const id = route.params.id;

const { data } = await useFetch<any>(`/api/article/${id}`);

useSeoMeta({
	title: data.value.title,
});
</script>

<template>
	<article m="x-auto" max="w-[var(--max-width)]" p="[var(--spacing)]" v-html="marked(data.content, { gfm: true, breaks: true })" />
</template>
