<script setup lang="ts">
defineProps<{ title: string }>();
const { y } = $(useWindowScroll());
</script>

<template>
	<div
		class="banner"
		:style="{
			transform: `translateY(${y / 2}px)`,
		}"
	>
		<h1 text="40px" m="0">{{ title }}</h1>
		<slot />
	</div>
</template>

<style lang="less" scoped>
.banner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100dvh;
  transition: all 0.3s;
  background: var(--background-primary);
  color: white;
  text-shadow: 0 0.1875rem 0.3125rem #1c1f21;

  h1 {
    @keyframes text-jump {
      0%,
      25% {
        text-shadow: 2px 5px 2px #f00;
      }

      50% {
        text-shadow: 2px -5px 2px #0f0;
      }

      75% {
        text-shadow: -2px 5px 2px #00f;
      }

      100% {
        text-shadow: -2px 5px 2px #f0f;
      }
    }

    &:hover {
      animation: text-jump 0.5s linear infinite;
    }
  }
}
</style>
