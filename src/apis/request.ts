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

// 请求发出后
// 复制响应消息
api.after(async ctx => ctx.message = ctx.data?.msg ?? ctx.message);
// 判断响应状态码
api.after(async ctx => (ctx.data?.code < 200 || ctx.data?.code > 299) && Promise.reject(ctx));
// 响应内容扁平化
api.after(async ctx => ctx.data = ctx.data?.data ?? ctx.data);

// 结束时总会运行
// 进度条结束
api.final(async ctx => ctx.error ? Progress.done(false) : Progress.done());
// notice 通知 不设置success则不会通知
api.final(async ctx => ctx.error
  ? ElNotification.error(ctx.message)
  : ctx.success != undefined && ElNotification.success(ctx.success ?? ctx.message));

