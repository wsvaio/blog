<script setup lang="ts">
import type { InputHTMLAttributes, ReservedProps } from "vue";

defineProps<{
  placeholder?: string;
  input?: InputHTMLAttributes & ReservedProps;
}>();
const modelValue = defineModel<string>();
</script>

<template>
  <div class="vinput">
    <div class="prefix">
      <slot name="prefix" />
    </div>

    <div class="input">
      <input v-model="modelValue" :placeholder="placeholder" :="input" />
      <label :class="[modelValue && 'active']">{{ placeholder }}</label>
    </div>
    <div class="suffix">
      <slot name="suffix" />
    </div>
  </div>
</template>

<style lang="less" scoped>
.vinput {
  display: flex;
  box-sizing: border-box;
  align-items: center;
  transition: all 0.3s;
  border: 1px solid var(--border-color7);
  gap: 0.5em;

  &:hover {
    border-color: var(--primary-color);
  }

  & > .input {
    position: relative;
    width: 100%;
    height: 100%;

    & > input {
      width: 100%;
      height: 100%;
      border: none;
      outline: none;
      background-color: transparent;
      color: inherit;
      font-size: inherit;

      &:placeholder-shown::placeholder {
        color: transparent;
      }
    }

    & > label {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      transition: all 0.2s;
      color: var(--text-color1);
      pointer-events: none;
    }

    input:focus ~ label, label.active {
      top: 0;
        padding: 0.25em;
        border-radius: 0.2em;
        background-color: var(--primary-color);
        color: white;
        font-size: small;

    }

  }

  &:has(.input > input:focus) {
    border-color: var(--primary-color);

  }
}
</style>
