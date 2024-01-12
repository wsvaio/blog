export default defineEventHandler(async event => {
	const query = getQuery(event);

	if (query.page && query.pageSize) {
		let page = Number(query.page) || 1;
		let pageSize = Number(query.pageSize) || 10;

		return {
			page,
			pageSize,
			total: await db.file.count(),
			list: await db.file.findMany({
				skip: page * pageSize - pageSize ,
				take: pageSize,
				select: {
					id: true,
					name: true,
					size: true,
					type: true,
					lastModified: true,
					data: false,
					createAt: true,
					updateAt: true,
				},
			}),
		};
	}
	else {
		return await db.file.findMany({
			select: {
				id: true,
				name: true,
				size: true,
				type: true,
				lastModified: true,
				data: false,
				createAt: true,
				updateAt: true,
			},
		});
	}
});
