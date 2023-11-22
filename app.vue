<script setup lang="ts">
import { onMounted } from "vue";

// import "~/assets/js/sakura.js";

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
onMounted(() => {
	// let shizuku = "https://unpkg.com/live2d-widget-model-shizuku@1.0.5/assets/shizuku.model.json";

	// L2Dwidget.init({
	// 	model: { jsonPath: shizuku, scale: 1 },
	// 	display: { position: "right", width: 120, height: 150, hOffset: 0, vOffset: -20 },
	// 	mobile: { show: true, scale: 0.5 },
	// 	react: { opacityDefault: 0.7, opacityOnHover: 0.2 },
	// });

	// @ts-expect-error 666
	L2Dwidget
	// @ts-expect-error 666
		.on("*", name => {
			console.log("%c EVENT " + `%c -> ${name}`, "background: #222; color: yellow", "background: #fff; color: #000");
		})
		.init({
			display: {
			// 居左
				position: "left",
				// 宽度
				width: 200,
				// 高度
				height: 400,
				// 距左右
				hOffset: 35,
				// 距下
				vOffset: -20
			},

			mobile: {
			// 移动端，false为关闭
				show: true,
				scale: 0.5
			},

			dialog: {
				// 开启对话框，false为关闭
				enable: true,
				script: {
				// 每空闲 10 秒钟，显示一条一言
					"every idle 10s": "$hitokoto$",
					// 当触摸到角色身体
					"tap body": "哎呀！别碰我！",
					// 当触摸到角色头部
					"tap face": "人家已经不是小孩子了！"
				}
			}
		});
});
</script>

<template>
	<nuxt-layout>
		<nuxt-loading-indicator />
		<nuxt-page />
	</nuxt-layout>
</template>

<style lang="less" scoped></style>
