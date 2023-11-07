import { and, eq, isNull } from "drizzle-orm";
import * as v from "valibot";
import db from "~~/server/db";
import { type } from "~~/server/db/schema";

const TypeIdSchema = v.pipe(v.string(), v.transform(Number), v.number(), v.integer(), v.minValue(1));

const TypeUpdateSchema = v.object({
  name: v.pipe(v.string(), v.trim(), v.minLength(1, "请输入分类名称"), v.maxLength(50, "分类名称不能超过 50 字")),
  icon: v.optional(v.pipe(v.string(), v.maxLength(50)), ""),
  description: v.optional(v.pipe(v.string(), v.maxLength(200)), ""),
  order: v.optional(v.pipe(v.number(), v.integer()), 0),
});

defineRouteMeta({
  openAPI: {
    tags: ["type"],
    summary: "编辑分类",
    description: "编辑指定分类的名称、图标和描述。需要 Bearer Token。",
    security: [{ bearerAuth: [] }],
    parameters: [
      { name: "id", in: "path", required: true, schema: { type: "integer", minimum: 1 }, description: "分类 ID。" },
    ],
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            required: ["name"],
            properties: {
              name: { type: "string", description: "分类名称，1-50 字。", example: "技术" },
              icon: { type: "string", description: "分类图标，最多 50 字。", example: "i-carbon:code" },
              description: { type: "string", description: "分类描述，最多 200 字。", example: "技术相关文章" },
            },
          },
        },
      },
    },
    responses: {
      200: { description: "分类编辑成功。" },
      400: { description: "请求参数校验失败。" },
      401: { description: "未登录或令牌无效。" },
      404: { description: "分类不存在。" },
      500: { description: "分类编辑失败。" },
    },
  },
});

export default defineEventHandler(async event => {
  const id = v.parse(TypeIdSchema, getRouterParam(event, "id"));
  const body = await readValidatedBody(event, data => v.parse(TypeUpdateSchema, data));
  const now = new Date();

  const [data] = await db
    .update(type)
    .set({
      name: body.name,
      icon: body.icon,
      description: body.description,
      order: body.order,
      updated_at: now,
    })
    .where(and(eq(type.id, id), isNull(type.deleted_at)))
    .returning();

  if (!data) {
    throw createError({ statusCode: 404, message: "分类不存在" });
  }

  return data;
});
