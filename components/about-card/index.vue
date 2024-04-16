<script setup lang="ts">
const { data } = await useFetch<Record<any, any>>("/api/common/image", {
  query: computed(() =>
    useMainStore().easterEgg
      ? {
          type: "dongman",
        }
      : undefined
  ),
});
const list = useListStore();
</script>

<template>
  <div class="about-card card" pos="relative" grid="~ rows-[0.384fr_1fr]" p="0">
    <div pos="relative" flex="~ col" items="center" pt="48px">
      <img
        :src="data?.content"
        w="full"
        h="full"
        pos="absolute"
        inset="0"
        aspect-ratio="square"
        object="cover"
        z="1"
        :style="{
          'maskImage': 'linear-gradient(black 61.8%, transparent)',
          '-webkit-mask-image': 'linear-gradient(black 61.8%, transparent)',
        }"
      />
      <img
        src="@/assets/img/avatar.png"
        w="75px"
        h="75px"
        rounded="full"
        shadow="[0_1px_4px_rgba(100,110,120,.53)]"
        box="border"
        z="2"
      />
    </div>
    <div flex="~ col" items="center" p="t-0 2em">
      <h2 text="16px" font="normal" m="1em">WS</h2>
      <p mt="0" text="14px">记录编程旅程的点滴</p>
      <!-- <hr bg="1px solid [#e7eaf1]" w="[80%]" border="none" h="1px" /> -->

      <ul m="0" p="0" list="none" text="28px">
        <li>
          <nuxt-link to="https://github.com/wsvaio" un-text="inherit">
            <div class="i-mdi:github" />
          </nuxt-link>
        </li>
      </ul>

      <hr bg="1px solid [#e7eaf1]" w="full" border="none" h="1px" />

      <ul
        flex="~" justify="between" m="0" p="0"
        list="none" w="full" items="center"
      >
        <li flex="~ col" items="center">
          <span>{{ list.$articles().length }}</span>
          <span>文章</span>
        </li>
        <li>|</li>
        <li flex="~ col" items="center">
          <span>{{ list.$tags().length }}</span>
          <span>标签</span>
        </li>
        <li>|</li>
        <li flex="~ col" items="center">
          <span>{{ list.$types().length }}</span>
          <span>分类</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="less" scoped></style>
