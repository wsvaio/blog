import db from "~~/server/db";

defineRouteMeta({
  openAPI: {
    tags: ["article"],
    summary: "获取上一篇和下一篇文章",
    description: "根据当前文章 ID 获取相邻的上一篇和下一篇文章。",
    parameters: [
      { name: "id", in: "path", required: true, schema: { type: "integer", minimum: 1 }, description: "当前文章 ID。" },
    ],
    responses: {
      200: { description: "上一篇和下一篇文章。" },
      400: { description: "文章 ID 不正确。" },
      500: { description: "服务器错误。" },
    },
  },
});

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  if (!id) return;
  const pre = await db.query.article.findFirst({
    where: { id: { lt: Number(id) } },
  });
  const next = await db.query.article.findFirst({
    where: { id: { gt: Number(id) } },
  });

  return { pre, next };
});
