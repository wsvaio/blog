<script setup lang="ts"></script>

<template>
	<article min="h-100dvh" font="!sans" flex="~ col">
		<isbuilding />
		<!-- <music /> -->
		<background />

		<LayoutHeader />
		<nuxt-loading-indicator />
		<nuxt-page />
		<LayoutFooter mt="auto" />
	</article>
</template>

<style lang="less" scoped></style>
