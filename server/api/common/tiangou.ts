// https://v1.hitokoto.cn/
export default defineEventHandler(async () => {
	const data = await fetch("https://v.api.aa1.cn/api/tiangou/index.php").then(data => data.text());
	// "id": 9018,
	// "uuid": "6a18a70b-6cb5-494b-9e88-86b095ef6452",
	// "hitokoto": "你怕不怕，这辈子就是上辈子所说的下辈子？",
	// "type": "l",
	// "from": "抖音",
	// "from_who": "未知",
	// "creator": "璃黯",
	// "creator_uid": 13640,
	// "reviewer": 4756,
	// "commit_from": "web",
	// "created_at": "1669946149",
	// "length": 20
	return {
		raw: data,
		content: data,
	};
});
