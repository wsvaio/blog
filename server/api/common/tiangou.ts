// https://v1.hitokoto.cn/
export default defineEventHandler(async () => {
	// const data = await fetch("https://v.api.aa1.cn/api/tiangou/index.php").then(data => data.text());

	const data = await fetch("https://v2.api-m.com/api/dog").then(data => data.json());

	return {
		raw: data,
		content: data.data,
	};
});
