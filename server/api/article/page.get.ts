import { and, desc, eq, getColumns, inArray, isNull, like, sql } from "drizzle-orm";
import * as v from "valibot";
import db from "~~/server/db";
import { article, articleStats, articleToTag, tag, type } from "~~/server/db/schema";
import { PageSchema } from "~~/server/utils";

export const ArticleListSchema = v.object({
  ...PageSchema,
  typeId: v.optional(
    v.pipe(v.string(), v.transform(Number), v.number(), v.integer(), v.minValue(1)),
  ),
  tagId: v.optional(
    v.pipe(v.string(), v.transform(Number), v.number(), v.integer(), v.minValue(1)),
  ),
  keyword: v.optional(v.pipe(v.string(), v.maxLength(100))),
});

/** 校验后的输出类型 */
export type ArticleListInput = v.InferOutput<typeof ArticleListSchema>;

defineRouteMeta({
  openAPI: {
    tags: ["article"],
    summary: "分页查询文章",
    description: "分页查询未删除文章，支持分类、标签和关键字过滤。",
    parameters: [
      { name: "page", in: "query", required: false, schema: { type: "integer", minimum: 1 }, description: "页码，默认 1。" },
      { name: "pageSize", in: "query", required: false, schema: { type: "integer", minimum: 1, maximum: 100 }, description: "每页数量，默认 10，最大 100。" },
      { name: "typeId", in: "query", required: false, schema: { type: "integer", minimum: 1 }, description: "分类 ID。" },
      { name: "tagId", in: "query", required: false, schema: { type: "integer", minimum: 1 }, description: "标签 ID。" },
      { name: "keyword", in: "query", required: false, schema: { type: "string" }, description: "搜索关键字，最多 100 字。" },
    ],
    responses: {
      200: { description: "分页文章结果。" },
      400: { description: "查询参数校验失败。" },
      500: { description: "服务器错误。" },
    },
  },
});

export default defineEventHandler(async (event) => {
  const query = await getValidatedQuery(event, (data) => v.parse(ArticleListSchema, data));

  const { page, pageSize, typeId, tagId, keyword } = query;
  const offset = (page - 1) * pageSize;

  // 构建查询条件
  const conditions = [isNull(article.deleted_at)];
  if (keyword) {
    conditions.push(like(tag.name, `%${keyword}%`));
  }
  if (typeId) {
    conditions.push(eq(article.typeId, typeId));
  }
  if (tagId) {
    conditions.push(
      inArray(article.id, sql`SELECT article_id FROM ${articleToTag} WHERE tag_id = ${tagId}`),
    );
  }

  // 并行查询总数和列表
  const [total, list] = await Promise.all([
    db.$count(article, and(...conditions)),

    db
      .select({
        ...getColumns(article),
        type: getColumns(type),
        tags: sql<(typeof tag.$inferSelect)[]>`
          COALESCE(
            (SELECT json_agg(row_to_json(t.*))
            FROM ${articleToTag} att
            JOIN ${tag} t ON t.id = att.tag_id
            WHERE att.article_id = ${article.id}),
            '[]'::json
          )
        `,
        stats: getColumns(articleStats),
      })
      .from(article)
      .where(and(...conditions))
      .leftJoin(type, eq(article.typeId, type.id))
      .leftJoin(articleStats, eq(article.id, articleStats.articleId))
      .orderBy(desc(article.created_at))
      .limit(pageSize)
      .offset(offset),
  ]);

  return { list, total, page, pageSize };
});
