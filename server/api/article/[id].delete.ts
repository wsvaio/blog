export default defineEventHandler(async event => {
  const id = +getRouterParam(event, "id")!;

  return db.article.delete({
    where: { id },

  });
});
