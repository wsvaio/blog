<script setup lang='ts'>
import { MdEditor } from "md-editor-v3";
import "md-editor-v3/lib/style.css";

const modelValue = defineModel();
</script>

<template>
	<md-editor v-model="modelValue" />
</template>

<style lang='less' scoped>

</style>
