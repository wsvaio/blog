export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  if (query.page && query.limit) {
    let page = Number(query.page) || 1;
    let pageSize = Number(query.pageSize) || 10;

    return {
      page,
      pageSize,
      total: await db.article.count(),
      list: await db.article.findMany({
        skip: page * pageSize - 10,
        take: pageSize,
        include: {
          tags: true,
          type: true,
          comments: true,
        },
      }),
    };
  } else {
    return await db.article.findMany({
      include: {
        tags: true,
        type: true,
        comments: true,
      },
    });
  }
});
