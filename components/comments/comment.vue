<script setup lang="ts">
// eslint-disable-next-line import/no-self-import
import Self from "./comment.vue";

defineProps<{
	list?: Record<any, any>[];
}>();

const commentId = defineModel<number>("commentId");
</script>

<template>
	<ul v-if="list?.length" flex="~ col" gap="1em">
		<li v-for="item in list" grid="~ cols-[max-content_1fr_max-content] rows-[max-content_1fr]" gap="x-.5em">
			<nuxt-link :to="item.site || undefined" w="40px" h="40px" grid="row-span-2">
				<img :src="item.avatar" alt="头像" />
			</nuxt-link>
			<nuxt-link
				:to="item.site || undefined"
				:style="{
					color: item.site ? 'var(--primary-color)' : 'inherit',
				}"
				class="underline-transparent"
			>
				{{ item.name }}
			</nuxt-link>

			<button ml="auto" grid="row-span-2" self="center" @click="commentId = commentId == item.id ? 0 : item.id">
				{{ item.id == commentId ? "取消" : "回复" }}
			</button>
			<small self="end">发布于 {{ item.createAt }} (Google Chrome 112.0.0.0 Windows 10) 来自：绍兴市 移动</small>

			<p grid="col-span-full">{{ item.content }}</p>
			<div :id="`comment${item.id}`" grid="col-span-full" />
			<hr
				grid="col-span-full" w="full" m="0" border="none"
				h="1px" bg="[var(--border-color)]"
			/>

			<self v-model:comment-id="commentId" grid="col-span-full" :list="item.comments" mt="1em" />
		</li>
	</ul>
</template>
