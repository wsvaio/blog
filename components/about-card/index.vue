<script setup lang="ts">
import { marked } from "marked";

const { data = {} } = defineProps<{
	data: Record<any, any>;
}>();
const isMounted = $(useMounted());

let images = $ref<string[]>([]);
let textContent = $ref("");

watchEffect(() => {
	if (!isMounted) return;
	const domparser = new DOMParser();
	const doc = domparser.parseFromString(marked(data.content), "text/html");
	images = [...doc.querySelectorAll("img")].map(item => item.src);
	textContent = [...doc.querySelectorAll("*")].map(item => item.textContent).join(" ");
});
</script>

<template>
	<div class="card">
		<img
			src="@/assets/img/banner.jpg" w="100px" h="100px" rounded="full"
			shadow="md"
		/>
		<h4>老王</h4>
		<hp>针尖对麦芒</hp>
	</div>
</template>

<style lang="less" scoped></style>
