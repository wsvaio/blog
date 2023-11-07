import { arrayToTree } from "~~/server/utils";
import { getApprovedComments } from "~~/server/utils/comment";

defineRouteMeta({
  openAPI: {
    tags: ["comment"],
    summary: "获取公开评论树",
    description: "获取所有已审核评论，并转换为评论树结构。",
    responses: {
      200: { description: "评论树列表，子评论字段为 comments。" },
      500: { description: "服务器错误。" },
    },
  },
});

export default defineEventHandler(async () => {
  const list = await getApprovedComments();

  return (
    arrayToTree(list, null, {
      idKey: "id",
      pidKey: "parentId",
      childrenKey: "comments",
    }) || []
  );
});
