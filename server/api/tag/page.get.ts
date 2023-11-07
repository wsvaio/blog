import { and, desc, getColumns, isNull, like } from "drizzle-orm";
import * as v from "valibot";
import db from "~~/server/db";
import { tag } from "~~/server/db/schema";
import { PageSchema } from "~~/server/utils";

export const TagListSchema = v.object({
  ...PageSchema,

  keyword: v.optional(v.pipe(v.string(), v.maxLength(100))),
});

defineRouteMeta({
  openAPI: {
    tags: ["tag"],
    summary: "分页查询标签",
    description: "分页查询未删除标签，支持名称关键字过滤。",
    parameters: [
      { name: "page", in: "query", required: false, schema: { type: "integer", minimum: 1 }, description: "页码，默认 1。" },
      { name: "pageSize", in: "query", required: false, schema: { type: "integer", minimum: 1, maximum: 100 }, description: "每页数量，默认 10，最大 100。" },
      { name: "keyword", in: "query", required: false, schema: { type: "string" }, description: "标签名称关键字，最多 100 字。" },
    ],
    responses: {
      200: { description: "分页标签结果。" },
      400: { description: "查询参数校验失败。" },
      500: { description: "服务器错误。" },
    },
  },
});

export default defineEventHandler(async (event) => {
  const query = await getValidatedQuery(event, (data) => v.parse(TagListSchema, data));

  const { page, pageSize, keyword } = query;
  const offset = (page - 1) * pageSize;

  // 构建查询条件
  const conditions = [isNull(tag.deleted_at)];
  if (keyword) {
    conditions.push(like(tag.name, `%${keyword}%`));
  }


  // 并行查询总数和列表
  const [total, list] = await Promise.all([
    db.$count(tag, and(...conditions)),

    db
      .select(getColumns(tag))
      .from(tag)
      .where(and(...conditions))
      .orderBy(desc(tag.created_at))
      .limit(pageSize)
      .offset(offset),
  ]);

  return { list, total, page, pageSize };
});
