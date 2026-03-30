import { defineNuxtPlugin } from "#app";

export default defineNuxtPlugin(() => {
  const theme = useThemeStore();

  const themeMedia = window.matchMedia("(prefers-color-scheme: light)");
  const setIsDark = (isLightMatches: boolean) => {
    theme.type = isLightMatches ? "light" : "dark";
  };
  setIsDark(themeMedia.matches);
  themeMedia.addEventListener("change", e => setIsDark(e.matches));

  watchEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme.type);
  });

  watchEffect(() => {
    for (const [k, v] of Object.entries(theme.vars))
      document.documentElement.style.setProperty(`--${k.replace(/([A-Z])/g, $1 => `-${$1.toLowerCase()}`)}`, v);
  });
});
