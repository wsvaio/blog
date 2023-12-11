<script setup lang='ts'>
const { articleId } = defineProps<{
	articleId: number;
}>();

const { data } = useLazyFetch<Record<any, any>>(`/api/article/${articleId}/pre-and-next`);
</script>

<template>
	<div grid="~ cols-2" class="card">
		<div>
			<h3>上一篇</h3>
			<nuxt-link underline-transparent text-inherit :to="`/article/${data?.pre.id}`">{{ data?.pre.title }}</nuxt-link>
		</div>
		<div text="right">
			<h3>下一篇</h3>
			<nuxt-link underline-transparent text-inherit :to="`/article/${data?.next.id}`">{{ data?.next.title }}</nuxt-link>
		</div>
	</div>
</template>

<style lang='less' scoped>

</style>
