import { defineStore } from "pinia";

export const useMainStore = defineStore(
  "main",
  () => {
    const headerHideHiehgt = ref(0);
    const globalLoading = ref(true);
    const pioVisible = ref(true);
    const wallpaperType = ref("landscape");
    const autoRotate = ref(true);

    return {
      headerHideHiehgt,
      globalLoading,

      pioVisible,
      wallpaperType,
      autoRotate,
    };
  },
  {
    persist: {
      omit: ["globalLoading"],
    },
  },
);

export default useMainStore;
