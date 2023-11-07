<script setup lang="ts"></script>

<template>
  <button class="vbutton">
    <slot />
  </button>
</template>

<style lang="less" scoped>
.vbutton {
  padding: 0.5em 1em;
  transition: all 0.3s;
  border: 1px solid var(--border-color7);
  background-color: transparent;
  font-family: inherit;
  font-size: inherit;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
  }

  &:not(:disabled) {
    &:hover {
      border-color: var(--primary-color);
    }

    &:active {
      border-color: var(--primary-color8);
      background-color: var(--primary-color4);
    }
  }
}
</style>
