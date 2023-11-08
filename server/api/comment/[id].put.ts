export default defineEventHandler(async event => {
	const body = await readBody(event);
	const id = +getRouterParam(event, "id")!;
	return db.comment.update({
		data: body,
		where: { id },
	});
});
