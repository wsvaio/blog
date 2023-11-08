<script setup lang="ts">
const theme = useThemeStore();
</script>

<template>
	<div
		class="theme-switch"
		:class="theme.type == 'dark' && 'enabled'"
		@click="theme.type = theme.type == 'dark' ? 'light' : 'dark'"
	>
		<div
			class="slider"
			:style="{
				left: theme.type == 'dark' ? '75%' : '25%',
			}"
		>
			🌙
		</div>
	</div>
</template>

<style lang="less" scoped>
.theme-switch {
  position: relative;
  box-sizing: border-box;
  width: 40px;
  height: 22px;
  border: 3px solid grey;
  border-radius: 9999px;
  background-color: white;
  user-select: none;

  & > .slider {
    display: flex;
    position: absolute;
    top: 50%;
    left: 50%;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    transform: translate(-50%, -50%);
    transition: left 0.3s;
    border-radius: 50%;
    background-color: black;
  }
}
</style>
