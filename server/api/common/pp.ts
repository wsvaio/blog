export default defineEventHandler(async () => {
  // const data = await fetch("https://v2.api-m.com/api/head?return=json").then(data => data.json());
  const data = await fetch("https://free.wqwlkj.cn/wqwlapi/select_avatar.php?type=json").then(data => data.json());

  return {
    raw: data,
    content: data?.picurl?.[0]?.imgurl,
  };
});
