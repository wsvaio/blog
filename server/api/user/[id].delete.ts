import db from "~~/server/db";
import { user } from "~~/server/db/schema";
import { assertUserExists, getUserId } from "~~/server/utils/user";

defineRouteMeta({
  openAPI: {
    tags: ["user"],
    summary: "删除用户",
    description: "软删除指定用户。需要 Bearer Token。",
    security: [{ bearerAuth: [] }],
    parameters: [
      { name: "id", in: "path", required: true, schema: { type: "integer", minimum: 1 }, description: "用户 ID。" },
    ],
    responses: {
      200: { description: "删除成功。" },
      400: { description: "用户 ID 不正确。" },
      401: { description: "未登录或令牌无效。" },
      404: { description: "用户不存在。" },
      500: { description: "服务器错误。" },
    },
  },
});

export default defineEventHandler(async event => {
  const id = getUserId(event);

  await assertUserExists(id);
  await db.update(user).set({ deleted_at: new Date() }).where(eq(user.id, id));

  return { code: 0, data: null, message: "删除成功" };
});
