import { getArticleId, recordArticleEvent } from "~~/server/utils/article-stats";

defineRouteMeta({
  openAPI: {
    tags: ["article", "stats"],
    summary: "点赞文章",
    description: "为指定文章增加一次点赞统计。需要 Bearer Token。",
    security: [{ bearerAuth: [] }],
    parameters: [
      { name: "id", in: "path", required: true, schema: { type: "integer", minimum: 1 }, description: "文章 ID。" },
    ],
    responses: {
      200: { description: "更新后的文章统计。" },
      400: { description: "文章 ID 不正确。" },
      401: { description: "未登录或令牌无效。" },
      404: { description: "文章不存在。" },
      500: { description: "服务器错误。" },
    },
  },
});

export default defineEventHandler(async event => {
  const articleId = getArticleId(event);
  const data = await recordArticleEvent({ articleId, event, eventType: "like" });

  return {
    code: 0,
    data,
    message: "ok",
  };
});
