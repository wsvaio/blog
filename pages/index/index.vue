<script setup lang="ts">
// import BannerView from "./views/banner/index.vue";

const { data } = await useFetch<any[]>("/api/article");
const { data: message, execute: executeMessage } = await useFetch<any>("/api/common/message");
const nextMessage = () => setTimeout(() => executeMessage(), 5000);
// const { data: tags } = useLazyFetch<any[]>("/api/tag");
// const { data: types } = useLazyFetch<any[]>("/api/type");

// const theme = useThemeStore();
const { y } = useWindowScroll({ behavior: "smooth" });
const jump = () => {
	y.value = document.documentElement.clientHeight - 48;
};
</script>

<template>
	<nuxt-layout banner-title="HI THERE">
		<template #banner>
			<typewriter m="1em" :content="message?.content" @finish="nextMessage" />
			<div class="i-ion-ios-arrow-down arrow" @click="jump" />
		</template>

		<article-card v-for="(item, index) in data" :data="item" :type="index % 2 == 0 ? 'left' : 'right'" />

		<template #sub>
			<about-card />
			<!-- <tiangou-card /> -->
		</template>
	</nuxt-layout>
</template>

<style lang="less" scoped>
.arrow {
  @keyframes scroll-down-effect {
    0% {
      transform: translateY(0) translateX(-50%);
      opacity: 1;
    }

    50% {
      transform: translateY(-16px) translateX(-50%);
      opacity: 0.4;
    }

    100% {
      transform: translateY(0) translateX(-50%);
      opacity: 1;
    }
  }

<<<<<<< HEAD
	position: fixed;
	bottom: 1em;
	left: 50%;
	transform: translateX(-50%);
=======
  position: absolute;
  bottom: 1em;
  left: 50%;
  transform: translateX(-50%);
>>>>>>> 9abb75a (feat: 布局结构优化)
  animation: scroll-down-effect 1.5s infinite;
	color: white;
	font-size: 32px;
	cursor: pointer;
	filter: drop-shadow(0 0.1875rem 0.3125rem #1c1f21);
}
</style>
