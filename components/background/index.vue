<script setup lang="ts">
import IArticle from "@/assets/img/article.webp";

const { data, execute } = await useFetch<Record<any, any>>("/api/common/image", {
  query: computed(() =>
    useMainStore().easterEgg
      ? {
          type: "dongman",
        }
      : undefined
  ),
});

useIntervalFn(() => {
  execute();
}, 18000);

onMounted(() => {
  useMainStore().globalLoading = false;
});
</script>

<template>
  <!-- 打底图 -->
  <div
    pos="fixed left-0 top-0"
    w="full"
    h="100dvh"
    :style="{
      background: `url(${IArticle}) center / cover fixed`,
    }"
  />

  <div
    pos="fixed left-0 top-0"
    w="full"
    h="100dvh"
    :style="{
      background: `url(${data?.content}) center / cover fixed`,
      transition: 'all 16s steps(16) 1s',
    }"
  />
</template>
