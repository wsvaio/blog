export default defineEventHandler(async event => {
	const id = +getRouterParam(event, "id")!;
	return db.type.findUnique({
		where: { id },
	});
});
