<script setup lang="ts">
const { data } = await useFetch<any[]>("/api/article");

const { data: tags } = useLazyFetch<any[]>("/api/tag");
const { data: types } = useLazyFetch<any[]>("/api/type");
</script>

<template>
	<div m="x-auto" max="w-[var(--max-width)]" p="[var(--spacing)]">
		<div grid="~ cols-1 md:cols-[2fr_1fr]" gap="1em">
			<div flex="~ col" gap="1em">
				<article-card v-for="item in data" :data="item" />
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
