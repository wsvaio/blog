// uno.config.ts
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup
} from "unocss";

export default defineConfig({
  presets: [presetUno({ dark: "class" }), presetAttributify(), presetIcons(), presetWebFonts({
    provider: "google", // 默认提供者
    fonts: {
      // 这些将扩展默认主题

      // 自定义的
      sans: "ZCOOL KuaiLe",
      // sans: "Zhi Mang Xing",
      // sans: "Ma Shan Zheng",
      // sans: "ZCOOL XiaoWei",

    }

  })],
  transformers: [
    transformerDirectives({
      enforce: "pre",
    }),
    transformerVariantGroup(),
  ],
});
