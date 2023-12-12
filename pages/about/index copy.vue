<script setup lang='ts'>
import { marked } from "marked";
import readme from "@/README.md?raw";
</script>

<template>
	<nuxt-layout banner-title="关于" banner-height="38.2dvh">
		<template #banner>
			<typewriter m="1em" content="关于而已" />
		</template>

		<div class="card" v-html="marked(readme)" />
	</nuxt-layout>
</template>

<style lang='less' scoped>

</style>
