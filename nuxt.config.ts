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
			title: "王上上的小屋",
			meta: [
				{ name: "author", content: "ws,wsvaio,wsvaio@qq.com" },
				{
					name: "description",
					content: "你就像天外来物一样求之不得！",
				},
				{ name: "keywords", content: "wangshang,ws,wsvaio,博客,个人博客" },
			],
		},
	},

	css: ["~/assets/css/main.less"],

	modules: [
		"@nuxtjs/stylelint-module",
		"@nuxtjs/eslint-module",
		"@unocss/nuxt",
		"@vueuse/nuxt",
		"@pinia/nuxt",
	],

	nitro: {
		imports: {
			dirs: ["~/server/utils"],
		},
	},
});
