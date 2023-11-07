import { getArticleId, getArticleStats } from "~~/server/utils/article-stats";
import { assertArticleExists } from "~~/server/utils/comment";

defineRouteMeta({
  openAPI: {
    tags: ["article", "stats"],
    summary: "获取文章统计",
    description: "获取指定文章的阅读、点赞、分享和评论统计。",
    parameters: [
      { name: "id", in: "path", required: true, schema: { type: "integer", minimum: 1 }, description: "文章 ID。" },
    ],
    responses: {
      200: { description: "文章统计。" },
      400: { description: "文章 ID 不正确。" },
      404: { description: "文章不存在。" },
      500: { description: "服务器错误。" },
    },
  },
});

export default defineEventHandler(async event => {
  const articleId = getArticleId(event);

  await assertArticleExists(articleId);

  return {
    code: 0,
    data: await getArticleStats(articleId),
    message: "ok",
  };
});
