export default defineEventHandler(async event => {
	const id = +getRouterParam(event, "id")!;

	// const deep = async (id: number): Promise<any> => {
	// 	const find = await db.comment.findUnique({
	// 		where: { id },
	// 		include: {
	// 			_count: true,
	// 			// article: true,
	// 			// comment: true,
	// 			user: true,
	// 		},
	// 	});

	// 	if (!find) return;

	// 	const comments = [] as any[];

	// 	for (const item of await db.comment.findMany({ where: { commentId: id } })) comments.push(await deep(item.id));

	// 	return {
	// 		...find,
	// 		comments,
	// 	};
	// };

	// const article = await db.article.findUnique({
	// 	where: { id },

	// 	include: {
	// 		_count: true,
	// 		tags: true,
	// 		type: true,
	// 		comments: true,
	// 	},
	// });

	// if (!article) return;

	const r = (n: number): boolean | Record<any, any> => ({
		include: {
			user: true,
			comments: --n <= 0 ? true : r(n)
		}
	});

	console.log(r(32));

	return db.article.findUnique({
		where: { id },
		include: {
			_count: true,
			comments: r(32),
			tags: true,
			type: true,
		}
	});

	// const comments = [] as any[];
	// for (const item of article.comments) comments.push(await deep(item.id));

	// return { ...article, comments };
});
