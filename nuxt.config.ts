// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },

	runtimeConfig: {},

	appConfig: {},

	vite: {
		vue: {},
	},

	vue: {
		defineModel: true,
		propsDestructure: true,
	},

	app: {
		head: {
			meta: [
				{ name: "title", content: "WSの小屋" },
				{ name: "author", content: "ws,wsvaio,wsvaio@qq.com" },
				{
					name: "description",
					content:
            "你就像天外来物一样求之不得！如你所见，这是一个个人博客网站，在这里我会分享我的所见所得。",
				},
				{ name: "keywords", content: "wangshang,ws,wsvaio,博客,个人博客" },
			],
		},
	},

	css: ["~/assets/css/main.less"],

	modules: [
		"@unocss/nuxt",
		"@nuxtjs/stylelint-module",
		"@nuxtjs/eslint-module",
		"@element-plus/nuxt",
	],

	nitro: {
		imports: {
			dirs: ["~/server/utils"]
		},

	},
});
