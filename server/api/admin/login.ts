import jwt from "jsonwebtoken";

export default defineEventHandler(async event => {
  const body = await readBody(event);
  if (!body)
    return new Error("参数呢？");
  const { username, password } = await readBody(event);
  if (!username)
    return new Error("用户名呢？");
  if (!password)
    return new Error("密码呢？");

  const admin = await db.admin.findUnique({
    where: {
      username,
    },
  });

  if (!admin)
    return new Error("查无此人");

  if (admin.password !== password)
    return new Error("你的密码不对劲");

  // @ts-expect-error pass
  delete admin.password;

  return jwt.sign(admin, import.meta.env.EMAIL_PASS);
});
