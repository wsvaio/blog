import db from "~~/server/db";

defineRouteMeta({
  openAPI: {
    tags: ["article"],
    summary: "获取文章详情",
    description: "根据文章 ID 获取单篇文章，包含标签、分类和统计信息。",
    parameters: [
      { name: "id", in: "path", required: true, schema: { type: "integer", minimum: 1 }, description: "文章 ID。" },
    ],
    responses: {
      200: { description: "文章详情，未找到时可能返回空值。" },
      400: { description: "文章 ID 不正确。" },
      500: { description: "服务器错误。" },
    },
  },
});

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  if (!id) return;
  const article = await db.query.article.findFirst({
    where: { id: Number(id) },
    with: {
      tags: true,
      type: true,
      stats: true,
    },
  });
  return article;
});
