import { defineNuxtPlugin } from "#app";

export default defineNuxtPlugin(() => {
  // useTheme (useColorMode) 初始化时会自动设置 data-theme 属性
  // 这里仅确保 composable 被调用一次进行初始化
  const { theme } = useTheme();

  // 确保在客户端挂载时同步主题
  onMounted(() => {
    if (!theme.value) {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      theme.value = mediaQuery.matches ? "dark" : "light";
    }
  });
});

