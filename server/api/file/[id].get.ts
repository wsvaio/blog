export default defineEventHandler(async event => {
	const id = +getRouterParam(event, "id")!;
	const f = await db.file.findUnique({
		where: { id },
	});
	if (f) {
		return new File([f.data], f.name, {
			type: f.type,
			lastModified: +f.lastModified,
		});
	}
});
