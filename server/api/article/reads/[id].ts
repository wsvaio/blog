export default defineEventHandler(async event => {
  const id = +getRouterParam(event, "id")!;
  const find = await db.article.findUnique({ where: { id } });

  if (find) {
    return db.article.update({
      data: {
        reads: find.reads + 1,
      },
      where: { id },
    });
  }
});
