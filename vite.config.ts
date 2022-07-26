/// <reference types="vitest" />
import vue from "@vitejs/plugin-vue";
import { defineConfig, loadEnv } from 'vite';
import { resolve } from 'path';
import plugins from "./presets/plugins";




import pxtorem from "postcss-pxtorem";

export default defineConfig(({ mode, command }) => {

  const { VITE_BASE_API, VITE_BASE } = loadEnv(mode, "./");

  return {

    plugins,
    base: VITE_BASE,

    resolve: {
      alias: {
        "@/": `${resolve(__dirname, 'src')}/`
      }
    },

    // css: {
    //   postcss: {
    //     plugins: [
    //       pxtorem({
    //         rootValue: 50,
    //         propList: ['*'],
    //       })
    //     ]
    //   }
    // },

    server: {
      proxy: {
        '/api': {
          target: VITE_BASE_API,
          changeOrigin: true,
          // rewrite: path => path.replace(/^\/api/, '')
        }

      }

    },



    test: {

    }

  };

});

