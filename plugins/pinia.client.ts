import piniaPluginPersist from "@wsvaio/pinia-plugin-persist";
import { defineNuxtPlugin } from "#app";

export default defineNuxtPlugin(nuxtApp => {
	(nuxtApp.$pinia as Record<any, any>).use(
		piniaPluginPersist({
			// key: "blog,
		})
	);
});
