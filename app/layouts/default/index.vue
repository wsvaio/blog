<script setup lang="ts">
import LayoutBanner from "./components/banner/index.vue";
import LayoutFooter from "./components/footer/index.vue";
import LayoutHeader from "./components/header/index.vue";
import LayoutMain from "./components/main/index.vue";

const { showAside = true } = defineProps<{ bannerHeight?: string; bannerTitle: string; showAside?: boolean; }>();
</script>

<template>
  <article min="h-100dvh" font="!sans" flex="~ col">
    <LayoutHeader />
    <LayoutBanner :style="{ height: bannerHeight }" :title="bannerTitle">
      <slot name="banner"></slot>
    </LayoutBanner>

    <LayoutMain :showAside="showAside">
      <template #aside>
        <slot name="aside"></slot>
      </template>

      <slot />
    </LayoutMain>
    <LayoutFooter />
  </article>
</template>
