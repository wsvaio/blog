import { and, desc, isNull, like } from "drizzle-orm";
import * as v from "valibot";
import db from "~~/server/db";
import { user } from "~~/server/db/schema";
import { PageSchema } from "~~/server/utils";
import { getSafeUserByEmail } from "~~/server/utils/user";

export const UserListSchema = v.object({
  ...PageSchema,
  keyword: v.optional(v.pipe(v.string(), v.maxLength(100))),
});

defineRouteMeta({
  openAPI: {
    tags: ["user"],
    summary: "分页查询用户",
    description: "分页查询未删除用户，返回安全用户字段，不包含密码哈希。",
    parameters: [
      { name: "page", in: "query", required: false, schema: { type: "integer", minimum: 1 }, description: "页码，默认 1。" },
      { name: "pageSize", in: "query", required: false, schema: { type: "integer", minimum: 1, maximum: 100 }, description: "每页数量，默认 10，最大 100。" },
      { name: "keyword", in: "query", required: false, schema: { type: "string" }, description: "昵称关键字，最多 100 字。" },
    ],
    responses: {
      200: { description: "分页用户结果。" },
      400: { description: "查询参数校验失败。" },
      500: { description: "服务器错误。" },
    },
  },
});

export default defineEventHandler(async event => {
  const query = await getValidatedQuery(event, data => v.parse(UserListSchema, data));
  const { page, pageSize, keyword } = query;
  const offset = (page - 1) * pageSize;
  const conditions = [isNull(user.deleted_at)];

  if (keyword) {
    conditions.push(like(user.name, `%${keyword}%`));
  }

  const [total, emails] = await Promise.all([
    db.$count(user, and(...conditions)),
    db
      .select({ email: user.email })
      .from(user)
      .where(and(...conditions))
      .orderBy(desc(user.created_at))
      .limit(pageSize)
      .offset(offset),
  ]);

  const list = (await Promise.all(emails.map(item => getSafeUserByEmail(item.email)))).filter(Boolean);

  return { list, total, page, pageSize };
});
