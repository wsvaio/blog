export default defineEventHandler(async () => {
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
});
