<script setup lang='ts'>
// eslint-disable-next-line import/no-self-import
import Self from "./deep-ul.vue";

defineProps<{
	list?: any[];
}>();
</script>

<template>
	<ul v-if="list?.length">
		<template v-for="item in list">
			<li>{{ item.el.innerHTML }}</li>
			<self :list="item.children" />
		</template>
	</ul>
</template>

<style lang='less' scoped>

</style>
