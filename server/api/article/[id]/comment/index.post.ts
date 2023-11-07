import * as v from "valibot";
import { assertArticleExists, CommentBodySchema, createComment } from "~~/server/utils/comment";

defineRouteMeta({
  openAPI: {
    tags: ["article", "comment"],
    summary: "发表文章评论",
    description: "给指定文章提交评论。需要 Bearer Token。悄悄话不会保存展示。",
    security: [{ bearerAuth: [] }],
    parameters: [
      { name: "id", in: "path", required: true, schema: { type: "integer", minimum: 1 }, description: "文章 ID。" },
    ],
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            required: ["content", "name", "email", "notARobot"],
            properties: {
              content: { type: "string", description: "评论内容，1-2000 字。" },
              name: { type: "string", description: "昵称，1-50 字。" },
              email: { type: "string", format: "email", description: "邮箱，最多 100 字。" },
              site: { type: "string", description: "主页地址，可为空。" },
              avatar: { type: "string", description: "头像地址，可为空。" },
              whispers: { type: "boolean", default: false, description: "是否为悄悄话。" },
              notARobot: { type: "boolean", description: "必须为 true。" },
            },
          },
        },
      },
    },
    responses: {
      200: { description: "评论提交结果。" },
      400: { description: "文章 ID 或请求体校验失败。" },
      401: { description: "未登录或令牌无效。" },
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

  const body = await readValidatedBody(event, data => v.parse(CommentBodySchema, data));
  const data = await createComment({ articleId, body, event });

  return {
    code: 0,
    data,
    message: body.whispers ? "悄悄话发送成功" : "评论提交成功，等待审核后展示",
  };
});
