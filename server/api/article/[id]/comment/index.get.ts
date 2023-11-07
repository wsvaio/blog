import { arrayToTree } from "~~/server/utils";
import { assertArticleExists, getApprovedComments } from "~~/server/utils/comment";

defineRouteMeta({
  openAPI: {
    tags: ["article", "comment"],
    summary: "获取文章评论",
    description: "获取指定文章下已审核评论的树结构。",
    parameters: [
      { name: "id", in: "path", required: true, schema: { type: "integer", minimum: 1 }, description: "文章 ID。" },
    ],
    responses: {
      200: { description: "评论树列表，子评论字段为 comments。" },
      400: { description: "文章 ID 不正确。" },
      404: { description: "文章不存在。" },
      500: { description: "服务器错误。" },
    },
  },
});

export default defineEventHandler(async event => {
  const articleId = Number(getRouterParam(event, "id"));

  if (!Number.isInteger(articleId) || articleId < 1) {
    throw createError({ statusCode: 400, message: "文章 ID 不正确" });
  }

  await assertArticleExists(articleId);

  const list = await getApprovedComments(articleId);

  return (
    arrayToTree(list, null, {
      idKey: "id",
      pidKey: "parentId",
      childrenKey: "comments",
    }) || []
  );
});
