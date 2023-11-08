export default defineEventHandler(async event => {
	const id = +getRouterParam(event, "id")!;
	return db.user.delete({
		where: { id },
	});
});
