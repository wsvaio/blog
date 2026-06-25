import { and, desc, eq, isNull, like } from "drizzle-orm";
import * as v from "valibot";
import db from "~~/server/db";
import { article, comment } from "~~/server/db/schema";
import { PageSchema } from "~~/server/utils";

const CommentAdminListSchema = v.object({
  ...PageSchema,
  keyword: v.optional(v.pipe(v.string(), v.maxLength(100))),
  articleId: v.optional(
    v.pipe(v.string(), v.transform(Number), v.number(), v.integer(), v.minValue(1)),
  ),
  status: v.optional(
    v.union([
      v.literal("pending"),
      v.literal("approved"),
      v.literal("rejected"),
    ], "状态不正确"),
  ),
});

defineRouteMeta({
  openAPI: {
    tags: ["comment"],
    summary: "分页查询评论",
    description: "分页查询评论，支持按内容关键字、文章ID、状态过滤。",
    parameters: [
      { name: "page", in: "query", required: false, schema: { type: "integer", minimum: 1 }, description: "页码，默认 1。" },
      { name: "pageSize", in: "query", required: false, schema: { type: "integer", minimum: 1, maximum: 100 }, description: "每页数量，默认 10，最大 100。" },
      { name: "keyword", in: "query", required: false, schema: { type: "string" }, description: "评论内容关键字，最多 100 字。" },
      { name: "articleId", in: "query", required: false, schema: { type: "integer", minimum: 1 }, description: "文章 ID。" },
      { name: "status", in: "query", required: false, schema: { type: "string", enum: ["pending", "approved", "rejected"] }, description: "评论状态：pending-待审核，approved-已通过，rejected-已拒绝。" },
    ],
    responses: {
      200: { description: "分页评论结果。" },
      400: { description: "查询参数校验失败。" },
      500: { description: "服务器错误。" },
    },
  },
});

export default defineEventHandler(async event => {
  const query = await getValidatedQuery(event, data => v.parse(CommentAdminListSchema, data));
  const { page, pageSize, keyword, articleId, status } = query;
  const offset = (page - 1) * pageSize;
  const conditions = [isNull(comment.deleted_at)];

  if (keyword) {
    conditions.push(like(comment.content, `%${keyword}%`));
  }
  if (articleId) {
    conditions.push(eq(comment.articleId, articleId));
  }
  if (status) {
    conditions.push(eq(comment.status, status));
  }

  const [total, list] = await Promise.all([
    db.$count(comment, and(...conditions)),
    db
      .select({
      id: comment.id,
      articleId: comment.articleId,
      parentId: comment.parentId,
      replyToId: comment.replyToId,
      nickname: comment.nickname,
      email: comment.email,
      website: comment.website,
      avatar: comment.avatar,
      content: comment.content,
      status: comment.status,
      likeCount: comment.likeCount,
      created_at: comment.created_at,
      updated_at: comment.updated_at,
      articleTitle: article.title,
    })
      .from(comment)
      .leftJoin(article, eq(comment.articleId, article.id))
      .where(and(...conditions))
      .orderBy(desc(comment.created_at))
      .limit(pageSize)
      .offset(offset),
  ]);

  return { list, total, page, pageSize };
});
