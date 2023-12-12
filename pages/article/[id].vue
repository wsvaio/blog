<script setup lang="ts">
const route = useRoute();
const id = +route.params.id;
const { data, refresh } = await useFetch<any>(`/api/article/${id}`);
useFetch(`/api/article/reads/${id}`);
useSeoMeta({
	title: data.value.title,
});
</script>

<template>
	<nuxt-layout :banner-title="data.title" banner-height="38.2dvh">
		<template #banner>
			<ul
				m="0 t-1.5em" p="0" list="none" flex="~"
				gap=".5em"
			>
				<li flex="~">
					<div class="i-material-symbols-calendar-month" />
					<span>发表于 {{ new Date(data.createAt).toLocaleString() }}</span>
				</li>
				<li>|</li>
				<li flex="~">
					<div class="i-ic-twotone-update" />
					<span>更新于 {{ new Date(data.updateAt).toLocaleString() }}</span>
				</li>
				<li>|</li>
				<li flex="~">
					<div class="i-carbon-category" />
					<span>{{ data.type.name }}</span>
				</li>
			</ul>
			<ul
				m="0 t-1em" p="0" list="none" flex="~"
				gap=".5em"
			>
				<li flex="~">
					<div class="i-mdi-file-word-outline" />
					<span>字数总计: {{ data.content.length }}</span>
				</li>
				<li>|</li>
				<li flex="~">
					<div class="i-carbon-view" />
					<span>阅读量: {{ data.reads }}</span>
				</li>
				<li>|</li>
				<li flex="~">
					<div class="i-majesticons-comment-2-text-line" />
					<span>评论数: {{ data.comments?.length }}</span>
				</li>
			</ul>
		</template>

		<!-- <div class="card"> -->
		<markdown-preview :model-value="data.content" />
		<!-- <article-copyright /> -->
		<article-previous-and-next :article-id="id" />
		<comments
			:list="
				map(data?.comments, (item: any) => ({
					...item,
					id: item.id,
					avatar: item.user.avatar,
					name: item.user.name,
					site: item.user.site,
					content: item.content,
					comments: item.comments,

				}), { childrenKey: 'comments' })
			"
			:article-id="id"
			@submit="refresh()"
		/>
		<!-- </div> -->

		<template #sub>
			<catalog-card article-id="md-editor-v3-preview" />
		</template>
	</nuxt-layout>
</template>
