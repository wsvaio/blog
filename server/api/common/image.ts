export default defineEventHandler(async () => {
	const data = await fetch("https://www.dmoe.cc/random.php?return=json").then(data => data.json());
	return {
		raw: data,
		imgurl: data.imgurl,
	};
});
