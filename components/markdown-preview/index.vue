<script setup lang="ts">
import { MdPreview } from "md-editor-v3";
import "md-editor-v3/lib/style.css";

const modelValue = defineModel();

const theme = useThemeStore();
</script>

<template>
	<md-preview
		v-model="modelValue"
		:theme="theme.type == 'dark' ? 'dark' : 'light'"
		class="!font-sans card"
		bg="![var(--bg-color)]"
	/>
</template>

<style lang="less" scoped></style>
