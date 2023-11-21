<script setup lang="ts">
const { data } = await useFetch<any[]>("/api/article");

const { data: tags } = useLazyFetch<any[]>("/api/tag");
</script>

<template>
	<div m="x-auto" max="w-[var(--max-width)]" p="[var(--spacing)]">
		<div grid="~ cols-1 md:cols-3" gap="1em">
			<div v-for="i in 2" flex="~ col" gap="1em">
				<fieldset
					v-for="item in data?.filter((value, index) => (i == 1 ? index % 2 == 0 : index % 2 != 0))"
					@click="$router.push(`/${item.id}`)"
				>
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
					<legend>标签</legend>
					<button v-for="item in tags">{{ item.name }}</button>
				</fieldset>
			</div>
		</div>

		<div>
			<button>前一页</button>
			<button>1</button>
			<button>后一页</button>
		</div>
	</div>
</template>
