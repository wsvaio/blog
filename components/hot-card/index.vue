<script setup lang="ts">
const { data } = await useFetch<Record<any, any>>("/api/article/hot");
</script>

<template>
  <section class="tag-card card">
    <header text="18px" flex="~ items-center">
      <span>🔥</span>
      <span>热门</span>
    </header>

    <ol
      mt="1em" m="0" p="0" list="inside"
      flex="~ col gap-.5em"
    >
      <li v-for="item in data">
        <nuxt-link
          :to="`/article/${item.id}`"
          hover="text-[var(--primary-color)]"
          underline="transparent"
          color="inherit"
        >
          <span>{{ item.title }}</span>
          <sup text="[var(--text-color1)]">{{ item.reads }}</sup>
        </nuxt-link>
      </li>
    </ol>
  </section>
</template>

<style lang="less" scoped></style>
