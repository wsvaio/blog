<script setup lang="ts">
const { theme } = useAppConfig();

function camelToKebab(str: string) {
  return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

useHead({
  style: [
    {
      innerHTML: `:root {${Object.entries({
        ...theme.common,
        ...generateColor([
          ["primary-color", theme.common.primaryColor],
          ["info-color", theme.common.infoColor],
          ["success-color", theme.common.successColor],
          ["warning-color", theme.common.warningColor],
          ["error-color", theme.common.errorColor],
        ])
      }).map(([key, value]) => `--${camelToKebab(key)}: ${value};`).join(' ')}}`
    },
    {
      innerHTML: `@media (prefers-color-scheme: light) { :root {${Object.entries({
        ...theme.light,
        ...generateColor([
          ["border-color", theme.light.borderColor],
        ]),
      }).map(([key, value]) => `--${camelToKebab(key)}: ${value};`).join(' ')}} }`
    },
    {
      innerHTML: `@media (prefers-color-scheme: dark) { :root {${Object.entries({
        ...theme.dark,
        ...generateColor([
          ["border-color", theme.dark.borderColor],
        ]),
      }).map(([key, value]) => `--${camelToKebab(key)}: ${value};`).join(' ')}} }`
    },
    {
      innerHTML: `[data-theme="light"] {${Object.entries({
        ...theme.light,
        ...generateColor([
          ["border-color", theme.light.borderColor],
        ]),
      }).map(([key, value]) => `--${camelToKebab(key)}: ${value};`).join(' ')}}`
    },
    {
      innerHTML: `[data-theme="dark"] {${Object.entries({
        ...theme.dark,
        ...generateColor([
          ["border-color", theme.dark.borderColor],
        ]),
      }).map(([key, value]) => `--${camelToKebab(key)}: ${value};`).join(' ')}}`
    },
  ],
});
</script>

<template>
  <!-- <widget-isbuilding /> -->
  <vite-pwa-manifest />

  <widget-pio />
  <!-- <widget-music /> -->
  <layout-background />
  <nuxt-loading-indicator />
  <widget-fab-menu />

  <!-- <LayoutHeader /> -->

  <!-- <transition name="fade">
      <layout-global-loading v-show="useMainStore().globalLoading" />
    </transition> -->


  <nuxt-layout>
    <nuxt-page keepalive />
  </nuxt-layout>

  <!-- <LayoutFooter mt="auto" /> -->
</template>

<style lang="less" scoped></style>
