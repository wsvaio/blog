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

			],
			script: [
				{ src: "https://l2dwidget.js.org/lib/L2Dwidget.min.js" },
				{ src: "https://files.cnblogs.com/files/quaint/sakuraPlus.js" },
				{ src: "https://cdn.jsdelivr.net/gh/Fuukei/Public_Repository@latest/static/js/sakura-less.js" },
				{ src: "http://zhouql.vip/cdn/blast.js" }

			]
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
