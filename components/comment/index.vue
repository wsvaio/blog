<script setup lang="ts">
// eslint-disable-next-line import/no-self-import
import Self from "./index.vue";

defineProps<{
	list: Record<any, any>[];
}>();
</script>

<template>
	<ul v-if="list?.length" flex="~ col" gap="1em">
		<li v-for="item in list" grid="~ cols-[max-content_1fr_max-content]" gap="x-.5em">
			<nuxt-link
				:to="item.link" w="40px" h="40px"
				grid="row-span-2"
			>
				<img :src="item.avatar" alt="头像" />
			</nuxt-link>
			<nuxt-link :to="item.link">{{ item.name }}</nuxt-link>
			<button ml="auto" grid="row-span-2" self="center">回复</button>
			<small>发布于 {{ item.createAt }} (Google Chrome 112.0.0.0 Windows 10) 来自：绍兴市 移动</small>

			<p grid="col-span-full">{{ item.content }}</p>
			<hr
				grid="col-span-full" w="full" m="0" border="none"
				h="1px" bg="[var(--border-color)]"
			/>
			<self grid="col-span-full" :list="item.comments" mt="1em" />
		</li>
	</ul>
</template>
