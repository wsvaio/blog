import piniaPluginPersist from "@wsvaio/pinia-plugin-persist";
import { defineNuxtPlugin } from "#app";
import { setGlobalOptions } from "vue-request";

export default defineNuxtPlugin(nuxtApp => {
  setGlobalOptions({
    pagination: {
      currentKey: "page",
      pageSizeKey: "pageSize",
      totalKey: "total",
      totalPageKey: "totalPage",
    },
  });
});
