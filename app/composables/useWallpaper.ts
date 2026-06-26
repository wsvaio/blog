
export type WallpaperType = "anime" | "landscape";

const WALLPAPER_APIS: Record<string, string> = {
  anime: "https://www.dmoe.cc/random.php",
  landscape: "https://api.bimg.cc/random",
};

/**
 * 壁纸管理 composable。
 * 管理壁纸类型（二次元/风景）和自动轮播开关，持久化到 localStorage。
 */
export const useWallpaper = () => {
  const mainStore = useMainStore();

  const toggleWallpaper = () => {
    mainStore.wallpaperType = mainStore.wallpaperType === "anime" ? "landscape" : "anime";
  };

  const toggleRotate = () => {
    mainStore.autoRotate = !mainStore.autoRotate;
  };

  const randomImageUrl = () => `${WALLPAPER_APIS[mainStore.wallpaperType]}?key=${Math.random()}`;

  return {
    randomImageUrl,
    toggleWallpaper,
    toggleRotate,
  };
};
