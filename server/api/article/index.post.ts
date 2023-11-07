import * as v from "valibot";
import db from "~~/server/db";
import { article, articleStats, articleToTag } from "~~/server/db/schema";

const ArticleCreateSchema = v.object({
  title: v.pipe(v.string(), v.trim(), v.minLength(1, "请输入标题"), v.maxLength(100, "标题不能超过 100 字")),
  content: v.pipe(v.string(), v.trim(), v.minLength(1, "请输入正文")),
  typeId: v.pipe(v.number(), v.integer(), v.minValue(1, "请选择分类")),
  tagIds: v.optional(v.array(v.pipe(v.number(), v.integer(), v.minValue(1))), []),
});

defineRouteMeta({
  openAPI: {
    tags: ["article"],
    summary: "创建文章",
    description: "创建一篇新文章，并初始化文章统计数据与文章标签关联。需要 Bearer Token。",
    security: [{ bearerAuth: [] }],
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
                example: "我的第一篇文章",
              },
              content: {
                type: "string",
                description: "文章正文，至少 1 字，支持 Markdown。",
                example: "# Hello\n\n文章内容。",
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
      200: {
        description: "文章创建成功。",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                id: { type: "integer", description: "文章 ID。", example: 1 },
                title: { type: "string", description: "文章标题。" },
                content: { type: "string", description: "文章正文。" },
                typeId: { type: "integer", description: "分类 ID。" },
                created_at: { type: "string", format: "date-time", nullable: true },
                updated_at: { type: "string", format: "date-time", nullable: true },
                deleted_at: { type: "string", format: "date-time", nullable: true },
              },
            },
          },
        },
      },
      400: { description: "请求参数校验失败。" },
      401: { description: "未登录或令牌无效。" },
      500: { description: "文章创建失败。" },
    },
  },
});
export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, data => v.parse(ArticleCreateSchema, data));
  const tagIds = [...new Set(body.tagIds)];

  const [data] = await db.transaction(async tx => {
    const [created] = await tx
      .insert(article)
      .values({
        title: body.title,
        content: body.content,
        typeId: body.typeId,
      })
      .returning();

    if (!created) {
      throw createError({ statusCode: 500, message: "文章创建失败" });
    }

    await tx.insert(articleStats).values({ articleId: created.id });

    if (tagIds.length) {
      await tx.insert(articleToTag).values(tagIds.map(tagId => ({ articleId: created.id, tagId })));
    }

    return [created];
  });

  return data;
});
