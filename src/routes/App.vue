<script setup lang='ts'>
import { NConfigProvider, zhCN } from "naive-ui";

</script>

<template>
	<n-config-provider :locale="zhCN">
		<router-view></router-view>
	</n-config-provider>
</template>

<style lang='less' scoped>

</style>