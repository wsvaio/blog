import * as v from "valibot";
import db from "~~/server/db";
import { user } from "~~/server/db/schema";
import { getSafeUserByEmail, UserCreateSchema } from "~~/server/utils/user";

defineRouteMeta({
  openAPI: {
    tags: ["user"],
    summary: "创建用户",
    description: "创建新用户并返回安全用户信息。需要 Bearer Token。",
    security: [{ bearerAuth: [] }],
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            required: ["name", "email"],
            properties: {
              name: { type: "string", description: "昵称，1-50 字。" },
              email: { type: "string", format: "email", description: "邮箱，最多 100 字。" },
              avatar: { type: "string", description: "头像地址，可为空。" },
              site: { type: "string", description: "主页地址，可为空。" },
              acceptEmails: { type: "boolean", default: false, description: "是否接收邮件。" },
            },
          },
        },
      },
    },
    responses: {
      200: { description: "创建后的安全用户信息。" },
      400: { description: "请求体校验失败。" },
      401: { description: "未登录或令牌无效。" },
      409: { description: "邮箱已存在。" },
      500: { description: "服务器错误。" },
    },
  },
});

export default defineEventHandler(async event => {
  const body = await readValidatedBody(event, data => v.parse(UserCreateSchema, data));
  const existed = await getSafeUserByEmail(body.email);

  if (existed) {
    throw createError({ statusCode: 409, message: "邮箱已存在" });
  }

  await db.insert(user).values(body);

  return await getSafeUserByEmail(body.email);
});
