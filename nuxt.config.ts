// https://nuxt.com/docs/api/configuration/nuxt-config
import ReactivityTransform from "@vue-macros/reactivity-transform/vite";

export default defineNuxtConfig({
	devtools: { enabled: true },

	runtimeConfig: {},

	appConfig: {},

	vite: {
		vue: {},
		plugins: [ReactivityTransform()],
	},

	vue: {
		defineModel: true,
		propsDestructure: true,
	},

	app: {
		head: {
			title: "WSの小屋",
			meta: [
				{ name: "author", content: "wsvaio@qq.com" },
				{
					name: "description",
					content: "你就像天外来物一样求之不得！",
				},
			],
			link: [
				{ rel: "stylesheet", type: "text/css", href: "https://cdn.jsdelivr.net/npm/aplayer@1.10.1/dist/APlayer.min.css" }
			],
			script: [

				// { src: "https://fastly.jsdelivr.net/gh/stevenjoezhang/live2d-widget@latest/autoload.js" },
				{ src: "https://apii.ctose.cn/live2d/Source-One/default/autoload.js", type: "text/javascript" },
				{ src: "https://cdn.jsdelivr.net/npm/aplayer@1.10.1/dist/APlayer.min.js", type: "text/javascript" },

			],
		},
	},

	css: ["~/assets/css/main.less"],

	modules: ["@nuxtjs/stylelint-module", "@nuxtjs/eslint-module", "@unocss/nuxt", "@vueuse/nuxt", "@pinia/nuxt"],

	nitro: {
		imports: {
			dirs: ["~/server/utils"],
		},
	},
});
