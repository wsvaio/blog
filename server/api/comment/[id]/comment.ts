import { marked } from "marked";
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
			acceptEmails: body.acceptEmails
		},
		update: {
			avatar: body.avatar,
			email: body.email,
			name: body.name,
			site: body.site,
			acceptEmails: body.acceptEmails
		},
		where: {
			email: body.email,
		},

	});

	const comment = await db.comment.findUnique({
		where: {
			id,
		},
		include: {
			user: true,
		},
	});

	const article = await db.article.findUnique({
		where: {
			id: body.articleId,
		}

	});

	let result: any;

	if (body.whispers) {
		result = await transporter.sendMail({
			from: "\"WSの小屋\" wsvaio@qq.com",
			to: comment?.user?.email,
			subject: `“${user.name}”同学在文章“${article?.title}”中以悄悄话的形式回复了您`,
			text: body.content,
			html: `
				<p>${comment?.user?.name}：</p>
				${marked(comment!.content)}
				<p>${user?.name}：</p>
				${marked(body.content)}
				<address>
					<a href="https://wsvaio.site/article/${article!.id}">查看原文</a>
					<a href="mailto:${user.email}">回复ta</a>
				</address>
			`,
		});

		await transporter.sendMail({
			from: "\"WSの小屋\" wsvaio@qq.com",
			to: "wsvaio@qq.com",
			subject: `“${user.name}”同学在文章“${article?.title}”中向“${comment?.user?.name}”同学发送了悄悄话`,
			text: body.content,
			html: `
				<p>${user.name}：</p>
				${marked(comment!.content)}
				<p>${comment?.user?.name}：</p>
				${marked(body.content)}
				<address>
					<a href="https://wsvaio.site/article/${body.articleId}">查看原文</a>
				</address>
			`,
		});
	}
	else {
		result = await db.comment.create({
			data: {
				userId: user.id,
				content: body.content,
				commentId: id,
				articleId: body.articleId,
				from,
			},
		});

		await transporter.sendMail({
			from: "\"WSの小屋\" wsvaio@qq.com",
			to: "wsvaio@qq.com",
			subject: `“${user.name}”同学在文章“${article?.title}”中回复了“${comment?.user?.name}”同学`,
			text: result.content,
			html: `
				<p>${user.name}：</p>
				${marked(comment!.content)}
				<p>${comment?.user?.name}：</p>
				${marked(result.content)}
				<address>
					<a href="https://wsvaio.site/article/${body.articleId}?commentId=${result.id}">查看原文</a>
				</address>
			`,
		});

		if (user.acceptEmails) {
			await transporter.sendMail({
				from: "\"WSの小屋\" wsvaio@qq.com",
				to: comment?.user?.email,
				subject: `“${user.name}”同学在文章“${article?.title}”中回复了您`,
				text: result.content,
				html: `
					<p>${comment?.user?.name}：</p>
					${marked(comment!.content)}
					<p>${user?.name}：</p>
					${marked(result.content)}
					<address>
						<a href="https://wsvaio.site/article/${body.articleId}?commentId=${result.id}">查看原文</a>
					</address>
				`,
			});
		}
	}

	return result;
});
