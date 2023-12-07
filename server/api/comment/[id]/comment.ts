import UAParser from "ua-parser-js";

export default defineEventHandler(async event => {
	const body = await readBody(event);
	const headers = getHeaders(event);
	const id = +getRouterParam(event, "id")!;

	const { city, province, isp } = await fetch(`https://zj.v.api.aa1.cn/api/ip-taobao/?ip=${headers["x-forwarded-for"]}`)
		.then(async res => {
			const data = await res.json();
			return {
				province: data.data.PROVINCE_CN,
				city: data.data.CITY_CN,
				isp: data.data.ISP_CN,
			};
		})
		.catch(() => ({
			city: "",
			province: "",
			isp: "",
		}));

	const ua = new UAParser(event.headers.get("user-agent")!);
	const browser = ua.getBrowser();
	const os = ua.getOS();

	const from = {
		city,
		province,
		isp,
		browserName: browser.name,
		browserVersion: browser.version,
		osName: os.name,
		osVersion: os.version,
	};

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
			userId: user.id,
			content: body.content,
			commentId: id,
			from
		},
	});
});
