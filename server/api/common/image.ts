export default defineEventHandler(async event => {
  const query = getQuery(event);

  if (query.type == "dongman") {
    return {
      // content: `https://t.mwm.moe/pc/?key=${Math.random()}`,
      content: `https://t.mwm.moe/pc?key=${Math.random()}`,
    };
  }
  else {
    return {
      // raw: data,
      // content: `https://bing.icodeq.com?key=${Math.random()}`,
      // content: `https://api.dujin.org/pic/fengjing?key=${Math.random()}`
      content: `https://t.mwm.moe/fj?key=${Math.random()}`,
      // content: `https://v2.api-m.com/api/wallpaper?return=302&key=${Math.random()}`
      // content: `https://www.dmoe.cc/random.php?key=${Math.random()}`,
    };
  }

  // const data = await fetch("https://bing.icodeq.com").then(data => data.text());
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
