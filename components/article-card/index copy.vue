<script setup lang="ts">
import { marked } from "marked";
import Occupy from "~/assets/img/occupy.jpg";

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
	<div
		grid="~ sm:cols-[1fr_2fr] cols-1fr" gap="1em" p="1em"
		class="card"
	>
		<img grid="row-span-full" h="full" object="cover" :src="images[0] || Occupy" />

		<div>
			<h2 mt="0">
				<nuxt-link
					:to="`/article/${data.id}`"
					hover="text-[var(--secondary-color)]"
					color="[var(--text-color)]"
					underline="transparent"
				>
					{{ data.title }}
				</nuxt-link>
			</h2>

			<p>
				<span font="bold">{{ data.type.name }}</span>
				<span v-for="item in data.tags" text="14px [var(--text-color7)]" font="italic" ml=".5em">#{{ item.name }}</span>
				<button class="i-material-symbols-edit-calendar-outline" text="16px" ml=".5em" font="italic" />
				<span text="14px">{{ new Date(data.updateAt).toLocaleString() }}</span>
			</p>
			<p mb="0">{{ textContent.length > 128 ? `${textContent.slice(0, 128)}……` : (textContent.trim() || '……') }}</p>
		</div>
	</div>
</template>

<style lang="less" scoped></style>
