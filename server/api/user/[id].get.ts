import { assertUserExists, getUserId } from "~~/server/utils/user";

defineRouteMeta({
  openAPI: {
    tags: ["user"],
    summary: "获取用户详情",
    description: "根据用户 ID 获取安全用户信息。",
    parameters: [
      { name: "id", in: "path", required: true, schema: { type: "integer", minimum: 1 }, description: "用户 ID。" },
    ],
    responses: {
      200: { description: "安全用户信息。" },
      400: { description: "用户 ID 不正确。" },
      404: { description: "用户不存在。" },
      500: { description: "服务器错误。" },
    },
  },
});

export default defineEventHandler(async event => {
  const id = getUserId(event);

  return await assertUserExists(id);
});
