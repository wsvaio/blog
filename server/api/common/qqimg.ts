// https://v1.hitokoto.cn/
export default defineEventHandler(async event => {
  const query = getQuery(event);
  const data = await fetch(`https://zj.v.api.aa1.cn/api/qqtx-jm/?qq=${query.qq}&type=json`).then(data => data.json());

  return {
    raw: data,
    content: data.img,
  };
});
