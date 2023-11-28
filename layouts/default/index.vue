<script setup lang="ts">
import HeaderView from "./views/header/index.vue";
import BannerView from "./views/banner/index.vue";
import MainView from "./views/main/index.vue";
import FooterView from "./views/footer/index.vue";

defineProps<{ bannerHeight?: string; bannerTitle: string }>();

const bannerRef = $ref<InstanceType<typeof BannerView>>();
</script>

<template>
	<article>
		<header-view :hide-height="bannerRef?.clientHeight" />

		<banner-view ref="bannerRef" :style="{ height: bannerHeight }" :title="bannerTitle">
			<slot name="banner" />
		</banner-view>

		<main-view>
			<slot />
		</main-view>

		<footer-view />
	</article>
</template>

<style lang="less" scoped>
article {
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
}
</style>
