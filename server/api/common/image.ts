export default defineEventHandler(async event => {
  const query = getQuery(event);

  // const url = await fetch("http://115.231.5.254:8100?random&url").then(data => data.text());
  // const url = await fetch("http://localhost:3000?random&url").then(data => data.text());
  if (query.type == "dongman") {
    return {
      // content: `https://t.mwm.moe/pc/?key=${Math.random()}`,
      // content: `https://t.mwm.moe/pc?key=${Math.random()}`,
      content: `https://www.dmoe.cc/random.php?key=${Math.random()}`,
    };
  }
  else {
    return {
      // raw: data,
      // content: `https://bing.icodeq.com?key=${Math.random()}`,
      // content: `https://api.dujin.org/pic/fengjing?key=${Math.random()}`
      // content: `https://t.mwm.moe/fj?key=${Math.random()}`,
      // content: `http://115.231.5.254:8100?random&key=${Math.random()}`,
      // content: `http://115.231.5.254:8100?random&key=${Math.random()}`,
      // content: url,
      // content: `https://v2.api-m.com/api/wallpaper?return=302&key=${Math.random()}`
      // content: `https://www.dmoe.cc/random.php?key=${Math.random()}`,
      // content: `https://t.mwm.moe/fj?key=${Math.random()}`
      content: `https://api.mmp.cc/api/pcwallpaper?category=landscape&type=jpg&key=${Math.random()}`
    };
  }

  // const data = await fetch("https://bing.icodeq.com").then(data => data.text());
});
