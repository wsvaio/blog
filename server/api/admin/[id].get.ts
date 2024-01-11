export default defineEventHandler(async event => {
	const id = +getRouterParam(event, "id")!;
	return db.admin.findUnique({
		where: { id },
	});
});
