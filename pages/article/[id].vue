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
	<nuxt-layout :banner-title="data.title" banner-height="38.2dvh">
		<template #banner>
			<ul
				m="1em" p="0" list="none" flex="~"
				gap=".5em" text="20px"
			>
				<li>
					{{ new Date(data.createAt).toLocaleString() }}
				</li>
				<li>|</li>
				<li>{{ data.reads }} 阅读</li>
				<li>|</li>
				<li>{{ data.comments?.length }} 评论</li>
				<li>|</li>
				<li>{{ data.likes }} 点赞</li>
			</ul>
		</template>
		<markdown-preview :model-value="data.content" />

		<comments />

		<comment-on />

		<template #sub>
			<catalog-card article-id="md-editor-v3-preview" />
		</template>
	</nuxt-layout>
</template>
