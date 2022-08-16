<script lang="ts" name="vrouter" setup>
const { nameList } = $(mainStore());

const { keepAlive=false, routerKey=false } = defineProps<{
  keepAlive?: boolean;
  routerKey?: boolean;
  routerKeyVal?: string;
}>();

</script>

<template>
	<router-view #="{ Component }">
		<keep-alive v-if="keepAlive" :include="nameList">
			<component :is="Component" :key="routerKey ? routerKeyVal ?? $route.fullPath : undefined"></component>
		</keep-alive>
		<component :is="Component" v-else :key="routerKey ? routerKeyVal ?? $route.fullPath : undefined"></component>
	</router-view>
</template>
