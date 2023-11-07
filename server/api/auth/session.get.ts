import { createError } from "h3";
import { jwtVerify } from "jose";
import db from "~~/server/db";

defineRouteMeta({
  openAPI: {
    tags: ["auth"],
    summary: "获取当前会话",
    description: "通过 Authorization Bearer Token 获取当前登录用户信息。",
    security: [{ bearerAuth: [] }],
    parameters: [
      { name: "Authorization", in: "header", required: true, schema: { type: "string" }, description: "Bearer Token。" },
    ],
    responses: {
      200: { description: "当前用户信息。" },
      401: { description: "未登录、用户不存在或令牌无效。" },
      500: { description: "服务器错误。" },
    },
  },
});

export default defineEventHandler(async (event) => {
  const authorization = getHeader(event, "Authorization");
  if (!authorization?.startsWith("Bearer ")) {
    throw createError({ statusCode: 401, message: "未登录" });
  }
  try {
    const token = authorization.slice(7);
    const secret = new TextEncoder().encode(useRuntimeConfig().jwtSecret);
    const { payload } = await jwtVerify(token, secret);
    const foundUser = await db.query.user.findFirst({
      where: { id: { eq: payload.id as number } },
      columns: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        role: true,
      },
    });
    if (!foundUser) {
      throw createError({ statusCode: 401, message: "用户不存在" });
    }
    return {
      code: 200,
      data: foundUser,
      message: "获取成功",
    };
  } catch {
    throw createError({ statusCode: 401, message: "令牌无效" });
  }
});
