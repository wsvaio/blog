import { and, eq, isNull } from "drizzle-orm";
import * as v from "valibot";
import db from "~~/server/db";
import { article } from "~~/server/db/schema";

const ArticleIdSchema = v.pipe(v.string(), v.transform(Number), v.number(), v.integer(), v.minValue(1));

defineRouteMeta({
  openAPI: {
    tags: ["article"],
    summary: "删除文章",
    description: "软删除指定文章，仅设置 deleted_at 与 updated_at。需要 Bearer Token。",
    security: [{ bearerAuth: [] }],
    parameters: [
      { name: "id", in: "path", required: true, schema: { type: "integer", minimum: 1 }, description: "文章 ID。" },
    ],
    responses: {
      200: { description: "文章删除成功。" },
      400: { description: "文章 ID 不正确。" },
      401: { description: "未登录或令牌无效。" },
      404: { description: "文章不存在。" },
      500: { description: "文章删除失败。" },
    },
  },
});

export default defineEventHandler(async event => {
  const id = v.parse(ArticleIdSchema, getRouterParam(event, "id"));
  const now = new Date();

  const [data] = await db
    .update(article)
    .set({
      updated_at: now,
      deleted_at: now,
    })
    .where(and(eq(article.id, id), isNull(article.deleted_at)))
    .returning();

  if (!data) {
    throw createError({ statusCode: 404, message: "文章不存在" });
  }

  return data;
});
