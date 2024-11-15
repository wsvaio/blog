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
    // defineModel: true,
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
        {
          rel: "stylesheet",
          type: "text/css",
          href: "https://cdnjs.cloudflare.com/ajax/libs/aplayer/1.10.1/APlayer.min.css",
        },

        {
          rel: "stylesheet",
          type: "text/css",
          href: "/pio/static/pio.css",
        },
      ],
      script: [
        // { src: "https://fastly.jsdelivr.net/gh/stevenjoezhang/live2d-widget@latest/autoload.js", type: "text/javascript" },
        // { src: "https://eqcn.ajz.miesnfu.com/wp-content/plugins/wp-3d-pony/live2dw/lib/L2Dwidget.min.js", type: "text/javascript" },
        // { src: "https://apii.ctose.cn/live2d/Source-One/default/autoload.js", type: "text/javascript" },
        { src: "https://cdnjs.cloudflare.com/ajax/libs/aplayer/1.10.1/APlayer.min.js", type: "text/javascript" },

        { src: "/pio/static/l2d.js", type: "text/javascript" },
        { src: "/pio/static/pio.js", type: "text/javascript" },

      ],

    },

    // PageTransitionEvent: { name: "page", mode: "out-in" },

    // layoutTransition: {
    // 	name: "page",
    // 	mode: "out-in" // 默认值
    // },
    // pageTransition: {
    // 	name: "page",
    // 	mode: "out-in" // 默认值
    // },

  },

  css: ["~/assets/css/main.less"],

  modules: ["@unocss/nuxt", "@vueuse/nuxt", "@pinia/nuxt"],
  // modules: ["@nuxtjs/stylelint-module", "@nuxtjs/eslint-module", "@unocss/nuxt", "@vueuse/nuxt", "@pinia/nuxt"],

  nitro: {
    imports: {
      dirs: ["~/server/utils"],
    },
  },

  // experimental: {
  // 	viewTransition: true,

  // }
});
