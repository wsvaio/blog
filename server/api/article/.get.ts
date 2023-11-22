export default defineEventHandler(async event => {
  const query = getQuery(event);
  const select = JSON.parse(Array.isArray(query.select) ? query.select[0] : query.select || "{}");
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
        select: {
          id: true,
          title: true,
          type: true,
          tags: true,
          content: true,
          comments: true,
          views: true,
          updateAt: true,
          createAt: true,
          typeId: true,
          _count: true,
          ...select,
        },
      }),
    };
  } else {
    return await db.article.findMany({
      select: {
        id: true,
        title: true,
        type: true,
        tags: true,
        content: true,
        comments: true,
        views: true,
        updateAt: true,
        createAt: true,
        typeId: true,
        _count: true,
        ...select,
      },
    });
  }
});
