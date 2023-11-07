import db from "~~/server/db";

defineRouteMeta({
  openAPI: {
    tags: ["type"],
    summary: "获取分类详情",
    description: "根据分类 ID 获取分类详情。",
    parameters: [
      { name: "id", in: "path", required: true, schema: { type: "integer", minimum: 1 }, description: "分类 ID。" },
    ],
    responses: {
      200: { description: "分类详情，未找到时可能返回空值。" },
      400: { description: "分类 ID 不正确。" },
      500: { description: "服务器错误。" },
    },
  },
});

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id")!;

  return await db.query.type.findFirst({ where: { id: { eq: +id } } });
});
