<script setup lang="ts">
const { data, execute } = await useFetch<any>("/api/common/tiangou");
</script>

<template>
	<section class="tiangou-card card">
		<header text="18px" flex="~">
			<span>舔狗日记</span>
			<div cursor="pointer" class="i-material-symbols:sync" ml="auto" @click="execute()" />
		</header>
		<div m="children:0" mt="1em" lh="[1.5]" v-html="data.content" />
	</section>
</template>

<style lang="less" scoped></style>
