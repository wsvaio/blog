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
	<article m="x-auto" max="w-[var(--max-width)]" p="1em">
		<banner h="!50dvh" :title="data.title">
			<!-- <p text="center white">
			<span font="bold">{{ data.type.name }}</span>
			<span v-for="item in data.tags" font="italic" ml=".5em">#{{ item.name }}</span>
			<button class="i-material-symbols-edit-calendar-outline" text="16px" ml=".5em" font="italic" />
			<span text="14px">{{ new Date(data.updateAt).toLocaleString() }}</span>
		</p> -->

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
		</banner>
		<markdown-preview :model-value="data.content" />
	</article>
</template>
