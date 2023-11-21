<script setup lang="ts">
const { data } = await useFetch<any[]>("/api/article");

const { data: tags } = useLazyFetch<any[]>("/api/tag");
const { data: types } = useLazyFetch<any[]>("/api/type");
</script>

<template>
	<div m="x-auto" max="w-[var(--max-width)]" p="[var(--spacing)]">
		<div grid="~ cols-1 md:cols-[2fr_1fr]" gap="1em">
			<div flex="~ col" gap="1em">
				<fieldset v-for="item in data" @click="$router.push(`/article/${item.id}`)">
					<legend>{{ item.title }}</legend>
					<button v-for="sub in item.tags">{{ sub.name }}</button>
					<p>{{ item.createAt }}</p>
					<p>{{ item.content.slice(0, 64) }}{{ item.content.length > 64 ? "……" : "" }}</p>
					<button>Read More</button>
				</fieldset>
			</div>

			<div flex="~ col" gap="1em">
				<!-- <fieldset>
				<legend>搜索</legend>
				<input placeholder="搜索" />
			</fieldset> -->
				<fieldset flex="~ wrap" gap=".5em">
					<legend>类型</legend>
					<button v-for="item in types" @click="$router.push(`/type/${item.id}`)">{{ item.name }}</button>
				</fieldset>
				<fieldset flex="~ wrap" gap=".5em">
					<legend>标签</legend>
					<button v-for="item in tags" @click="$router.push(`/tag/${item.id}`)">{{ item.name }}</button>
				</fieldset>
			</div>
		</div>

		<!-- <div>
			<button>前一页</button>
			<button>1</button>
			<button>后一页</button>
		</div> -->
	</div>
</template>
