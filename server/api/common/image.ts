export default defineEventHandler(async () => {
	// const data = await fetch("https://bing.icodeq.com").then(data => data.text());
	return {
		// raw: data,
		imgurl: `https://bing.icodeq.com?key=${Math.random()}`,
	};
});

// export default defineEventHandler(async () => {
// 	const data = await fetch("https://www.dmoe.cc/random.php?return=json").then(data => data.json());
// 	return {
// 		raw: data,
// 		imgurl: data.imgurl,
// 	};
// });

// export default defineEventHandler(async () => {
// 	const data = await fetch("https://api.pexels.com/v1/curated?per_page=1", {
// 		headers: {
// 			Authorization: "cJuXnJhFuCMC5owXSMX4DbNSIcPpshqg6sY5x9asKIpZvmms1CjP5pbJ"
// 		}
// 	}).then(data => data.json());
// 	return {
// 		raw: data,
// 		imgurl: data.photos[0].src.original,
// 	};
// });
