<script setup lang="ts">
const { data } = await useFetch<any[]>("/api/tag");
</script>

<template>
	<nav bg="[var(--theme-color5)]">
		<ul
			flex="~" gap="1.5em" list="none" justify="center"
			m="0" p="1em" border="0px t-1px b-3px solid [var(--border-color)]"
		>
			<li v-for="item in data">
				<a
					hover="text-[var(--secondary-color)]"
					color="[var(--text-color)]"
					underline="transparent"
					cursor="pointer"
					:href="`/type/${item.id}`"
				>
					{{ item.name }}
				</a>
			</li>
		</ul>
	</nav>
</template>
