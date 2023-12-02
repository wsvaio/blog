<script setup lang="ts"></script>

<template>
	<main
		flex="1"
		m="x-auto"
		max="w-[var(--max-width)]"
		w="full"
		p="1em"
		z="10"
		pos="relative"
		grid="~ cols-[1fr] md:cols-[3fr_1fr]"
		gap="1em"
		items="start"
	>
		<div flex="~ col" gap="1em">
			<slot />
		</div>
		<div flex="~ col" gap="1em" pos="sticky" top="[var(--header-height)]">
			<about-card />
			<!-- <tiangou-card /> -->
			<!-- <sclsday-card /> -->
			<slot name="sub" />
		</div>
	</main>
</template>
