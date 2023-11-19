<script setup lang='ts'>
const modelValue = defineModel({ default: false });
</script>

<template>
	<div class="theme-switch" :class="modelValue && 'enabled'" @click="modelValue = !modelValue">
		<div
			class="slider" :style="{
				left: modelValue ? '75%' : '25%',
			}"
		>
			🌙
		</div>
	</div>
</template>

<style lang='less' scoped>
.theme-switch {
	position: relative;
	box-sizing: border-box;
	width: 40px;
	height: 22px;
	border: 3px solid grey;
	border-radius: 9999px;
	background-color: white;
	user-select: none;

	&>.slider {
		display: flex;
		position: absolute;
		top: 50%;
		left: 50%;
		align-items: center;
		justify-content: center;
		width: 28px;
		height: 28px;
		transform: translate(-50%, -50%);
		transition: left .3s;
		border-radius: 50%;
		background-color: black;
	}
}
</style>
