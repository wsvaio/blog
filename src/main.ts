import App from "@/routes/App.vue";
const app = createApp(App);

const modules = import.meta.glob<true, string, T>("@/modules/*/index.ts", { eager: true });
for (const module of Object.values(modules)) module?.default && module.default(app);



app.mount("#app");