defineRouteMeta({
  openAPI: {
    tags: ["auth"],
    summary: "退出登录",
    description: "JWT 模式下登出不需要服务端状态变更，客户端清除 token 即可。需要 Bearer Token。",
    security: [{ bearerAuth: [] }],
    responses: {
      200: { description: "登出成功。" },
      401: { description: "未登录或令牌无效。" },
    },
  },
});

export default defineEventHandler(() => {
  // JWT 模式下登出不需要服务端操作，客户端自动清除 token
  return {
    code: 200,
    data: null,
    message: "登出成功",
  };
});
