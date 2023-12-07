import UAParser from "ua-parser-js";

export default defineEventHandler(async event => {
	const body = await readBody(event);
	const headers = getHeaders(event);
	const id = +getRouterParam(event, "id")!;

	const ua = new UAParser(event.headers.get("user-agent")!);
	console.log(ua.getBrowser(), ua.getCPU(), ua.getDevice(), ua.getEngine(), ua.getOS(), ua.getResult(), ua.getUA());

	console.log(headers);

	const { city, province, isp } = await fetch(`/api/common/ip?ip=${headers["x-forwarded-for"]}`).then(data => data.json()).catch(() => ({
		city: "",
		province: "",
		isp: ""
	}));

	const browser = ua.getBrowser();
	const os = ua.getOS();

	const from = {
		city,
		province,
		isp,
		browserName: browser.name,
		browserVersion: browser.version,
		osName: os.name,
		osVersion: os.version
	};
	// if (!body.avatar)
	// 	return new Error("请上传头像");
	const verifyErrors: Error[] = [];
	if (!body.name) verifyErrors.push(new Error("请输入昵称"));
	if (!body.email) verifyErrors.push(new Error("请输入邮箱"));
	if (!body.content) verifyErrors.push(new Error("请输入评论"));

	if (verifyErrors.length) return new Error(`${verifyErrors.map(e => e.message).join("，")}。`);

	const user = await db.user.upsert({
		create: {
			avatar: body.avatar,
			email: body.email,
			name: body.name,
			site: body.site,

		},
		update: {
			avatar: body.avatar,
			email: body.email,
			name: body.name,
			site: body.site,
		},
		where: {
			email: body.email,
		},
	});

	return db.comment.create({
		data: {
			articleId: id,
			userId: user.id,
			content: body.content,
			from,
		},
	});
});
