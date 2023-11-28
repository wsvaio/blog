export default defineEventHandler(async event => {
	const id = +getRouterParam(event, "id")!;
	const query = getQuery(event);
	const f = await db.file.findUnique({
		where: { id },
		select: {
			_count: true,
			createAt: true,
			id: true,
			lastModified: true,
			name: true,
			size: true,
			type: true,
			updateAt: true,
			data: query.type != "json",
		},
	});
	if (f) {
		return query.type == "json"
			? {
				...f,
				data: undefined,
			}
			: new File([f.data], f.name, {
				type: f.type,
				lastModified: +f.lastModified,
			});
	}
});
