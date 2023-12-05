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
		<slot name="prefix" />

		<input v-model="modelValue" :placeholder="placeholder" :="input" />
		<slot name="suffix" />
	</div>
</template>

<style lang="less" scoped>
.vinput {
  display: flex;
  box-sizing: border-box;
  align-items: center;
  padding: .25em .5em;
  transition: all .3s;
  border: 1px solid var(--border-color7);

  input {
    width: 100%;
    height: 100%;
    padding: .25em .5em;
    border: none;
    outline: none;
    background-color: transparent;
    color: inherit;
    font-size: inherit;

    &:placeholder-shown::placeholder {
      color: var(--text-color1)
    }
  }

  &:has(input:focus) {
    border-color: var(--primary-color);

  }

}
</style>
