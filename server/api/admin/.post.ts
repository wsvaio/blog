export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  return db.admin.create({
    data: body,
  });
});
