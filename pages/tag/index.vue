<script setup lang='ts'>
const { data } = await useFetch<any>("/api/tag");
</script>

<template>
	<article m="x-auto" max="w-[var(--max-width)]" p="[var(--spacing)]">
		{{ data }}
	</article>
</template>

<style lang='less' scoped>

</style>
