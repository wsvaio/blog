// https://v1.hitokoto.cn/
export default defineEventHandler(async () => {
  // const data = await fetch("https://api.gumengya.com/Api/YiYan?format=json").then(data => data.json());
  const data = await fetch("https://api.xygeng.cn/one").then(data => data.json());

  return {
    raw: data,
    content: data?.data?.content,
  };
});
