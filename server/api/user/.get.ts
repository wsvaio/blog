export default defineEventHandler(async event => {
  const query = getQuery(event);

  if (query.page && query.pageSize) {
    const page = Number(query.page) || 1;
    const pageSize = Number(query.pageSize) || 10;

    return {
      page,
      pageSize,
      total: await db.user.count(),
      list: await db.user.findMany({
        skip: page * pageSize - pageSize,
        take: pageSize,
      }),
    };
  }
  else {
    return await db.user.findMany();
  }
});
