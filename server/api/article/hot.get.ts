import { and, desc, eq, getColumns, isNull } from "drizzle-orm";
import db from "~~/server/db";
import { article, articleStats } from "~~/server/db/schema";

defineRouteMeta({
  openAPI: {
    tags: ["article"],
    summary: "获取热门文章",
    description: "获取未删除文章中浏览量最高的前 10 篇文章。",
    responses: {
      200: { description: "热门文章列表。" },
      500: { description: "服务器错误。" },
    },
  },
});

export default defineEventHandler(async () => {
  const list = await db
    .select({
      ...getColumns(article),
      stats: getColumns(articleStats),
    })
    .from(article)
    .leftJoin(articleStats, eq(article.id, articleStats.articleId))
    .where(and(isNull(article.deleted_at)))
    .orderBy(desc(articleStats.viewCount))
    .limit(10);
  return list;
});
