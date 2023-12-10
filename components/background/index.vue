<script setup lang="ts">
const { data, execute } = await useFetch<Record<any, any>>("/api/common/image");

useIntervalFn(() => {
	execute();
}, 18000);
</script>

<template>
	<div
		pos="fixed left-0 top-0"
		w="full"
		h="100dvh"
		:style="{
			background: `url(${data?.imgurl}) center / cover fixed`,
			transition: 'all 16s steps(16) 1s',
		}"
	/>
</template>
