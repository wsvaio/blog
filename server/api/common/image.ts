export default defineEventHandler(async event => {
	const query = getQuery(event);

	if (query.type == "dongman") {
		return {
			content: `https://t.mwm.moe/pc/?key=${Math.random()}`,
		};
	}
	else {
		return {
			// raw: data,
			content: `https://bing.icodeq.com?key=${Math.random()}`,
		};
	}

	// const data = await fetch("https://bing.icodeq.com").then(data => data.text());
});
