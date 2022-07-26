import vue from "@vitejs/plugin-vue";
import { PluginOption } from "vite";

import { viteMockServe } from "vite-plugin-mock";
import Inspect from "vite-plugin-inspect";

import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver, VantResolver, NaiveUiResolver } from "unplugin-vue-components/resolvers";
import AutoImport from "unplugin-auto-import/vite";

import { resolve } from "path";
import VueSetupExtend from "vite-plugin-vue-setup-extend";

import Unocss from "unocss/vite";
import { presetUno, presetAttributify, transformerDirectives } from "unocss";

import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";

import { VitePWA } from "vite-plugin-pwa";

import sfcExtendTag from "vite-plugin-vue-sfcextendtag";
import importsListen, { imports } from "vite-plugin-vue-autoimportconfigextend";

import Markdown from "vite-plugin-md";


import eslint from "vite-plugin-eslint";

export default <PluginOption[]>[

  // 检查根<template>是否有tag属性 如果有则在原来的基础上添加这个tag标签包裹
  sfcExtendTag(),

  vue({
    include: [/\.vue$/, /\.md$/],
    // 开启 vue $() 语法
    reactivityTransform: true

  }),

  Markdown(),

  // eslint({

  // }),

  // VitePWA({}),

  // 支持md文件解析为vue组件
  // Markdown(),

  // // setup 添加 name 属性
  VueSetupExtend(),

  // // 点击页面元素,自动打开本地IDE并跳转到对应的Vue组件
  // Inspector({ enabled: false }),

  // mock 数据
  viteMockServe(),

  // unocss 原子化css
  Unocss({
    presets: [
      // 基础预设
      presetUno(),
      // presetWind(),
      // 属性化模式支持
      presetAttributify({
        // 设置前缀
        prefix: "un:",
        // 前缀不是必须的
        prefixedOnly: false

      })
    ],

    transformers: [
      // @apply 指令
      transformerDirectives({
        enforce: "pre"
      })
    ]
  }),

  // Inspect 调试支持 依赖图谱
  Inspect(),

  // api 自动引入
  AutoImport({
    dts: resolve(__dirname, "typings/auto-import.d.ts"),
    imports: imports(
      "vue", "vue-router", "pinia", "@vueuse/core", "vitest",
      { target: "apis", prefix: "index.ts" },
      { target: "utils" },
      { target: "composables", prefix: "use" },
      { target: "stores", suffix: "Store" }
    ),
    resolvers: [
      ElementPlusResolver(),
      VantResolver(),
      NaiveUiResolver()
    ]
  }),
  // 自动引入的文件修改后重启服务器（auto-imports.d.ts才会更新）
  importsListen(),

  // 组件自动引入
  Components({
    dts: resolve(__dirname, "typings/auto-components.d.ts"),
    resolvers: [
      ElementPlusResolver(),
      VantResolver(),
      NaiveUiResolver(),
      IconsResolver()
    ]

  }),
  // iconify
  Icons()
];
