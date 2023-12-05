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

	return db.article.findUnique({
		where: { id },
		include: {
			_count: true,
			comments: {
				include: {
					_count: true,
					user: true,
					comments: {
						include: {
							_count: true,
							user: true,
							comments: {
								include: {
									_count: true,
									user: true,
									comments: {
										include: {
											_count: true,
											user: true,
											comments: {

											}
										}
									}
								}
							}
						}
					}
				}
			},
			tags: true,
			type: true,
		}
	});

	// const comments = [] as any[];
	// for (const item of article.comments) comments.push(await deep(item.id));

	// return { ...article, comments };
});
