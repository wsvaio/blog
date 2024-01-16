// https://v1.hitokoto.cn/
export default defineEventHandler(async () => {
  const date = new Date();
  const data = await fetch(
		`http://www.wudada.online/Api/ScLsDay?month=${date.getMonth() + 1}&&day=${date.getDate()}`
  ).then(data => data.json());

  return {
    raw: data,
    content: data.data,
  };
});
