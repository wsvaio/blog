export default defineEventHandler(async event => {
	const id = +getRouterParam(event, "id")!;
	return db.friend.delete({
		where: { id },
	});
});
