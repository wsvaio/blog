import { and, desc, getColumns, inArray, isNull, sql } from "drizzle-orm";
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
  const articleTypeFilter = query.typeId
    ? sql`AND ${article.typeId} = ${query.typeId}`
    : sql``;

  if (query.typeId) {
    conditions.push(
      inArray(
        tag.id,
        sql`(SELECT ${articleToTag.tagId}
            FROM ${articleToTag}
            JOIN ${article} ON ${article.id} = ${articleToTag.articleId}
            WHERE ${article.typeId} = ${query.typeId}
              AND ${article.deleted_at} IS NULL)`,
      ),
    );
  }

  const list = await db
    .select({
      ...getColumns(tag),
      articles: sql<{ id: number }[]>`
        COALESCE(
          (
            SELECT json_agg(json_build_object('id', ${article.id}))
            FROM ${articleToTag}
            JOIN ${article} ON ${article.id} = ${articleToTag.articleId}
            WHERE ${articleToTag.tagId} = ${tag.id}
              AND ${article.deleted_at} IS NULL
              ${articleTypeFilter}
          ),
          '[]'::json
        )
      `,
    })
    .from(tag)
    .where(and(...conditions))
    .orderBy(desc(tag.created_at));
  return list;
});
