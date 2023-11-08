export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  let page = Number(query.page) || 1;
  let pageSize = Number(query.pageSize) || 10;

  return {
    page,
    pageSize,
    total: await db.type.count(),
    list: await db.type.findMany({
      skip: page * pageSize - 10,
      take: pageSize,
    }),
  };
});
