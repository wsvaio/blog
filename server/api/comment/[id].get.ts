export default defineEventHandler(async event => {
	const id = +getRouterParam(event, "id")!;
	return db.comment.findUnique({
		where: { id },
	});
});
