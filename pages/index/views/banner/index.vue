<script setup lang="ts">
const { y } = $(useWindowScroll());
</script>

<template>
	<div
		class="banner" :style="{
			transform: `translateY(${y / 2}px)`,

		}"
	>
		<slot>
			<h1 text="72px">WSの小屋</h1>
			<div class="i-ion-ios-arrow-down arrow" text="32px" />
		</slot>
	</div>
</template>

<style lang="less" scoped>
.banner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100dvh;
  transition: height .3s;
  background: var(--background-primary);
  color: white;

  & > .arrow {
    @keyframes scroll-down-effect {
      0% {
        transform: translateY(0);
        opacity: 1;
      }

      50% {
        transform: translateY(-16px);
        opacity: 0.4;
      }

      100% {
        transform: translateY(0);
        opacity: 1;
      }
    }

    animation: scroll-down-effect 1.5s infinite;
  }

  & > h1 {
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

    text-shadow: 0 1px 2px rgb(0 0 0 / 10%);

    &:hover {
      animation: text-jump 0.5s linear infinite;
    }
  }
}
</style>
