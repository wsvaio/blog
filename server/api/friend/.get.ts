export default defineEventHandler(async event => {
  const query = getQuery(event);

  if (query.page && query.pageSize) {
    let page = Number(query.page) || 1;
    let pageSize = Number(query.pageSize) || 10;

    return {
      page,
      pageSize,
      total: await db.friend.count(),
      list: await db.friend.findMany({
        skip: page * pageSize - pageSize ,
        take: pageSize,
      }),
    };
  } else {
    return await db.friend.findMany();
  }
});
