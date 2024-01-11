export default defineEventHandler(async event => {
	const body = await readBody(event);
	const id = +getRouterParam(event, "id")!;
	return db.admin.update({
		data: body,
		where: { id },
	});
});
