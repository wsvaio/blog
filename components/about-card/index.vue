<script setup lang="ts">
const { data } = useFetch<any>("/api/dmoe");
</script>

<template>
	<div
		class="about-card card"
		pos="relative" grid="~ rows-[0.384fr_1fr]" p="0"
	>
		<div pos="relative" flex="~ col" items="center" pt="48px">
			<img
				:src="data?.imgurl" w="full" h="full" pos="absolute"
				inset="0" aspect-ratio="square"
				object="cover" z="1"
				:style="{
					maskImage: 'linear-gradient(black 61.8%, transparent)',
				}"
			/>
			<img
				src="@/assets/img/banner.jpg" w="75px" h="75px" rounded="full"
				shadow="[0_1px_4px_rgba(100,110,120,.53)]"
				z="2"
			/>
		</div>
		<div flex="~ col" items="center" p="t-0 2em">
			<h2 text="16px" font="normal" m="1em">王上上同学</h2>
			<p mt="0" text="14px">好好学习，天天向上</p>

			<!-- <hr bg="1px solid [#e7eaf1]" w="[80%]" border="none" h="1px" /> -->

			<ul
				flex="~" justify="between" m="0" p="0"
				list="none" w="full" items="center"
			>
				<li flex="~ col" items="center">
					<span>文章</span>
					<span>666</span>
				</li>
				<li>|</li>
				<li flex="~ col" items="center">
					<span>标签</span>
					<span>666</span>
				</li>
				<li>|</li>
				<li flex="~ col" items="center">
					<span>分类</span>
					<span>666</span>
				</li>
			</ul>
		</div>
	</div>
</template>

<style lang="less" scoped></style>
