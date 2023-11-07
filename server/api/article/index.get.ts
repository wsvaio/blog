import db from "~~/server/db";

defineRouteMeta({
  openAPI: {
    tags: ["article"],
    summary: "获取文章列表",
    description: "获取未删除文章列表，按创建时间倒序返回，并包含文章统计信息。",
    responses: {
      200: { description: "文章列表。" },
      500: { description: "服务器错误。" },
    },
  },
});

export default defineEventHandler(async () => {
  const list = await db.query.article.findMany({
    orderBy: { created_at: "desc" },
    where: {
      deleted_at: { isNull: true },
    },
    with: {
      stats: true,
    },
  });
  return list;
});
