defineRouteMeta({
  openAPI: {
    tags: ["common"],
    summary: "获取请求头",
    description: "返回当前请求的所有请求头，主要用于调试。",
    responses: {
      200: { description: "请求头对象。" },
    },
  },
});

export default defineEventHandler(async event => {
  return getHeaders(event);
});
