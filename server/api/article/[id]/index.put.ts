import { and, eq, isNull } from "drizzle-orm";
import * as v from "valibot";
import db from "~~/server/db";
import { article, articleToTag } from "~~/server/db/schema";

const ArticleIdSchema = v.pipe(v.string(), v.transform(Number), v.number(), v.integer(), v.minValue(1));

const ArticleUpdateSchema = v.object({
  title: v.pipe(v.string(), v.trim(), v.minLength(1, "请输入标题"), v.maxLength(100, "标题不能超过 100 字")),
  content: v.pipe(v.string(), v.trim(), v.minLength(1, "请输入正文")),
  typeId: v.pipe(v.number(), v.integer(), v.minValue(1, "请选择分类")),
  tagIds: v.optional(v.array(v.pipe(v.number(), v.integer(), v.minValue(1))), []),
});

defineRouteMeta({
  openAPI: {
    tags: ["article"],
    summary: "编辑文章",
    description: "编辑指定文章，并刷新文章标签关联。需要 Bearer Token。",
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
            required: ["title", "content", "typeId"],
            properties: {
              title: {
                type: "string",
                description: "文章标题，1-100 字。",
                example: "更新后的文章标题",
              },
              content: {
                type: "string",
                description: "文章正文，至少 1 字，支持 Markdown。",
                example: "# Updated\n\n更新后的文章内容。",
              },
              typeId: {
                type: "integer",
                minimum: 1,
                description: "分类 ID。",
                example: 1,
              },
              tagIds: {
                type: "array",
                description: "标签 ID 列表，可为空。",
                default: [],
                items: {
                  type: "integer",
                  minimum: 1,
                },
                example: [1, 2],
              },
            },
          },
        },
      },
    },
    responses: {
      200: { description: "文章编辑成功。" },
      400: { description: "请求参数校验失败。" },
      401: { description: "未登录或令牌无效。" },
      404: { description: "文章不存在。" },
      500: { description: "文章编辑失败。" },
    },
  },
});

export default defineEventHandler(async event => {
  const id = v.parse(ArticleIdSchema, getRouterParam(event, "id"));
  const body = await readValidatedBody(event, data => v.parse(ArticleUpdateSchema, data));
  const tagIds = [...new Set(body.tagIds)];
  const now = new Date();

  const [data] = await db.transaction(async tx => {
    const [updated] = await tx
      .update(article)
      .set({
        title: body.title,
        content: body.content,
        typeId: body.typeId,
        updated_at: now,
      })
      .where(and(eq(article.id, id), isNull(article.deleted_at)))
      .returning();

    if (!updated) {
      throw createError({ statusCode: 404, message: "文章不存在" });
    }

    await tx.delete(articleToTag).where(eq(articleToTag.articleId, id));

    if (tagIds.length) {
      await tx.insert(articleToTag).values(tagIds.map(tagId => ({ articleId: id, tagId })));
    }

    return [updated];
  });

  return data;
});
