export default defineEventHandler(async event => {
  const query = getQuery(event);

  if (query.page && query.pageSize) {
    let page = Number(query.page) || 1;
    let pageSize = Number(query.pageSize) || 10;
    let include = query.include ? JSON.parse(String(query.include)) : {};
    return {
      page,
      pageSize,
      total: await db.comment.count(),
      list: await db.comment.findMany({
        skip: page * pageSize - pageSize ,
        take: pageSize,
        include: {
          _count: true,
          comments: true,
          user: true,
          ...include,
        },
      }),
    };
  } else {
    return await db.comment.findMany({
      include: {
        _count: true,
        comments: true,
        user: true,
      },
    });
  }
});
