import { and, eq, isNull } from "drizzle-orm";
import * as v from "valibot";
import db from "~~/server/db";
import { type } from "~~/server/db/schema";

const TypeIdSchema = v.pipe(v.string(), v.transform(Number), v.number(), v.integer(), v.minValue(1));

defineRouteMeta({
  openAPI: {
    tags: ["type"],
    summary: "删除分类",
    description: "软删除指定分类，仅设置 deleted_at 与 updated_at。需要 Bearer Token。",
    security: [{ bearerAuth: [] }],
    parameters: [
      { name: "id", in: "path", required: true, schema: { type: "integer", minimum: 1 }, description: "分类 ID。" },
    ],
    responses: {
      200: { description: "分类删除成功。" },
      400: { description: "分类 ID 不正确。" },
      401: { description: "未登录或令牌无效。" },
      404: { description: "分类不存在。" },
      500: { description: "分类删除失败。" },
    },
  },
});

export default defineEventHandler(async event => {
  const id = v.parse(TypeIdSchema, getRouterParam(event, "id"));
  const now = new Date();

  const [data] = await db
    .update(type)
    .set({
      updated_at: now,
      deleted_at: now,
    })
    .where(and(eq(type.id, id), isNull(type.deleted_at)))
    .returning();

  if (!data) {
    throw createError({ statusCode: 404, message: "分类不存在" });
  }

  return data;
});
