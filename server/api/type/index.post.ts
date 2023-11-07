import * as v from "valibot";
import db from "~~/server/db";
import { type } from "~~/server/db/schema";

const TypeCreateSchema = v.object({
  name: v.pipe(v.string(), v.trim(), v.minLength(1, "请输入分类名称"), v.maxLength(50, "分类名称不能超过 50 字")),
  icon: v.optional(v.pipe(v.string(), v.maxLength(50)), ""),
  description: v.optional(v.pipe(v.string(), v.maxLength(200)), ""),
  order: v.optional(v.pipe(v.number(), v.integer()), 0),
});

defineRouteMeta({
  openAPI: {
    tags: ["type"],
    summary: "创建分类",
    description: "创建一个新分类。需要 Bearer Token。",
    security: [{ bearerAuth: [] }],
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
      200: { description: "分类创建成功。" },
      400: { description: "请求参数校验失败。" },
      401: { description: "未登录或令牌无效。" },
      500: { description: "分类创建失败。" },
    },
  },
});

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, data => v.parse(TypeCreateSchema, data));

  const [data] = await db
    .insert(type)
    .values({
      name: body.name,
      icon: body.icon,
      description: body.description,
      order: body.order,
    })
    .returning();

  if (!data) {
    throw createError({ statusCode: 500, message: "分类创建失败" });
  }

  return data;
});
