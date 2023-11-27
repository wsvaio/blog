<script setup lang="ts">
const { y } = $(useWindowScroll());
const { data } = await useFetch<any>("/api/common/message");
</script>

<template>
	<div
		class="banner"
		:style="{
			transform: `translateY(${y / 2}px)`,
		}"
	>
		<h1 text="40px" m="0" data-text="WSの小屋">WSの小屋</h1>
		<p texg="20px">{{ data?.content }}</p>
		<!-- <div class="i-ion-ios-arrow-down arrow" text="32px" /> -->
	</div>
</template>

<style lang="less" scoped>
.banner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100dvh;
  transition: height 0.3s;
  background: var(--background-primary);
  color: white;
  text-shadow: 0 0.1875rem 0.3125rem #1c1f21;

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

    @keyframes animation-before {
      0% {
        clip-path: inset(0 0 0 0);
      }

      100% {
        clip-path: inset(0.62em 0 0.29em 0);
      }
    }

    @keyframes animation-after {
      0% {
        clip-path: inset(0 0 0 0);
      }

      100% {
        clip-path: inset(0.29em 0 0.62em 0);
      }
    }

    &:hover {
      animation: text-jump 0.5s linear infinite;
    }
  }
}
</style>
