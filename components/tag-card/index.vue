<script setup lang="ts">
const { data } = await useFetch<Record<any, any>>("/api/tag");
</script>

<template>
  <section class="tag-card card">
    <header text="18px" flex="~ items-center">
      <span>🏷</span>
      <span>TAG</span>
    </header>

    <ul
      mt="1em"
      m="0" p="0" list="none" flex="~ wrap"
      gap=".5em"
    >
      <li v-for="item in data">
        <span>{{ item.name }}</span>
        <sup text="[var(--text-color1)]">{{ item._count.articles }}</sup>
      </li>
    </ul>
  </section>
</template>

<style lang="less" scoped></style>
