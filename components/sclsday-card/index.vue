<script setup lang="ts">
const { data } = await useFetch<any>("/api/common/sclsday");
</script>

<template>
	<section class="sclsday-card card">
		<header text="18px">
			历史上的今天
		</header>
		<ul m="0" p="0" list="none">
			<li v-for="item in data.content">{{ item.date }}，{{ item.title }}。</li>
		</ul>
	</section>
</template>

<style lang="less" scoped></style>
