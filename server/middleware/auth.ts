import { createError } from "h3";
import { jwtVerify } from "jose";
export default defineEventHandler(async (event) => {
  // 不需要认证的路由
  const publicRoutes = [
    "/api/auth/login",
    "/api/mcp",
    // "/api/auth/session",
    // "/api/article",
    "/api/comment",
    "/api/article/:id/comment",
    "/api/comment/:id/comment",
    "/api/user/upsert",
    "/api/file",

    "/api/article/:id/stats/view"
  ];
  // GET 请求和公开路由不需要认证
  if (event.method === "GET" || publicRoutes.some(route => {
    const pattern = new RegExp("^" + route.replace(/:[\w-]+/g, "[^/]+") + "$");
    return pattern.test(event.path);
  })) {
    return;
  }

  const authorization = getHeader(event, "Authorization");
  if (!authorization?.startsWith("Bearer ")) {
    throw createError({ statusCode: 401, message: "未登录" });
  }
  try {
    const token = authorization.slice(7);
    const secret = new TextEncoder().encode(useRuntimeConfig().jwtSecret);
    const { payload } = await jwtVerify(token, secret);
    // 将用户信息放到上下文里，方便后续接口使用
    event.context.user = payload;
  } catch {
    throw createError({ statusCode: 401, message: "令牌无效" });
  }
});
