<script setup lang="ts">
import { sleep } from "@wsvaio/utils";
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
})


const preload = async () => {
  await preloadImage(imgUrl)
  const nextImgUrl = randomImageUrl();
  await preloadImage(nextImgUrl)
  imgUrl = nextImgUrl
}

onMounted(async () => {
  await Promise.race([preload()?.catch(() => { }), sleep(3000)])
  if (mainStore.autoRotate) resume();
  mainStore.globalLoading = false
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
