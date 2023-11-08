export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  return db.comment.create({
    data: body,
  });
});
