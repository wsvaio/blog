export default defineEventHandler(async event => {
	const id = +getRouterParam(event, "id")!;
	return db.article.findUnique({
		where: { id },
		include: {
			tags: true,
			type: true,
			comments: true,
		},
	});
});
