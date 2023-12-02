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
			<li>
				<span>{{ item.el.innerHTML }}</span>
				<self :list="item.children" />
			</li>
		</template>
	</ul>
</template>

<style lang='less' scoped>

</style>
