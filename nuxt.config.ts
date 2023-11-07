// https://nuxt.com/docs/api/configuration/nuxt-config
import ReactivityTransform from "@vue-macros/reactivity-transform/vite";
export default defineNuxtConfig({
  devtools: { enabled: true },
  ignore: [
    "**/layouts/**/components/**",
    "**/components/**/components/**",
    "**/pages/**/components/**",
  ],
  runtimeConfig: {
    jwtSecret: process.env.NUXT_JWT_SECRET || "dev-secret-change-in-production",
    public: {},
  },
  appConfig: {
    theme: {
      common: {
        // primaryColor: "#CD3636",
        primaryColor: "#FF69B4",
        // secondaryColor: "#F17B7C",
        infoColor: "#096dd9",
        successColor: "#1CAE74",
        warningColor: "#faad142d",
        errorColor: "#f5222d",
        fontSize: "16px",
        maxWidth: "1200px",
        headerHeight: "calc(48px + 1rem)",
      },
      light: {
        bgColor: "rgba(255,255,255,0.9)",
        textColor: "#343a40",
        borderColor: "#e9ecef",
      },
      dark: {
        bgColor: "rgba(36,31,33,0.9)",
        textColor: "#e9ecef",
        borderColor: "#CFBF8B",
      },
    },
  },
  vite: {
    vue: {},
    plugins: [ReactivityTransform()],
    optimizeDeps: {
      include: [
        "@wsvaio/utils",
        "@wsvaio/pinia-plugin-persist",
        "colord",
        "colord/plugins/mix",
        "colord/plugins/names",
        "markdown-exit",
      ],
    },
  },
  vue: {
    // defineModel: true,
    // propsDestructure: true,
  },
  imports: {
    // addons: {
    //   vueTemplate: true,
    // },
  },
  // components: {
  // },
  app: {
    head: {
      title: "WSの小屋",
      meta: [
        { name: "author", content: "wsvaio@qq.com" },
        {
          name: "description",
          content: "你就像天外来物一样求之不得！",
        },
        {
          name: "baidu-site-verification",
          content: "codeva-DJiKiEnZit",
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
        {
          src: "https://cdnjs.cloudflare.com/ajax/libs/aplayer/1.10.1/APlayer.min.js",
          type: "text/javascript",
        },
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
  modules: [
    "@unocss/nuxt",
    "@vueuse/nuxt",
    "@pinia/nuxt",
    "@nuxtjs/robots",
    "@nuxtjs/sitemap",
    "@vite-pwa/nuxt",
    "@pinia/colada-nuxt",
  ],
  nitro: {
    // imports: {
    //   dirs: ["~/server/utils"],
    // },
    experimental: {
      openAPI: true,
    },
    openAPI: {
      production: "runtime",
      meta: {
        title: "WSの小屋",
        version: "1.0.0",
        description: "WSの小屋的 OpenAPI 文档。",
      },
    },
    storage: {
      // 这里的 'uploads' 必须与代码中 useStorage('uploads') 的参数匹配
      uploads: {
        // 驱动选择 'fs' 表示本地文件系统
        driver: "fs",
        // 保存文件的基目录
        // 这里设置为项目根目录下的 ./public/uploads 文件夹
        // 使用 ./public 的好处是，文件可以直接通过浏览器访问
        base: "./public/uploads",
      },
    },
  },
  pwa: {
    manifest: {
      name: "WSの小屋",
      // lang: "cn",
      short_name: "WSの小屋",
      description: "你就像天外来物一样求之不得！",
      theme_color: "#ffffff",
      background_color: "#ffffff",
      display: "standalone",
      orientation: "portrait",
      start_url: "/",
      icons: [
        {
          src: "/favicon.ico",
          type: "image/ico",
        },
      ],
    },
  },
  site: {
    url: "https://wsvaio.cn",
    name: "WSの小屋",
  },
  typescript: {
    tsConfig: {
      compilerOptions: {
        types: ["@vue-macros/reactivity-transform/macros-global"],
      },
      include: ["scripts/**/*.ts"],
    },
  },
  // experimental: {
  // 	viewTransition: true,
  // }
});
