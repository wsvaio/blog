export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  return db.tag.create({
    data: body,
  });
});
