import { and, eq, isNull, sql } from "drizzle-orm";
import { createError, getHeader, getRequestIP } from "h3";
import { createHash } from "node:crypto";
import * as v from "valibot";
import db from "~~/server/db";
import { articleStats, comment } from "~~/server/db/schema";

export const CommentBodySchema = v.object({
  content: v.pipe(
    v.string(),
    v.trim(),
    v.minLength(1, "请输入评论"),
    v.maxLength(2000, "评论不能超过 2000 字"),
  ),
  name: v.pipe(
    v.string(),
    v.trim(),
    v.minLength(1, "请输入昵称"),
    v.maxLength(50, "昵称不能超过 50 字"),
  ),
  email: v.pipe(
    v.string(),
    v.trim(),
    v.email("请输入正确的邮箱"),
    v.maxLength(100, "邮箱不能超过 100 字"),
  ),
  site: v.optional(v.pipe(v.string(), v.trim(), v.maxLength(200, "主页地址不能超过 200 字")), ""),
  avatar: v.optional(v.pipe(v.string(), v.trim(), v.maxLength(500, "头像地址不能超过 500 字")), ""),
  whispers: v.optional(v.boolean(), false),
  notARobot: v.literal(true, "请确认你不是机器人"),
});

export const ReplyCommentBodySchema = v.object({
  ...CommentBodySchema.entries,
  articleId: v.pipe(v.number(), v.integer(), v.minValue(1)),
});

export type CommentBody = v.InferOutput<typeof CommentBodySchema>;
export type ReplyCommentBody = v.InferOutput<typeof ReplyCommentBodySchema>;

type RequestEvent = Parameters<typeof getRequestIP>[0];

export function getRequestMeta(event: RequestEvent) {
  const ip = getRequestIP(event, { xForwardedFor: true }) || "";
  const userAgent = getHeader(event, "user-agent") || "";

  return {
    ipHash: ip ? createHash("sha256").update(ip).digest("hex") : null,
    userAgent,
  };
}

export async function assertArticleExists(articleId: number) {
  const data = await db.query.article.findFirst({
    where: { id: articleId, deleted_at: { isNull: true } },
  });

  if (!data) {
    throw createError({ statusCode: 404, message: "文章不存在" });
  }

  return data;
}

export async function assertCommentExists(commentId: number, articleId?: number) {
  const data = await db.query.comment.findFirst({
    where: {
      id: commentId,
      deleted_at: { isNull: true },
      ...(articleId ? { articleId } : {}),
    },
  });

  if (!data) {
    throw createError({ statusCode: 404, message: "评论不存在" });
  }

  return data;
}

export async function createComment(params: {
  articleId: number;
  body: CommentBody;
  event: RequestEvent;
  parentId?: number | null;
  replyToId?: number | null;
}) {
  const { body, articleId, event, parentId = null, replyToId = null } = params;
  const { ipHash, userAgent } = getRequestMeta(event);

  if (body.whispers) {
    return null;
  }

  const [data] = await db
    .insert(comment)
    .values({
      articleId,
      parentId,
      replyToId,
      nickname: body.name,
      email: body.email,
      website: body.site,
      avatar: body.avatar,
      content: body.content,
      ipHash,
      userAgent,
      status: "approved",
    })
    .returning();

  await db
    .insert(articleStats)
    .values({ articleId, commentCount: 1, updated_at: new Date() })
    .onConflictDoUpdate({
      target: articleStats.articleId,
      set: {
        commentCount: sql`${articleStats.commentCount} + 1`,
        updated_at: new Date(),
      },
    });

  return data;
}

export async function getApprovedComments(articleId?: number) {
  const conditions = [isNull(comment.deleted_at), eq(comment.status, "approved")];

  if (articleId) {
    conditions.push(eq(comment.articleId, articleId));
  }

  return await db
    .select()
    .from(comment)
    .where(and(...conditions))
    .orderBy(comment.created_at);
}
