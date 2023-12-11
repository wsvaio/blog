export default defineEventHandler(async event => {
	const id = +getRouterParam(event, "id")!;

	let pre = await db.article.findFirst({
		where: {
			id: {
				lt: id,
			},
		},
		orderBy: {
			id: "desc",
		},
	});
	pre ||= await db.article.findFirst({
		orderBy: {
			id: "desc",
		},
	});
	let next = await db.article.findFirst({
		where: {
			id: {
				gt: id,
			},
		},
	});

	next ||= await db.article.findFirst();

	return {
		pre,
		next,
	};
});
