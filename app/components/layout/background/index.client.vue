<script setup lang="ts">
import { onMounted } from "vue";

const { randomImageUrl } = useWallpaper();
const mainStore = useMainStore()
let imgUrl = $ref(randomImageUrl());

const { resume, pause } = useIntervalFn(() => {
  imgUrl = randomImageUrl();
}, 16000, { immediate: false })

// 监听轮播开关
watch(() => mainStore.autoRotate, (val) => {
  if (val) resume();
  else pause();
}, { immediate: true })


onMounted(async () => {
  await preloadImage(imgUrl)
  imgUrl = randomImageUrl()
})

</script>

<template>
  <transition name="fade">
    <div :key="imgUrl" pos="fixed left-0 top-0" w="full" h="100dvh" :style="{
      background: `url(${imgUrl}) center / cover`,
    }" />
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
