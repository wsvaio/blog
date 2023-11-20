<script setup lang="ts">
const theme = useThemeStore();

// 同步dark到html上
// watchEffect(() => {
// 		html.classList.remove("dark");
// 		if (theme.isDark) html.classList.add("dark");
// 	});

// 同步cssvars到html上
const isMounted = $(useMounted());
watchEffect(() => {
	if (!isMounted) return;
	for (const [k, v] of Object.entries(theme.vars))
		document.documentElement.style.setProperty(`--${k.replace(/([A-Z])/g, $1 => `-${$1.toLowerCase()}`)}`, v);
});
</script>

<template>
	<nuxt-layout>
		<nuxt-page />
	</nuxt-layout>
</template>

<style lang="less" scoped></style>
