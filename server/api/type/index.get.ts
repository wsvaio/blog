import db from "~~/server/db";

defineRouteMeta({
  openAPI: {
    tags: ["type"],
    summary: "获取分类列表",
    description: "获取未删除分类列表，按创建时间倒序返回。",
    responses: {
      200: { description: "分类列表。" },
      500: { description: "服务器错误。" },
    },
  },
});

export default defineEventHandler(async () => {
  const list = await db.query.type.findMany({
    orderBy: { order: "asc", created_at: "desc" },
    where: {
      deleted_at: { isNull: true },
    },
  });
  return list;
});
