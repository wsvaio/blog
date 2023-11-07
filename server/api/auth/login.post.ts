import { eq } from "drizzle-orm";
import { createError } from "h3";
import { SignJWT } from "jose";
import db from "~~/server/db";
import { user } from "~~/server/db/schema";
import { verifyPassword } from "~~/server/utils/password";

defineRouteMeta({
  openAPI: {
    tags: ["auth"],
    summary: "登录",
    description: "使用邮箱和密码登录，成功后返回 JWT。",
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            required: ["email", "password"],
            properties: {
              email: { type: "string", format: "email", description: "邮箱。" },
              password: { type: "string", format: "password", description: "密码。" },
            },
          },
        },
      },
    },
    responses: {
      200: { description: "登录成功，返回 token。" },
      400: { description: "邮箱和密码不能为空。" },
      401: { description: "邮箱或密码错误。" },
      500: { description: "服务器错误。" },
    },
  },
});

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event);
  if (!email || !password) {
    throw createError({ statusCode: 400, message: "邮箱和密码不能为空" });
  }
  const foundUser = await db.query.user.findFirst({
    where: { email: { eq: email } },
  });
  if (!foundUser?.passwordHash) {
    throw createError({ statusCode: 401, message: "邮箱或密码错误" });
  }
  // 校验密码
  const passwordMatch = verifyPassword(password, foundUser.passwordHash);
  if (!passwordMatch) {
    throw createError({ statusCode: 401, message: "邮箱或密码错误" });
  }
  // 生成 JWT
  const secret = new TextEncoder().encode(useRuntimeConfig().jwtSecret);
  const token = await new SignJWT({
    id: foundUser.id,
    email: foundUser.email,
    role: foundUser.role,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
  // 更新最后登录时间
  await db.update(user).set({ lastLoginAt: new Date() }).where(eq(user.id, foundUser.id));
  return {
    code: 200,
    data: { token },
    message: "登录成功",
  };
});
