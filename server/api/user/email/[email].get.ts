import * as v from "valibot";
import { getSafeUserByEmail } from "~~/server/utils/user";

defineRouteMeta({
  openAPI: {
    tags: ["user"],
    summary: "按邮箱获取用户",
    description: "根据邮箱获取安全用户信息。",
    parameters: [
      { name: "email", in: "path", required: true, schema: { type: "string", format: "email" }, description: "URL 编码后的用户邮箱。" },
    ],
    responses: {
      200: { description: "安全用户信息。" },
      400: { description: "邮箱格式不正确。" },
      404: { description: "用户不存在。" },
      500: { description: "服务器错误。" },
    },
  },
});

export default defineEventHandler(async event => {
  const email = decodeURIComponent(getRouterParam(event, "email") || "");
  const value = v.parse(v.pipe(v.string(), v.email("请输入正确的邮箱")), email);
  const data = await getSafeUserByEmail(value);

  if (!data) {
    throw createError({ statusCode: 404, message: "用户不存在" });
  }

  return data;
});
