export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  return db.article.create({
    data: body,
  });
});
