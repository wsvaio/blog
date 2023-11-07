import db from "~~/server/db";

defineRouteMeta({
  openAPI: {
    tags: ["comment"],
    summary: "获取评论回复",
    description: "获取指定评论下已审核的子评论列表。",
    parameters: [
      { name: "id", in: "path", required: true, schema: { type: "integer", minimum: 1 }, description: "父评论 ID。" },
    ],
    responses: {
      200: { description: "子评论列表。" },
      400: { description: "评论 ID 不正确。" },
      404: { description: "评论不存在。" },
      500: { description: "服务器错误。" },
    },
  },
});

export default defineEventHandler(async event => {
  const id = Number(getRouterParam(event, "id"));

  if (!Number.isInteger(id) || id < 1) {
    throw createError({ statusCode: 400, message: "评论 ID 不正确" });
  }

  const data = await db.query.comment.findMany({
    where: {
      parentId: id,
      status: "approved",
      deleted_at: { isNull: true },
    },
  });

  if (!data) {
    throw createError({ statusCode: 404, message: "评论不存在" });
  }

  return data;
});
