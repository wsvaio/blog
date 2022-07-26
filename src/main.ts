import RouterView from "@/routes/router-view/index.vue";
import { createApp } from "vue";
const app = createApp(RouterView);

const modules = import.meta.glob<true, string, T>("@/modules/*/index.ts", { eager: true });
for await (const module of Object.values(modules)) module?.default && module.default(app);



app.mount("#app");