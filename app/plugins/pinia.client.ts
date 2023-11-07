import { defineNuxtPlugin } from "#app";
import piniaPluginPersist from "@wsvaio/pinia-plugin-persist";

export default defineNuxtPlugin((nuxtApp) => {
  console.log("piniaPluginPersist", nuxtApp.$pinia);
  (nuxtApp.$pinia as Record<any, any>).use(piniaPluginPersist({
    key: 'blog'
  }));
});
