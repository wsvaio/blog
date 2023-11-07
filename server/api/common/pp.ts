defineRouteMeta({
  openAPI: {
    tags: ["common"],
    summary: "获取随机头像",
    description: "调用外部头像接口，返回原始响应和头像图片地址。",
    responses: {
      200: { description: "随机头像结果。" },
      500: { description: "外部头像服务异常或服务器错误。" },
    },
  },
});

export default defineEventHandler(async () => {
  // const data = await fetch("https://v2.api-m.com/api/head?return=json").then(data => data.json());
  const data = await fetch("https://free.wqwlkj.cn/wqwlapi/select_avatar.php?type=json").then(data => data.json());

  return {
    raw: data,
    content: data?.picurl?.[0]?.imgurl,
  };
});
