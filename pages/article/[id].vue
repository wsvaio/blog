<script setup lang="ts">
const route = useRoute();
const id = route.params.id;

const { data } = await useFetch<any>(`/api/article/${id}`, {
	onResponse() {
		$fetch(`/api/article/reads/${id}`);
	},
});

useSeoMeta({
	title: data.value.title,
});
</script>

<template>
	<article m="x-auto" max="w-[var(--max-width)]" p="[var(--spacing)]">
		<h2 text="center 72px white" text-shadow="md">
			{{ data.title }}
		</h2>

		<p text="center white">
			<span font="bold">{{ data.type.name }}</span>
			<span v-for="item in data.tags" font="italic" ml=".5em">#{{ item.name }}</span>
			<button class="i-material-symbols-edit-calendar-outline" text="16px" ml=".5em" font="italic" />
			<span text="14px">{{ new Date(data.updateAt).toLocaleString() }}</span>
		</p>
		<markdown-preview :model-value="data.content" />
	</article>
</template>
