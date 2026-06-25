import { and, desc, eq, getColumns, isNull } from "drizzle-orm";
import * as v from "valibot";
import db from "~~/server/db";
import { article, articleStats } from "~~/server/db/schema";

const HotArticleQuerySchema = v.object({
  typeId: v.optional(
    v.pipe(v.string(), v.transform(Number), v.number(), v.integer(), v.minValue(1)),
  ),
});

defineRouteMeta({
  openAPI: {
    tags: ["article"],
    summary: "获取热门文章",
    description: "获取未删除文章中浏览量最高的前 10 篇文章，支持按分类过滤。",
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
      200: { description: "热门文章列表。" },
      400: { description: "查询参数校验失败。" },
      500: { description: "服务器错误。" },
    },
  },
});

export default defineEventHandler(async (event) => {
  const query = await getValidatedQuery(event, data =>
    v.parse(HotArticleQuerySchema, data),
  );
  const conditions = [isNull(article.deleted_at)];
  if (query.typeId) {
    conditions.push(eq(article.typeId, query.typeId));
  }

  const list = await db
    .select({
      ...getColumns(article),
      stats: getColumns(articleStats),
    })
    .from(article)
    .leftJoin(articleStats, eq(article.id, articleStats.articleId))
    .where(and(...conditions))
    .orderBy(desc(articleStats.viewCount))
    .limit(10);
  return list;
});
