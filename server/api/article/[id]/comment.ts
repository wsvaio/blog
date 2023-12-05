export default defineEventHandler(async event => {
	const body = await readBody(event);
	const id = +getRouterParam(event, "id")!;

	// if (!body.avatar)
	// 	return new Error("请上传头像");
	if (!body.name) return new Error("请输入昵称");
	if (!body.email) return new Error("请输入邮箱");
	if (!body.content) return new Error("请输入评论");

	let user = await db.user.findFirst({
		where: {
			email: body.email,
		},
	});

	if (!user) {
		user = await db.user.create({
			data: {
				avatar: body.avatar,
				email: body.email,
				name: body.name,
			},
		});
	}

	return db.comment.create({
		data: {
			articleId: id,
			userId: user.id,
			content: body.content,
		},
	});
});
