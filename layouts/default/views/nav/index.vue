<script setup lang='ts'>
const { data } = await useFetch<any[]>("/api/tag");
</script>

<template>
	<nav>
		<ul
			flex="~" gap="1em" list="none" justify="center"
			m="0"
			p="1em"
		>
			<li v-for="item in data">{{ item.name }}</li>
		</ul>
	</nav>
</template>

<style lang='less' scoped>
nav {
  background-color: grey;
}
</style>
