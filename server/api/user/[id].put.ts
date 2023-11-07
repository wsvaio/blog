import * as v from "valibot";
import db from "~~/server/db";
import { user } from "~~/server/db/schema";
import { assertUserExists, getSafeUserByEmail, getUserId, UserUpdateSchema } from "~~/server/utils/user";

defineRouteMeta({
  openAPI: {
    tags: ["user"],
    summary: "更新用户资料",
    description: "更新指定用户资料并返回安全用户信息。需要 Bearer Token。",
    security: [{ bearerAuth: [] }],
    parameters: [
      { name: "id", in: "path", required: true, schema: { type: "integer", minimum: 1 }, description: "用户 ID。" },
    ],
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              name: { type: "string", description: "昵称，1-50 字。" },
              email: { type: "string", format: "email", description: "邮箱，最多 100 字。" },
              avatar: { type: "string", description: "头像地址。" },
              site: { type: "string", description: "主页地址。" },
              acceptEmails: { type: "boolean", description: "是否接收邮件。" },
            },
          },
        },
      },
    },
    responses: {
      200: { description: "更新后的安全用户信息。" },
      400: { description: "用户 ID 或请求体校验失败。" },
      401: { description: "未登录或令牌无效。" },
      404: { description: "用户不存在。" },
      409: { description: "邮箱已存在。" },
      500: { description: "服务器错误。" },
    },
  },
});

export default defineEventHandler(async event => {
  const id = getUserId(event);
  const body = await readValidatedBody(event, data => v.parse(UserUpdateSchema, data));

  await assertUserExists(id);

  if (body.email) {
    const existed = await getSafeUserByEmail(body.email);
    if (existed && existed.id !== id) {
      throw createError({ statusCode: 409, message: "邮箱已存在" });
    }
  }

  await db
    .update(user)
    .set({ ...body, updated_at: new Date() })
    .where(eq(user.id, id));

  return await assertUserExists(id);
});
