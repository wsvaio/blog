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
	<article v-html="marked(data.content)" />
</template>

<style lang="less" scoped></style>
