import { eq } from "drizzle-orm";
import db from "~~/server/db";
import { comment } from "~~/server/db/schema";

defineRouteMeta({
  openAPI: {
    tags: ["comment"],
    summary: "删除评论",
    description: "软删除指定评论。",
    parameters: [
      { name: "id", in: "path", required: true, schema: { type: "integer", minimum: 1 }, description: "评论 ID。" },
    ],
    responses: {
      200: { description: "删除成功。" },
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

  const existed = await db.query.comment.findFirst({
    where: { id, deleted_at: { isNull: true } },
  });

  if (!existed) {
    throw createError({ statusCode: 404, message: "评论不存在" });
  }

  await db.update(comment).set({ deleted_at: new Date() }).where(eq(comment.id, id));

  return { code: 0, data: null, message: "删除成功" };
});
