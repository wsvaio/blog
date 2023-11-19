// uno.config.ts
import {
	defineConfig,
	presetAttributify,
	presetIcons,
	presetUno,
	transformerDirectives,
	transformerVariantGroup,
} from "unocss";

export default defineConfig({
	presets: [presetUno({ dark: "class" }), presetAttributify(), presetIcons()],
	transformers: [
		transformerDirectives({
			enforce: "pre",
		}),
		transformerVariantGroup(),
	],
});
