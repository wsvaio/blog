import { setGlobalOptions } from "vue-request";
import { defineNuxtPlugin } from "#app";

export default defineNuxtPlugin(_nuxtApp => {
  setGlobalOptions({
    pagination: {
      currentKey: "page",
      pageSizeKey: "pageSize",
      totalKey: "total",
      totalPageKey: "totalPage",
    },
  });
});
