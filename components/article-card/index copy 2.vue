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
	<div grid="~ cols-1fr" class="card" overflow="hidden" pos="relative">
		<div
			flex="~ col"
			justify="end"
			items="center"
			color="[#fffffff2]"
			h="250px"
			p="1em"
			class="box-border"
			pos="relative"
		>
			<div
				grid="~"
				:style="{
					gridTemplateColumns: `repeat(${images.length}, 1fr)`,
				}"
				pos="absolute"
				inset="0"
			>
				<img
					v-for="item in images" w="full" object="cover" :src="item"
					h="250px"
				/>
			</div>

			<!-- <div pos="absolute" inset="0" bg="[rgba(0,0,0,0.16)]" /> -->

			<h2 mt="0" z="10">
				<nuxt-link
					:to="`/article/${data.id}`"
					hover="text-[var(--primary-color)]"
					underline="transparent"
					color="[#fffffff2]"
				>
					{{ data.title }}
				</nuxt-link>
			</h2>

			<div
				flex="~" items="center" gap=".5em" z="10"
				text="14px"
			>
				<div>
					<button class="i-material-symbols-edit-calendar-outline" text="16px" font="italic" />
					<span>{{ new Date(data.updateAt).toLocaleString() }}</span>
				</div>
				<span>|</span>
				<div>
					<button class="i-material-symbols-edit-calendar-outline" text="16px" font="italic" />
					<span>{{ data.type.name }}</span>
				</div>
				<span>|</span>
				<div>
					<span v-for="item in data.tags" font="italic">#{{ item.name }}</span>
				</div>
			</div>
		</div>

		<p
			m="0"
			p="x-2em y-3em"
			z="10"
		>
			{{ textContent.length > 128 ? `${textContent.slice(0, 128)}……` : textContent.trim() || "……" }}
		</p>
	</div>
</template>

<style lang="less" scoped></style>
