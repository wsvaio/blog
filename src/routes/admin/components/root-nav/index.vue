<script lang="ts" setup>
import adminStore from "@/stores/adminStore";
import { RouteRecordRaw } from "vue-router";
import RootNav from "./index.vue";

const { exclude, include } = $(adminStore());


function isShow(route) {
  return (include.length == 0 || include.includes(route.name)) && !exclude.includes(route.name) && route.meta?.icon;
}

defineProps<{ list: RouteRecordRaw[]; }>();


function isMenuItem(route) {
  return !route.children || route.children.filter(item => item.meta?.icon).length == 0;
}

</script>

<template>
	<template v-for="item in list.filter(item => isShow(item))" :key="item.name">
		<el-menu-item v-if="isMenuItem(item)" :index="String(item.name)" @click="$router.push({ name: item.name })">
			<el-icon :size="20">
				<component :is="`i-${item.meta?.icon}`"></component>
			</el-icon>
			<template #title><span>{{ item.meta?.title || item.name || item.path }}</span></template>
		</el-menu-item>

		<el-sub-menu v-else :index="String(item.name)">
			<template #title>
				<el-icon :size="20">
					<component :is="`i-${item.meta?.icon}`"></component>
				</el-icon>
				<span>{{ item.meta?.title || item.name || item.path }}</span>
			</template>
			<root-nav :list="item.children!"></root-nav>
		</el-sub-menu>
	</template>
</template>
