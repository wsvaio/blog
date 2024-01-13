export default defineEventHandler(async event => {
	const id = +getRouterParam(event, "id")!;
	return db.admin.findUnique({
		where: { id },
    select: {
      id: true,
      name: true,
      role: true,
      username: true,
      createAt: true,
      updateAt: true,
    },
	});
});
