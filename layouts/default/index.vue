<script setup lang="ts">
import BannerView from "./views/banner/index.vue";
import MainView from "./views/main/index.vue";

defineProps<{ bannerHeight?: string; bannerTitle: string }>();
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
</template>
