export default defineEventHandler(async event => {
	const id = +getRouterParam(event, "id")!;

	const result = await db.article.findUnique({
		where: { id },
		include: {
			_count: true,
			comments: {
				include: {
					user: true,
				}
			},
			tags: true,
			type: true,
		},
	});

	return {
		...result,
		comments: arrayToTree(result!.comments, null, { idKey: "id", pidKey: "commentId", childrenKey: "comments" }),
	};

	// return { ...article, comments };
});
