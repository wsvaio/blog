import * as v from "valibot";
import db from "~~/server/db";
import { tag } from "~~/server/db/schema";

const TagCreateSchema = v.object({
  name: v.pipe(v.string(), v.trim(), v.minLength(1, "请输入标签名称"), v.maxLength(50, "标签名称不能超过 50 字")),
});

defineRouteMeta({
  openAPI: {
    tags: ["tag"],
    summary: "创建标签",
    description: "创建一个新标签。需要 Bearer Token。",
    security: [{ bearerAuth: [] }],
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
      200: { description: "标签创建成功。" },
      400: { description: "请求参数校验失败。" },
      401: { description: "未登录或令牌无效。" },
      500: { description: "标签创建失败。" },
    },
  },
});

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, data => v.parse(TagCreateSchema, data));

  const [data] = await db
    .insert(tag)
    .values({ name: body.name })
    .returning();

  if (!data) {
    throw createError({ statusCode: 500, message: "标签创建失败" });
  }

  return data;
});
