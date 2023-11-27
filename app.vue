<script setup lang="ts">

</script>

<template>
	<div
		bg="[var(--warning-color)]" text="[var(--error-color)] center" p="x-1em y-.5em" pos="fixed"
		top="0" left="[50%]" transform="translate-x-[-50%] " rounded="4px t-0"
		shadow="md"
	>
		网站还在持续施工中
	</div>
	<nuxt-loading-indicator />
	<nuxt-page class="!font-sans" />
</template>

<style lang="less" scoped></style>
