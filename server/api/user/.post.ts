export default defineEventHandler(async event => {
  const body = await readBody(event);
  return db.user.create({
    data: body,
  });
});
