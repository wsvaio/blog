<script setup lang="ts">
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
  <div
    pos="fixed left-0 top-0"
    w="full"
    h="100dvh"
    :style="{
      background: `url(${data?.content}) center / cover fixed`,
      transition: 'all 16s steps(16) 1s',
    }"
  />
  <client-only>
    <img
      :src="data?.content" pos="absolute" w="0" h="0"
      left="-100px"
    />

    <!-- @load="useMainStore().globalLoading = false"
      @error="useMainStore().globalLoading = false" -->
  </client-only>
</template>
