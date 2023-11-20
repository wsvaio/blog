<script setup lang="ts"></script>

<template>
	<header
		flex="~ col" items="center" justify="end" h="200px"
		pos="relative"
	>
		<img
			alt="横幅" src="@/assets/img/banner.jpg" w="full" h="full"
			z="-1"
			pos="absolute" object="cover"
		/>
		<h1 m="0" text="[var(--secondary-color)] 36px">TITLE</h1>
		<p m="0 b-2em">Subtitle</p>
	</header>
</template>
