import { and, desc, eq, getColumns, isNull, sql } from "drizzle-orm";
import * as v from "valibot";
import db from "~~/server/db";
import { article, articleToTag, tag } from "~~/server/db/schema";

const TagQuerySchema = v.object({
  typeId: v.optional(
    v.pipe(v.string(), v.transform(Number), v.number(), v.integer(), v.minValue(1)),
  ),
});

defineRouteMeta({
  openAPI: {
    tags: ["tag"],
    summary: "获取标签列表",
    description: "获取未删除标签列表，按创建时间倒序返回，支持按分类过滤标签文章数量。",
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
      200: { description: "标签列表。" },
      400: { description: "查询参数校验失败。" },
      500: { description: "服务器错误。" },
    },
  },
});

export default defineEventHandler(async (event) => {
  const query = await getValidatedQuery(event, data => v.parse(TagQuerySchema, data));
  const conditions = [isNull(tag.deleted_at)];

  // 如果传了 typeId，只返回有该分类文章的标签
  if (query.typeId) {
    conditions.push(
      sql`EXISTS (
        SELECT 1 FROM "article_to_tag"
        JOIN "article" ON "article"."id" = "article_to_tag"."article_id"
        WHERE "article_to_tag"."tag_id" = "tag"."id"
          AND "article"."type_id" = ${query.typeId}
          AND "article"."deleted_at" IS NULL
      )`,
    );
  }

  // 先查标签列表
  const list = await db
    .select({
      ...getColumns(tag),
    })
    .from(tag)
    .where(and(...conditions))
    .orderBy(desc(tag.created_at));

  // 再查文章-标签关联
  const articleQuery = db
    .select({
      tagId: articleToTag.tagId,
      articleId: articleToTag.articleId,
    })
    .from(articleToTag)
    .innerJoin(article, eq(article.id, articleToTag.articleId))
    .where(
      and(
        isNull(article.deleted_at),
        query.typeId ? eq(article.typeId, query.typeId) : undefined,
      ),
    );

  const articleTags = await articleQuery;

  // 按 tagId 分组
  const articleMap = new Map<number, { id: number }[]>();
  for (const at of articleTags) {
    if (!articleMap.has(at.tagId)) {
      articleMap.set(at.tagId, []);
    }
    articleMap.get(at.tagId)!.push({ id: at.articleId });
  }

  // 合并
  return list.map(t => ({
    ...t,
    articles: articleMap.get(t.id) || [],
  }));
});
