<script setup lang="ts">
const { data } = await useFetch<any[]>("/api/article");
</script>

<template>
	<div flex="~ col" gap="1em" p="1em">
		<fieldset v-for="item in data" @click="$router.push(`/${item.id}`)">
			<legend>{{ item.title }}</legend>
			<button v-for="sub in item.tags">{{ sub.name }}</button>
			<p>{{ item.createAt }}</p>
			<p>
				{{ item.content.slice(0, 64)
				}}{{ item.content.length > 64 ? "……" : "" }}
			</p>
			<button>Read More</button>
		</fieldset>
	</div>
</template>

<style lang="less" scoped>
div {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
