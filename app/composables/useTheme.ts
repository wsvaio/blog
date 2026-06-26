import { useColorMode } from "@vueuse/core";

export type ThemeType = "light" | "dark";

const STORAGE_KEY = "theme";

/**
 * 主题管理 composable。
 * 优先使用 localStorage 中的值，无记录时跟随系统偏好。
 * 用户手动切换后不再跟随系统。
 */
export const useTheme = () => {
  const colorMode = useColorMode({
    selector: "html",
    attribute: "data-theme",
    initialValue: "light",
    storageKey: STORAGE_KEY,
    modes: {
      light: "light",
      dark: "dark",
    },
  });

  const theme = computed<ThemeType>({
    get: () => colorMode.value as ThemeType,
    set: (val) => {
      colorMode.value = val;
    },
  });

  const isDark = computed(() => theme.value === "dark");

  const toggleTheme = () => {
    theme.value = theme.value === "dark" ? "light" : "dark";
  };

  const setTheme = (type: ThemeType) => {
    theme.value = type;
  };

  return {
    theme,
    isDark,
    toggleTheme,
    setTheme,
  };
};
