import { defineNuxtPlugin } from "#app";

export default defineNuxtPlugin(() => {
  // 检测系统主题偏好
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  document.documentElement.setAttribute("data-theme", mediaQuery.matches ? "dark" : "light");

  // 系统主题变化时同步（仅当用户没手动切换时）
  mediaQuery.addEventListener("change", (e) => {
    document.documentElement.setAttribute("data-theme", e.matches ? "dark" : "light");
  });
});
