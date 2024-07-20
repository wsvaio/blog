export default defineEventHandler(async () => {
  return db.article.findMany({
    select: {
      id: false,
      content: true,
    }
  });
});
