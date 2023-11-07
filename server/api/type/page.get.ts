import { and, asc, desc, getColumns, isNull, like } from "drizzle-orm";
import * as v from "valibot";
import db from "~~/server/db";
import { type } from "~~/server/db/schema";
import { PageSchema } from "~~/server/utils";

export const TypeListSchema = v.object({
  ...PageSchema,

  keyword: v.optional(v.pipe(v.string(), v.maxLength(100))),
});

defineRouteMeta({
  openAPI: {
    tags: ["type"],
    summary: "分页查询分类",
    description: "分页查询未删除分类，支持名称关键字过滤。",
    parameters: [
      { name: "page", in: "query", required: false, schema: { type: "integer", minimum: 1 }, description: "页码，默认 1。" },
      { name: "pageSize", in: "query", required: false, schema: { type: "integer", minimum: 1, maximum: 100 }, description: "每页数量，默认 10，最大 100。" },
      { name: "keyword", in: "query", required: false, schema: { type: "string" }, description: "分类名称关键字，最多 100 字。" },
    ],
    responses: {
      200: { description: "分页分类结果。" },
      400: { description: "查询参数校验失败。" },
      500: { description: "服务器错误。" },
    },
  },
});

export default defineEventHandler(async (event) => {
  const query = await getValidatedQuery(event, (data) => v.parse(TypeListSchema, data));

  const { page, pageSize, keyword } = query;
  const offset = (page - 1) * pageSize;

  const conditions = [isNull(type.deleted_at)];
  if (keyword) {
    conditions.push(like(type.name, `%${keyword}%`));
  }

  const [total, list] = await Promise.all([
    db.$count(type, and(...conditions)),

    db
      .select(getColumns(type))
      .from(type)
      .where(and(...conditions))
      .orderBy(asc(type.order), desc(type.created_at))
      .limit(pageSize)
      .offset(offset),
  ]);

  return { list, total, page, pageSize };
});
