<script lang="ts" setup>
import KeepAlive from "@/routes/keep-alive/index.vue";
const { nameList } = $(mainStore());

</script>

<template>
	<el-main>
		<router-view #="{ Component }">
			<transition mode="out-in">
				<keep-alive :include="nameList">
					<component :is="Component"></component>
				</keep-alive>
			</transition>
		</router-view>
	</el-main>
</template>

<style lang="less" scoped>
.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.v-enter-from {
  transform: translateX(-30px);
}

.v-leave-active,
.v-enter-active {
  transition: all 0.333s ease;
}

.v-leave-active {
  transition-duration: 0s;
}
</style>