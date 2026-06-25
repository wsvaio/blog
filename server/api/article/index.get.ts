import * as v from "valibot";
import db from "~~/server/db";

const ArticleQuerySchema = v.object({
  typeId: v.optional(
    v.pipe(v.string(), v.transform(Number), v.number(), v.integer(), v.minValue(1)),
  ),
});

defineRouteMeta({
  openAPI: {
    tags: ["article"],
    summary: "获取文章列表",
    description: "获取未删除文章列表，按创建时间倒序返回，并包含文章统计信息，支持按分类过滤。",
    parameters: [
      {
        name: "typeId",
        in: "query",
        required: false,
        schema: { type: "integer", minimum: 1 },
        description: "分类 ID。",
      },
    ],
    responses: {
      200: { description: "文章列表。" },
      400: { description: "查询参数校验失败。" },
      500: { description: "服务器错误。" },
    },
  },
});

export default defineEventHandler(async (event) => {
  const query = v.parse(ArticleQuerySchema, { typeId: getQuery(event).typeId });
  const list = await db.query.article.findMany({
    orderBy: { created_at: "desc" },
    where: {
      deleted_at: { isNull: true },
      ...(query.typeId ? { typeId: query.typeId } : {}),
    },
    with: {
      stats: true,
    },
  });
  return list;
});
