export default defineEventHandler(async event => {
	const id = +getRouterParam(event, "id")!;
	const find = await db.article.findUnique({ where: { id } });

	if (find) {
		return db.article.update({
			data: {
				likes: find.likes + 1,
			},
			where: { id },
		});
	}
});
