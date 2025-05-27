<script setup lang="ts">
import IArticle from "@/assets/img/article.webp";
import { preloadImage } from "~/utils";

const main = useMainStore();

const { data, execute } = useAsyncData(() => $fetch("/api/common/image", {
  query: main.easterEgg
    ? {
        type: "dongman",
      }
    : undefined,
}).then(async data => {
  await preloadImage(data.content);
  console.log("preload", data.content);
  return data;
}), {
  immediate: false
});

let timer: NodeJS.Timeout;
async function startIntervalImage() {
  clearTimeout(timer);
  await execute();
  timer = setTimeout(() => {
    startIntervalImage();
  }, 16000);
}

onMounted(() => {
  main.globalLoading = false;
  startIntervalImage();
});
</script>

<template>
  <!-- 打底图 -->
  <!-- <div
    pos="fixed left-0 top-0"
    w="full"
    h="100dvh"
    :style="{
      background: `url(${IArticle}) center / cover fixed`,
    }"
  /> -->

  <!-- <div
    pos="fixed left-0 top-0"
    w="full"
    h="100dvh"
    :style="{
      background: `url(${data?.content}) center / cover fixed`,
      transition: 'all 16s steps(16) 0s',
    }"
  /> -->

  <transition name="fade">
    <div
      :key="data?.content || IArticle"
      pos="fixed left-0 top-0"
      w="full"
      h="100dvh"
      :style="{
        background: `url(${data?.content || IArticle}) center / cover`,
      }"
    />
  </transition>
</template>

<style lang="less" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 16s steps(16);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
