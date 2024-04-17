export default defineEventHandler(async event => {
  const query = getQuery(event);

  if (query.page && query.pageSize) {
    const page = Number(query.page) || 1;
    const pageSize = Number(query.pageSize) || 10;

    return {
      page,
      pageSize,
      total: await db.admin.count(),
      list: await db.admin.findMany({
        skip: page * pageSize - pageSize,
        take: pageSize,
        select: {
          id: true,
          name: true,
          role: true,
          username: true,
          createAt: true,
          updateAt: true,
        },
      }),
    };
  }
  else {
    return await db.admin.findMany();
  }
});
