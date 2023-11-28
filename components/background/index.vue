<script setup lang="ts">
const { data, execute } = await useFetch<Record<any, any>>("/api/common/image");

useIntervalFn(() => {
	execute();
}, 18000);
</script>

<template>
	<div
		pos="fixed"
		inset="0"
		:style="{
			background: `url(${data?.imgurl}) center / cover fixed`,
			transition: 'all 16s steps(16) 1s',
		}"
	/>
</template>
