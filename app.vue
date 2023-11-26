<script setup lang="ts">

</script>

<template>
	<div
		bg="[var(--warning-color)]" text="[var(--error-color)] center" p="[1em]" pos="fixed"
		top="0" left="[50%]" transform="translate-x-[-50%]"
	>
		网站还在持续施工中
	</div>
	<nuxt-layout class="font-sans">
		<nuxt-loading-indicator />
		<nuxt-page />
	</nuxt-layout>
</template>

<style lang="less" scoped></style>
