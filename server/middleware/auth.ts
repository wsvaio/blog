import jwt from "jsonwebtoken";

export default defineEventHandler(async event => {
  if (
    (!["get", "options"].includes(event.method.toLowerCase()) && !event.path.startsWith("/api/admin/login")) && !(/\/api\/article\/\d+\/comment/.test(event.path)) ||
    event.path.startsWith("/api/admin/info")

  ) {
    const authorization = getHeader(event, "Authorization") || "";

    // if (!authorization) return new Error("Authorization不存在");

    try {
      const admin = jwt.verify(authorization, "是我卡了吗");
      event.context.admin = admin;
    } catch (err) {
      throw new Error("无可奈何");
    }
  }
});
