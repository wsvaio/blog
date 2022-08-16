import { router } from "@/modules/router";
import { Progress, createAPI } from "wsvaio";

const { DEV, VITE_BASE_API } = import.meta.env;
// 创建api对象 泛型添加自定义属性
export const api = createAPI<{ success?: string; headers: Record<string, string>; }>({
  baseURL: DEV ? "" : VITE_BASE_API,
  log: DEV, // 控制台是否打印日志
  timeout: 0,
  headers: {

  },


});
export const { post, get, put, patch, del, request, error, final, before, after, extendAPI } = api;

// 请求发出前
api.before(async ctx => Progress.start());
api.before(async ctx => {
  const auth = authStore();
  ctx.headers["Authentication"] = auth.token;
});
// 请求发出后
// 判断响应状态码
api.after(async ctx => (ctx.status! < 200 || ctx.status! > 299) && Promise.reject(ctx));

api.error(async ctx => ctx.message = ctx.error.data ?? ctx.error.message);

api.error(async ctx => {
  if (ctx.status != 401) return;
  const auth = authStore();
  auth.logout();
  router.push({name: "login"});
});

// 结束时总会运行
// 进度条结束
api.final(async ctx => ctx.error ? Progress.done(false) : Progress.done());
// notice 通知 不设置success则不会通知
final(async ctx => ctx.error
  ? ctx.message && ElNotification.error(ctx.message)
  : ctx.success && ElNotification.success(ctx.success));

