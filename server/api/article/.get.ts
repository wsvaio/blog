export default defineEventHandler(async event => {
  const query = getQuery(event);
  const select = {
    _count: true,
    comments: true,
    content: true,
    createAt: true,
    id: true,
    likes: true,
    reads: true,
    tags: true,
    title: true,
    type: true,
    typeId: true,
    updateAt: true,
    ...JSON.parse(Array.isArray(query.select) ? query.select[0] : query.select || "{}"),
  };
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
        select,
        orderBy: {
          createAt: 'desc'
        }
      }),
      
    };
  } else {
    return await db.article.findMany({
      select,
      orderBy: {
        createAt: 'desc'
      }
    });
  }
});
