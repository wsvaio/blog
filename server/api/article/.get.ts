export default defineEventHandler(async event => {
  const query = getQuery(event);
  Object.keys(db.article.fields);
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
    coreUpdateAt: true,

    ...JSON.parse(Array.isArray(query.select) ? query.select[0] : query.select || "{}"),
  };

  if (query.page && query.pageSize) {
    const page = Number(query.page) || 1;
    const pageSize = Number(query.pageSize) || 10;

    return {
      page,
      pageSize,
      total: await db.article.count(),
      list: await db.article.findMany({
        skip: page * pageSize - pageSize,
        take: pageSize,
        select,
        orderBy: {
          createAt: "desc"
        }
      }),

    };
  }
  else {
    return await db.article.findMany({
      select,
      orderBy: {
        createAt: "desc"
      }
    });
  }
});
