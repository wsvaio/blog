export default defineEventHandler(async event => {
	const query = getQuery(event);
	const url = (Array.isArray(query.url) ? query.url[0] : query.url);
	if (url) {
		return await fetch(url);
	}
	else {
		const data = await fetch("https://www.dmoe.cc/random.php?return=json").then(data => data.json());
		return {
			...data,
			url: `/api/dmoe?url=${data.imgurl}`,
		};
	}
});
