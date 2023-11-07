<script setup lang='ts'>
defineProps<{
  title?: string;
}>();
</script>

<template>
  <h1 class="my-title">
    <slot>{{ title }}</slot>
  </h1>
</template>

<style lang='less' scoped>
.my-title {
  background: pink;
}
</style>