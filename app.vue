<script setup lang="ts">
const theme = useThemeStore();

// 同步dark到html上
// watchEffect(() => {
// 		html.classList.remove("dark");
// 		if (theme.isDark) html.classList.add("dark");
// 	});

// 同步cssvars到html上
const isMounted = $(useMounted());

// 暗黑模式
onMounted(() => {
	const themeMedia = window.matchMedia("(prefers-color-scheme: light)");
	const setIsDark = (isLightMatches: boolean) => {
		theme.type = isLightMatches ? "light" : "dark";
	};
	setIsDark(themeMedia.matches);
	themeMedia.addEventListener("change", e => setIsDark(e.matches));
});

watchEffect(() => {
	if (!isMounted) return;
	document.documentElement.classList.remove("light", "dark");
	document.documentElement.classList.add(theme.type);
});

// watchEffect(() => {
// 	if (!isMounted) return;
// 	for (const [k, v] of Object.entries(theme.vars))
// 		document.documentElement.style.setProperty(`--${k.replace(/([A-Z])/g, $1 => `-${$1.toLowerCase()}`)}`, v);
// });
</script>

<template>
	<nuxt-layout>
		<nuxt-loading-indicator />
		<nuxt-page />
	</nuxt-layout>
</template>

<style lang="less" scoped></style>
