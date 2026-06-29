defineRouteMeta({
  openAPI: {
    tags: ["task"],
    summary: "清理过期文件",
    description: "清理过期文件任务。",
    parameters: [],
    responses: {
      200: { description: "清理成功。" },
      500: { description: "服务器错误。" },
    },
  },
});
export default defineEventHandler(async () => await runTask("cleanup"));
