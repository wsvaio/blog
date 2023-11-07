//  "error": true,
//   "url": "http://localhost:3000/api/upload",
//   "statusCode": 400,
//   "statusMessage": "未找到文件或文件数据无效",
//   "message": "未找到文件或文件数据无效",

//   "stack": [
export default defineNuxtPlugin(() => {
  const message = useMessage();
  const userStore = useUserStore();
  globalThis.$fetch = $fetch.create({
    // onResponse({ response }) {
    //   // const body = response._data;
    //   // // 应用层错误也抛出来，让调用方能 catch
    //   // if (body && body.code !== 0 && body.code !== undefined) {
    //   //   show(body.message || "请求异常");
    //   //   throw new Error(body.message);
    //   // }
    //   // 直接把 data 赋给 response._data，调用方拿到的不再是 { code, data, message }
    //   // response._data = body.data ?? body;
    // },
    onRequest(r) {
      r.options.headers.set("Authorization", `Bearer ${userStore.token}`);
    },
    onResponseError({ response }) {
      message.danger(response._data?.message || "请求失败，请稍后重试");
    },
  });
});
