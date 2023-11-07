import { and, eq, isNull } from "drizzle-orm";
import * as v from "valibot";
import db from "~~/server/db";
import { tag } from "~~/server/db/schema";

const TagIdSchema = v.pipe(v.string(), v.transform(Number), v.number(), v.integer(), v.minValue(1));

const TagUpdateSchema = v.object({
  name: v.pipe(v.string(), v.trim(), v.minLength(1, "请输入标签名称"), v.maxLength(50, "标签名称不能超过 50 字")),
});

defineRouteMeta({
  openAPI: {
    tags: ["tag"],
    summary: "编辑标签",
    description: "编辑指定标签的名称。需要 Bearer Token。",
    security: [{ bearerAuth: [] }],
    parameters: [
      { name: "id", in: "path", required: true, schema: { type: "integer", minimum: 1 }, description: "标签 ID。" },
    ],
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            required: ["name"],
            properties: {
              name: { type: "string", description: "标签名称，1-50 字。", example: "Vue" },
            },
          },
        },
      },
    },
    responses: {
      200: { description: "标签编辑成功。" },
      400: { description: "请求参数校验失败。" },
      401: { description: "未登录或令牌无效。" },
      404: { description: "标签不存在。" },
      500: { description: "标签编辑失败。" },
    },
  },
});

export default defineEventHandler(async event => {
  const id = v.parse(TagIdSchema, getRouterParam(event, "id"));
  const body = await readValidatedBody(event, data => v.parse(TagUpdateSchema, data));
  const now = new Date();

  const [data] = await db
    .update(tag)
    .set({ name: body.name, updated_at: now })
    .where(and(eq(tag.id, id), isNull(tag.deleted_at)))
    .returning();

  if (!data) {
    throw createError({ statusCode: 404, message: "标签不存在" });
  }

  return data;
});
