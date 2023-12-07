export default defineEventHandler(async event => {
	const body = await readBody(event);
	const id = +getRouterParam(event, "id")!;

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
		},
	});
});
