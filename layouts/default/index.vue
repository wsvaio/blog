<script setup lang="ts">
import BannerView from "./views/banner/index.vue";
import MainView from "./views/main/index.vue";

defineProps<{ bannerHeight?: string; bannerTitle: string }>();

const { y } = useWindowScroll();
</script>

<template>
  <banner-view :style="{ height: bannerHeight }" :title="bannerTitle">
    <slot name="banner" />
  </banner-view>

  <main-view>
    <template v-if="$slots.sub" #sub>
      <slot name="sub" />
    </template>

    <slot />
  </main-view>
  <transition name="fade">
    <button
      v-if="y >= 512" pos="fixed right-1em bottom-1em" z="10" border="none"
      text="2em"
      class="i-fxemoji:rocket"
      p="0"
      rotate="[-45deg]"
      cursor="pointer"
      @click="y = 0"
    />
  </transition>
</template>
