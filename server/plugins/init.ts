export default defineNitroPlugin(async () => {
  console.log("🚀 Server Plugin: Initializing...");

  // // ---------------------------------------------------------
  // // 1. 获取运行时配置 (Runtime Config)
  // // ---------------------------------------------------------
  // // 可以访问 nuxt.config.ts 中定义的 runtimeConfig
  // const config = useRuntimeConfig();
  // const dbUrl = config.databaseUrl;

  // if (!dbUrl) {
  //   console.warn("⚠️ DATABASE_URL is missing in runtime config!");
  // }
  // else {
  //   console.log(`🔗 Connecting to database at: ${dbUrl}`);
  //   // 模拟异步连接
  //   // await db.connect(dbUrl);
  // }

  // // ---------------------------------------------------------
  // // 2. 注册全局变量/单例 (挂载到 nitroApp 上下文)
  // // ---------------------------------------------------------
  // // 你可以将初始化好的客户端挂载到 nitroApp 上，供 API 路由使用
  // // nitroApp.storage = await initStorage();

  // // 或者挂载到 event.context 的原型上 (高级用法)
  // // 注意：更推荐在 middleware 或 utils 中按需注入，避免全局污染

  // // ---------------------------------------------------------
  // // 3. 监听 Nitro 生命周期钩子 (Hooks)
  // // ---------------------------------------------------------

  // // 监听每个请求开始前 (类似全局中间件，但更底层)
  // nitroApp.hooks.hook("request", event => {
  //   // 可以在这里打点日志，统计 QPS
  //   // console.log(`[Request Hook] ${event.method} ${event.path}`);

  //   // 记录请求开始时间，用于计算耗时
  //   (event.context as any).startTime = Date.now();
  // });

  // // 监听每个请求结束后
  // nitroApp.hooks.hook("afterResponse", event => {
  //   const start = (event.context as any).startTime;
  //   if (start) {
  //     const duration = Date.now() - start;
  //     if (duration > 1000) {
  //       console.warn(`⚠️ Slow Request: ${event.path} took ${duration}ms`);
  //     }
  //   }
  // });

  // // 监听服务器关闭 (优雅退出)
  // nitroApp.hooks.hook("close", async () => {
  //   console.log("🛑 Server Plugin: Closing database connections...");
  //   // await db.disconnect();
  //   // 清理定时器、关闭 WebSocket 等
  // });

  // // ---------------------------------------------------------
  // // 4. 启动后台任务 (例如：定时清理缓存)
  // // ---------------------------------------------------------
  // if (process.env.NODE_ENV === "production") {
  //   setInterval(() => {
  //     console.log("🧹 Running background cleanup task...");
  //     // 执行清理逻辑
  //   }, 60 * 60 * 1000); // 每小时
  // }

  // console.log("✅ Server Plugin: Initialization complete.");
});
