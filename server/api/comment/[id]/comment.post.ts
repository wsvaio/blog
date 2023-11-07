import * as v from "valibot";
import {
    assertArticleExists,
    createComment,
    ReplyCommentBodySchema
} from "~~/server/utils/comment";

defineRouteMeta({
  openAPI: {
    tags: ["comment"],
    summary: "回复评论",
    description: "回复指定评论。该接口为公开接口。悄悄话不会保存展示。",
    parameters: [
      { name: "id", in: "path", required: true, schema: { type: "integer", minimum: 1 }, description: "被回复的评论 ID。" },
    ],
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            required: ["articleId", "content", "name", "email", "notARobot"],
            properties: {
              articleId: { type: "integer", minimum: 1, description: "文章 ID。" },
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
      200: { description: "回复提交结果。" },
      400: { description: "评论 ID 或请求体校验失败。" },
      404: { description: "文章不存在。" },
      500: { description: "服务器错误。" },
    },
  },
});

export default defineEventHandler(async event => {
  const replyToId = Number(getRouterParam(event, "id"));

  if (!Number.isInteger(replyToId) || replyToId < 1) {
    throw createError({ statusCode: 400, message: "评论 ID 不正确" });
  }

  const body = await readValidatedBody(event, data => v.parse(ReplyCommentBodySchema, data));
  await assertArticleExists(body.articleId);
  // const replyTo = await assertCommentExists(replyToId, body.articleId);
  const data = await createComment({
    articleId: body.articleId,
    body,
    event,
    // parentId: replyTo.parentId || replyTo.id,
    // replyToId: replyTo.id,
    parentId: replyToId,
    replyToId: replyToId,
  });

  return {
    code: 0,
    data,
    message: body.whispers ? "悄悄话发送成功" : "回复提交成功，等待审核后展示",
  };
});
