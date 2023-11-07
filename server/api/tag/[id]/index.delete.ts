import { and, eq, isNull } from "drizzle-orm";
import * as v from "valibot";
import db from "~~/server/db";
import { tag } from "~~/server/db/schema";

const TagIdSchema = v.pipe(v.string(), v.transform(Number), v.number(), v.integer(), v.minValue(1));

defineRouteMeta({
  openAPI: {
    tags: ["tag"],
    summary: "删除标签",
    description: "软删除指定标签。需要 Bearer Token。",
    security: [{ bearerAuth: [] }],
    parameters: [
      { name: "id", in: "path", required: true, schema: { type: "integer", minimum: 1 }, description: "标签 ID。" },
    ],
    responses: {
      200: { description: "标签删除成功。" },
      400: { description: "标签 ID 不正确。" },
      401: { description: "未登录或令牌无效。" },
      404: { description: "标签不存在。" },
      500: { description: "标签删除失败。" },
    },
  },
});

export default defineEventHandler(async event => {
  const id = v.parse(TagIdSchema, getRouterParam(event, "id"));
  const now = new Date();

  const [data] = await db
    .update(tag)
    .set({ updated_at: now, deleted_at: now })
    .where(and(eq(tag.id, id), isNull(tag.deleted_at)))
    .returning();

  if (!data) {
    throw createError({ statusCode: 404, message: "标签不存在" });
  }

  return data;
});
