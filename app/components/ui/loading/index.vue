<script setup lang="ts">
defineProps<{
  show: boolean;
}>();
</script>

<template>
  <transition name="fade">
    <div v-if="show" class="loading">
      <div class="i-eos-icons:bubble-loading" />
    </div>
  </transition>
</template>

<style lang="less" scoped>
.loading {
  display: flex;
  position: absolute;
  z-index: 100;
  align-items: center;
  justify-content: center;
  background-color: var(--bg-color);
  font-size: 2em;
  inset: 0;
}
</style>
