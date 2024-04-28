import jwt from "jsonwebtoken";

export default defineEventHandler(async event => {
  if (["get", "options"].includes(event.method.toLowerCase()))
    return;
  if (event.path.startsWith("/api/admin/login"))
    return;
  if (event.path.startsWith("/api/file"))
    return;
  if (/\/api\/article\/\d+\/comment/.test(event.path))
    return;
  if (/\/api\/comment\/\d+\/comment/.test(event.path))
    return;
  if (event.path.startsWith("/api/admin/info"))
    return;

  const authorization = getHeader(event, "Authorization") || "";

  // if (!authorization) return new Error("Authorization不存在");

  try {
    // 偷懒暂时先拿 EMAIL_PASS 做secretOrPublicKey
    const admin = jwt.verify(authorization, import.meta.env.EMAIL_PASS);
    event.context.admin = admin;
  }
  catch (err) {
    throw new Error("无可奈何");
  }
});
