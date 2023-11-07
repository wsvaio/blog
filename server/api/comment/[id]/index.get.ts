import db from "~~/server/db";

defineRouteMeta({
  openAPI: {
    tags: ["comment"],
    summary: "获取评论详情",
    description: "根据评论 ID 获取已审核评论详情。",
    parameters: [
      { name: "id", in: "path", required: true, schema: { type: "integer", minimum: 1 }, description: "评论 ID。" },
    ],
    responses: {
      200: { description: "评论详情。" },
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

  const data = await db.query.comment.findFirst({
    where: {
      id,
      status: "approved",
      deleted_at: { isNull: true },
    },
  });

  if (!data) {
    throw createError({ statusCode: 404, message: "评论不存在" });
  }

  return data;
});
