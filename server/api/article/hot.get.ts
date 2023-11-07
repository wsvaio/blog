export default defineEventHandler(async () => {
  return await db.article.findMany({
    orderBy: {
      reads: "desc",
    },
    take: 10,
    include: {
      _count: true,
    },
  });
});
