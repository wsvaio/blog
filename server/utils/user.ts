import { and, eq, getColumns, isNull } from "drizzle-orm";
import * as v from "valibot";
import db from "~~/server/db";
import { user } from "~~/server/db/schema";

const { passwordHash: _passwordHash, ...safeUserColumns } = getColumns(user);

export const UserCreateSchema = v.object({
  name: v.pipe(v.string(), v.trim(), v.minLength(1, "请输入昵称"), v.maxLength(50, "昵称不能超过 50 字")),
  email: v.pipe(v.string(), v.trim(), v.email("请输入正确的邮箱"), v.maxLength(100, "邮箱不能超过 100 字")),
  avatar: v.optional(v.pipe(v.string(), v.trim(), v.maxLength(500, "头像地址不能超过 500 字")), ""),
  site: v.optional(v.pipe(v.string(), v.trim(), v.maxLength(200, "主页地址不能超过 200 字")), ""),
  acceptEmails: v.optional(v.boolean(), false),
});

export const UserUpdateSchema = v.partial(UserCreateSchema);

export function getUserId(event: Parameters<typeof getRouterParam>[0]) {
  const id = Number(getRouterParam(event, "id"));

  if (!Number.isInteger(id) || id < 1) {
    throw createError({ statusCode: 400, message: "用户 ID 不正确" });
  }

  return id;
}

export async function getSafeUserById(id: number) {
  const data = await db
    .select(safeUserColumns)
    .from(user)
    .where(and(eq(user.id, id), isNull(user.deleted_at)))
    .limit(1);

  return data[0];
}

export async function getSafeUserByEmail(email: string) {
  const data = await db
    .select(safeUserColumns)
    .from(user)
    .where(and(eq(user.email, email), isNull(user.deleted_at)))
    .limit(1);

  return data[0];
}

export async function assertUserExists(id: number) {
  const data = await getSafeUserById(id);

  if (!data) {
    throw createError({ statusCode: 404, message: "用户不存在" });
  }

  return data;
}
