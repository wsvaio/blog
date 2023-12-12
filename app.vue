<script setup lang="ts"></script>

<template>
	<article min="h-100dvh" font="!sans" flex="~ col">
		<!-- <isbuilding /> -->
		<music />
		<background />
		<nuxt-loading-indicator />

		<LayoutHeader />

		<transition name="fade">
			<global-loading v-show="useMainStore().globalLoading" />
		</transition>

		<nuxt-page />

		<LayoutFooter mt="auto" />
	</article>
</template>

<style lang="less" scoped></style>
