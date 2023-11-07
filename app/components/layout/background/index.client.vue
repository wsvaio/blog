<script setup lang="ts">
import { onMounted } from "vue";


let imgUrl = $ref(randomImageUrl())

const { resume } = useIntervalFn(() => {
  imgUrl = randomImageUrl()
}, 16000, { immediate: false })

onMounted(async () => {
  await preloadImage(imgUrl)
  // await sleep(1000)
  // let _imgUrl = randomImageUrl()
  // await preloadImage(_imgUrl)
  // imgUrl = _imgUrl
  imgUrl = randomImageUrl()
  resume()
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
