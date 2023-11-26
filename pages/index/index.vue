<script setup lang="ts">
// import BannerView from "./views/banner/index.vue";

const { data } = await useFetch<any[]>("/api/article");
const { data: message } = await useFetch<any>("/api/common/message");

const { data: tags } = useLazyFetch<any[]>("/api/tag");
const { data: types } = useLazyFetch<any[]>("/api/type");

// const theme = useThemeStore();
const { y } = useWindowScroll({ behavior: "smooth" });
const jump = () => {
	y.value = document.documentElement.clientHeight - 48;
};
</script>

<template>
	<!-- <banner-view /> -->
	<banner title="WSの小屋">
		<p text="20px">{{ message?.content }}</p>
	</banner>
	<div class="i-ion-ios-arrow-down arrow" @click="jump" />

	<div
		m="x-auto" max="w-[var(--max-width)]" p="1em" z="10"
		pos="relative" grid="~ cols-[3fr_1fr]" gap="1em" items="start"
	>
		<div flex="~ col" gap="1em">
			<article-card v-for="(item, index) in data" :data="item" :type="index % 2 == 0 ? 'left' : 'right'" />
		</div>
		<div flex="~ col" gap="1em" pos="sticky" top="[var(--header-height)]">
			<about-card />
			<tiangou-card />
		</div>
	</div>
</template>

<style lang="less" scoped>
.arrow {
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

	position: fixed;
	bottom: 1em;
	left: 50%;
	transform: translateX(-50%);
  animation: scroll-down-effect 1.5s infinite;
	color: white;
	font-size: 32px;
	cursor: pointer;
	filter: drop-shadow(0 0.1875rem 0.3125rem #1c1f21);
}
</style>
