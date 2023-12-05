export default defineEventHandler(async event => {
	const body = await readBody(event);
	const id = +getRouterParam(event, "id")!;

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
			userId: user.id,
			content: body.content,
			commentId: id,
		},
	});
});
