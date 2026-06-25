import { eq, sql } from "drizzle-orm";
import * as v from "valibot";
import db from "~~/server/db";
import { articleStats, comment } from "~~/server/db/schema";
import { transporter } from "~~/server/utils";

const CommentUpdateSchema = v.object({
  status: v.union(
    [v.literal("pending"), v.literal("approved"), v.literal("rejected")],
    "状态不正确",
  ),
});

defineRouteMeta({
  openAPI: {
    tags: ["comment"],
    summary: "更新评论状态",
    description: "更新指定评论的状态（审核通过、拒绝等）。",
    parameters: [
      {
        name: "id",
        in: "path",
        required: true,
        schema: { type: "integer", minimum: 1 },
        description: "评论 ID。",
      },
    ],
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            required: ["status"],
            properties: {
              status: {
                type: "string",
                enum: ["pending", "approved", "rejected"],
                description: "评论状态",
              },
            },
          },
        },
      },
    },
    responses: {
      200: { description: "更新后的评论信息。" },
      400: { description: "请求体校验失败。" },
      404: { description: "评论不存在。" },
      500: { description: "服务器错误。" },
    },
  },
});

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, "id"));

  if (!Number.isInteger(id) || id < 1) {
    throw createError({ statusCode: 400, message: "评论 ID 不正确" });
  }

  const body = await readValidatedBody(event, (data) => v.parse(CommentUpdateSchema, data));

  const existed = await db.query.comment.findFirst({
    where: { id, deleted_at: { isNull: true } },
  });

  if (!existed) {
    throw createError({ statusCode: 404, message: "评论不存在" });
  }

  const wasPending = existed.status === "pending";
  const isNowApproved = body.status === "approved";

  await db
    .update(comment)
    .set({ status: body.status, updated_at: new Date() })
    .where(eq(comment.id, id));

  // 从 pending 变为 approved 时，发送邮件通知并更新统计
  if (wasPending && isNowApproved) {
    // 1. 更新 article_stats 评论数
    await db
      .insert(articleStats)
      .values({ articleId: existed.articleId, commentCount: 1, updated_at: new Date() })
      .onConflictDoUpdate({
        target: articleStats.articleId,
        set: {
          commentCount: sql`${articleStats.commentCount} + 1`,
          updated_at: new Date(),
        },
      });

    // 2. 发送邮件通知
    try {
      const article = await db.query.article.findFirst({
        where: { id: existed.articleId },
      });

      // 通知被回复的人
      if (existed.replyToId) {
        const replyToComment = await db.query.comment.findFirst({
          where: { id: existed.replyToId },
        });
        if (replyToComment?.email) {
          await transporter.sendMail({
            from: '"Blog" <wsvaio@qq.com>',
            to: replyToComment.email,
            subject: "您的评论收到了回复",
            html: `<div style="max-width: 600px; margin: 0 auto; padding: 20px;">
              <h2>您的评论收到了新回复</h2>
              <p><strong>原评论：</strong></p>
              <blockquote style="background: #f5f5f5; padding: 10px; border-radius: 8px;">
                ${replyToComment.content}
              </blockquote>
              <p><strong>回复内容：</strong></p>
              <blockquote style="background: #f5f5f5; padding: 10px; border-radius: 8px;">
                ${existed.content}
              </blockquote>
              <p><strong>回复人：</strong>${existed.nickname}</p>
              <p><strong>文章：</strong>${article?.title || "未知文章"}</p>
              <p>
                <a href="${process.env.NUXT_PUBLIC_SITE_URL || "http://localhost:3000"}/article/${existed.articleId}"
                   style="display: inline-block; padding: 10px 20px; background: #0070f3; color: white; text-decoration: none; border-radius: 6px;">
                  查看回复
                </a>
              </p>
            </div>`,
          });
        }
      }
    } catch (err) {
      console.error("邮件发送失败：", err);
    }
  }

  return await db.query.comment.findFirst({ where: { id } });
});
