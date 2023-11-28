<script setup lang='ts'>
const messages = ["网站还在持续施工中", "网站还在持续建设中", "网站还在持续美化中"];
let index = $ref(0);
</script>

<template>
	<div
		bg="[var(--warning-color)]"
		text="[var(--error-color)] center"
		p="x-1em y-.5em"
		pos="fixed"
		top="0"
		left="[50%]"
		transform="translate-x-[-50%] "
		rounded="4px t-0"
		shadow="md"
	>
		<typewriter :content="messages[index]" @finish="index >= messages.length - 1 ? (index = 0) : index++" />
	</div>
</template>

<style lang='less' scoped>

</style>
